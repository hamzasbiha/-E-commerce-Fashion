const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../database/model/users");
const nodemailer = require("nodemailer");
const validator = require("email-validator");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Replace with your email address or email username
    pass: process.env.PASSWORD, // Replace with your email password or app password
  },
});

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      FullName: user.FullName,
      password: user.password,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "24h",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { email: user.email, FullName: user.FullName, password: user.password },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "30d",
    }
  );
};

require("dotenv").config();

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const results = await users.getAllUsers();
      res.json(results);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getOneUser: async (req, res) => {
    const id = req.params.id;
    // Add authentication middleware to secure this route
    try {
      const results = await users.getOneUser(id);

      res.json(results);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  Register: async (req, res) => {
    const { email, FullName, password, img_profile_user } = req.body;
    if (validator.validate(email)) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
          email,
          FullName,
          password: hashedPassword,
          img_profile_user: img_profile_user,
        };

        const data = await users.addUser(user);

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({ accessToken, refreshToken, data });
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    } else {
      res.status(550).send("email not valid");
      return;
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await users.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      res.header("Authorization", `Bearer ${accessToken}`);
      res.cookie("token", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      });
      res.json({ accessToken, refreshToken, user });
    } catch (error) {
      console.error(error);
      res.status(500).send("something wrong");
    }
  },
  ForgetPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await users.getUserByEmail(email);

      if (user) {
        // Generate a token for the password reset
        const resetToken = generateRefreshToken(user);

        // Store the reset token in your token table
        await users.addToken({ user_id: user.id_user, token: resetToken });
        const encodedToken = encodeURIComponent(resetToken); // Encode the token
        const link = `http://localhost:5173/reset-password?token=${encodedToken}`;
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Rest password",
          html: `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333333;
              }
              p {
                color: #666666;
              }
              a {
                color: black;
                text-decoration: none;
              }
              button {
                display: inline-block;
            padding: 10px 20px;
              background-color: #007bff; /* Change to your preferred background color */
  color: #ffffff; /* Change to your preferred text color */
  border: none;
  border-radius: 5px;
          cursor: pointer;
          
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Password Reset</h1>
              <b>Dear User,</b>
              <p>You've requested to reset your password. Click the link below to reset your password:</p>
              <button><a href="${link}">Reset Password</a></button>
              <p>If you didn't request this password reset, you can safely ignore this email.</p>
              <p>Best regards,<br>Your ShopLena Team</p>
            </div>
          </body>
          </html>
          `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            console.log(mailOptions);
            res.status(500).send("Error sending email");
          } else {
            console.log("Email sent:", info.response);
            // Return the verification code to the client as a response
            res.json({ success: true + " Check your email" });
          }
        });
      } else {
        res.status(404).send("User Not found");
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const results = await users.deleteUser(userId);
      res.json(results);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  RestPassword: async (req, res) => {
    const { token, newPassword } = req.body;
    try {
      const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN);
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // Update user's password in the database
      await users.updateUserPasswordByEmail(decodedToken.email, hashedPassword);

      // Delete the used token from the token table
      await users.deleteTokenByUserId(decodedToken.user_id);

      res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedData = req.body;

      const results = await users.updateUser(userId, updatedData);
      res.json(results);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
