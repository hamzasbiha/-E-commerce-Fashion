import React from "react";
import "./Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, restCart } from "../../redux/cartReducer";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

const Cart = () => {
  const product = useSelector((state) => state.cart.product);

  const product_idproducts = product.map((item) => item.idprodcuts);
  const Dispatch = useDispatch();
  const [cookie] = useCookies();
  const user = useSelector((state) => state.user.user);
  const user_id_user = user.id_user;
  //count the total price
  const totalPrice = () => {
    let total = 0;
    let totalQuantity = 0;
    product.forEach((item) => {
      total += item.quantity * item.price;
      totalQuantity += item.quantity;
    });
    return { total: total.toFixed(2), totalQuantity };
  };

  const totalPrices = totalPrice();
  const quantity = totalPrices.totalQuantity;

  const stripePromise = loadStripe(
    "pk_test_51NPRkCFOHwWGLPpSYC9weg0c3AXDN0zAdxb8jUX28hEVGrDkojJ6OwYlTWfnWH6QQh35E9LZoWdpSkExV3pCwsPr00ebWd8gpr"
  );
  const handlePayment = async () => {
    if (cookie.token) {
      try {
        const stripe = await stripePromise;

        const orderData = {
          product,
          user_id_user,
          product_idproducts,
          quantity: quantity,
        };
        const orderDataString = JSON.stringify(orderData);
        console.log(orderDataString);
        // First, make a POST request to your server to create the order and get the clientSecret
        const orderResponse = await axios.post(
          "http://localhost:443/order/makeorder",
          orderDataString,
          { headers: { "content-type": "application/json" } }
        );

        // Redirect to Stripe Checkout
        const { clientSecret } = orderResponse.data;
        const { error } = await stripe.redirectToCheckout({
          sessionId: clientSecret,
        });
        console.log(clientSecret + "client secret");
        if (error) {
          console.log("Payment failed:", error);
        }
      } catch (error) {
        console.log("Payment failed:", error);
      }
    } else {
      return Swal.fire({
        title:
          "<strong> <u>You should create an account first or log in if you already have an account</u></strong>",
        icon: "info",
        html: '<a href="http://localhost:5173/Login">login</a> ',
        showCloseButton: true,
      });
    }
  };
  console.log(product);
  return (
    <div className="Cart">
      <h1>products in your cart</h1>
      {product.length !== 0 ? (
        <>
          {" "}
          {product.map((item) => (
            <div className="item" key={item.idprodcuts}>
              <img src={item.img} alt="" />
              <div className="details">
                <h1>{item.title}</h1>
                <p>{item.details.substring(0, 100)}</p>
                <div className="price">
                  {item.quantity}x{item.price}{" "}
                </div>
              </div>

              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="4em"
                width="4em"
                className="delete"
                color="red"
                onClick={() => {
                  const id = item.idprodcuts;

                  Dispatch(removeItem(id));
                }}
              >
                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
              </svg>
            </div>
          ))}
          <div className="total">
            <span>SUBTOTAL</span>
            <span>{totalPrices.total} DT</span>
          </div>
          <button onClick={() => handlePayment()}>Proccs To checkout</button>
          <span className="rest" onClick={() => Dispatch(restCart())}>
            Rest Cart
          </span>
        </>
      ) : (
        <div className="Cart-empty">
          <h5>you have no product added</h5>
          <div className="item">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height="4em"
              width="4em"
            >
              <path
                fill="currentColor"
                d="M14.341 5.579c-.347-.473-.831-1.027-1.362-1.558s-1.085-1.015-1.558-1.362C10.615 2.068 10.224 2 10 2H4.25C3.561 2 3 2.561 3 3.25v11.5c0 .689.561 1.25 1.25 1.25h9.5c.689 0 1.25-.561 1.25-1.25V7c0-.224-.068-.615-.659-1.421zm-2.07-.85c.48.48.856.912 1.134 1.271h-2.406V3.595c.359.278.792.654 1.271 1.134zM14 14.75c0 .136-.114.25-.25.25h-9.5a.253.253 0 01-.25-.25V3.25c0-.135.114-.25.25-.25H10v3.5a.5.5 0 00.5.5H14v7.75z"
              />
              <path
                fill="currentColor"
                d="M9.421.659C8.615.068 8.224 0 8 0H2.25C1.561 0 1 .561 1 1.25v11.5c0 .604.43 1.109 1 1.225V1.25c0-.135.115-.25.25-.25h7.607A10.455 10.455 0 009.42.659z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
