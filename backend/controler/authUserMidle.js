const jwt = require("jsonwebtoken");

const authHeaderMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return res.status(403).json({ message: "No authorization header provided." });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  const secretKey = process.env.ACCESS_TOKEN; // Replace with your actual secret key

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Failed to authenticate token." });
  }
};

module.exports = authHeaderMiddleware;
