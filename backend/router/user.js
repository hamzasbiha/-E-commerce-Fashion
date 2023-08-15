const express = require("express");
const authMiddleware = require("../controler/authMiddleware.js");
const router = express.Router();
const {
  getAllUsers,
  Register,
  login,
  deleteUser,
  updateUser,
  getOneUser,
  ForgetPassword,
  RestPassword,
} = require("../controler/users");
router.get(
  "/getallusers",
  authMiddleware(["Admin", "manager_users"]),
  getAllUsers
);
router.get("/:id_user", authMiddleware(["Admin", "manager_users"]), getOneUser);
router.post("/auth/Register", Register);
router.post("/auth/login", login);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.post("/auth/forgetpassword", ForgetPassword);
router.post("/rest-password", RestPassword);
module.exports = router;
