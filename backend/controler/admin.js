const admin = require("../database/model/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("email-validator");

require("dotenv").config();

const generateAccessToken = (admin) => {
  return jwt.sign(
    {
      email: admin.email,
      password: admin.password,
      Role: admin.Role || "Admin",
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "24h",
    }
  );
};

// const generateRefreshToken = (admin) => {
//   return jwt.sign(
//     {
//       email: admin.email,
//       password: admin.password,
//       Role: admin.Role || "Admin",
//     },
//     process.env.REFRESH_TOKEN,
//     {
//       expiresIn: "30d",
//     }
//   );
// };
module.exports = {
  getAllAdmins: async (req, res) => {
    try {
      const results = await admin.getAll();
      res.json(results);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getOne: async (req, res) => {
    try {
      const email = req.params.email;

      const results = await admin.getUserByEmail(email);

      res.json(results);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addAdmin: async (req, res) => {
    const { email, FullName, password, Role, img_Profile } = req.body;
    if (validator.validate(email)) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const admins = {
          FullName,
          Role,
          email,
          password: hashedPassword,
          img_Profile: img_Profile,
        };
        const data = await admin.add(admins);
        console.log(data);
        const accessToken = generateAccessToken(admins);
        res.json({ accessToken, admins });
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    } else {
      console.log(res);
      res.status(400).send("invalid email");
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await admin.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const users = user[0];
      const passwordMatch = await bcrypt.compare(password, user[0].password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const tokenPayload = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          Role: user[0].Role,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "24h" }
      );

      res.header("Authorization", `Bearer ${tokenPayload}`);
      res.cookie("token", tokenPayload, {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      });

      res.json({ tokenPayload, users });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  deleteone: async (req, res) => {
    try {
      const id = req.params.id;
      const results = await admin.deleteOne(id);
      res.json(results);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  updateAdmin: async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = {
        email: req.body.email,
        First_Name: req.body.First_Name,
        Lastt_Name: req.body.Lastt_Name,
        password: req.body.password,
        Role: req.body.Role,
      };

      const results = await admin.update(id, updatedData);
      res.json(results);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
