const jwt = require("jsonwebtoken");

const authMiddleware = (roles) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];

    const tokenrole = token.split(" ")[1];
    if (!tokenrole) {
      return res.status(403).json({ message: "No token provided." });
    }

    const secretKey = process.env.ACCESS_TOKEN; // Replace with your actual secret key

    jwt.verify(tokenrole, secretKey, (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ message: "Failed to authenticate token." });
      }

      const rolesV = jwt.decode(tokenrole);

      if (!roles.includes(decoded.Role)) {
        return res.status(403).json({ message: "Access denied." });
      }

      req.user = rolesV;

      next();
    });
  };
};

module.exports = authMiddleware;
