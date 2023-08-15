const express = require("express");
const authUserMidle=require("../controler/authUserMidle")
const router = express.Router();

const {
  Register,
  login,
  deleteUser,
  updateUser,
  getOneUser,
} = require("../controler/users");

router.get("/:id",authUserMidle,getOneUser);
router.post("/auth/Register", Register);
router.post("/auth/login", login);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
