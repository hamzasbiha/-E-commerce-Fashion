// app.js
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();

const admin = require("./router/admin");
const proudcts = require("./router/products");
const users = require("./router/user");
const shopRoutes = require("./routerShopweb/products.js");
const client = require("./routerShopweb/client");
const order = require("./router/order");
require("dotenv").config();
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.STRIPE_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(cors());
app.use("/api/admin/", admin);
app.use("/api/proudcts/", proudcts);
app.use("/api/users/", users);
app.use("/shop/", shopRoutes);
app.use("/client/", client);
app.use("/order/", order);
module.exports = app;
