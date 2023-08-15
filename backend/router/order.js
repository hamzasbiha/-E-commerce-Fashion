const express = require("express");
const router = express.Router();
const authMiddleware = require("../controler/authMiddleware");
const {
  getOrders,
  getAllOrder,
  makeOneOrder,
  updateOrder,
  deleteOrder,
  succesPayment,
} = require("../controler/order");

router.get("/getOrders/:user_id_user", getOrders);
router.get(
  "/AllOrders",
  authMiddleware(["Admin", "manager_users"]),
  getAllOrder
);
router.post("/makeorder", makeOneOrder);
router.post("/webhook", succesPayment);
router.delete(
  "/delete/:orderId",
  authMiddleware(["Admin", "manager_users"]),
  deleteOrder
);
router.put("/id", authMiddleware(["Admin", "manager_users"]), updateOrder);

module.exports = router;
