require("dotenv").config();
const orderModel = require("../database/model/order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Readable } = require("stream");
module.exports = {
  getOrders: async (req, res) => {
    const user_id_user = req.params.user_id_user;
    try {
      const orders = await orderModel.getOrdersByUser(user_id_user);

      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders." });
    }
  },

  getAllOrder: async (req, res) => {
    try {
      const order = await orderModel.getOrders();
      if (!order) {
        res.status(404).json({ error: "Order not found." });
      } else {
        res.json(order);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order." });
    }
  },
  makeOneOrder: async (req, res) => {
    const { product } = req.body;
    const lineItem = await Promise.all(
      product.map(async (item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: Math.floor(item.price * 100),
          },
          quantity: item.quantity,
        };
      })
    );
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}?success=true`,
        cancel_url: `${process.env.CLIENT_URL}?canceled=false`,
        line_items: lineItem,
        shipping_address_collection: { allowed_countries: ["US", "TN", "CA"] },
        payment_method_types: ["card"],
      });

      res.json({ clientSecret: session.id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create order." });
    }
  },
  succesPayment: async (req, res) => {
    const { product_idporudct, user_id_user, quantity } = req.body;

    try {
      const result = await orderModel.makeOrder(
        product_idporudct,
        user_id_user,
        quantity
      );
      console.log(result);
      res.send(result);
    } catch (error) {
      console.log({ error: error.message });
      res.status(400).json({ error: error.message });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const result = await orderModel.deleteOrder(orderId);

      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Order not found." });
      } else {
        console.log(result);
        res.json({ message: "Order deleted successfully." });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete order." });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { newStatus } = req.body;
      const result = await orderModel.updateOrder(orderId, newStatus);
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Order not found." });
      } else {
        res.json({ message: "Order updated successfully." });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update order." });
    }
  },
};
