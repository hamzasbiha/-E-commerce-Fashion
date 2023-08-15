import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CartList.scss";
import { removeItem, restCart } from "../../redux/cartReducer";

const CartList = () => {
  const cart = useSelector((state) => state.cart.product);
  const dispatch = useDispatch();

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h1 className="title">Your Cart</h1>
        <h5 className="rest" onClick={() => dispatch(restCart())}>
          Rest your card
        </h5>
        {cart.length !== 0 ? (
          cart?.map((item) => (
            <div className="cart-item" key={item.idprodcuts}>
              <img className="cart-item-image" src={item.img} alt="Product" />
              <div className="cart-item-details">
                <span className="cart-item-title">{item.title}</span>
                <span className="cart-item-text">{item.details}</span>
                <span className="cart-item-price">${item.price}</span>
              </div>
              <div className="cart-quantity">
                <svg
                  color="red"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="2em"
                  width="2em"
                  onClick={() => {
                    dispatch(removeItem(item.idprodcuts));
                  }}
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M5.792 2H1v2h3.218l2.77 12.678H7V17h13v-.248l2.193-9.661L22.531 6H6.655l-.57-2.611L5.792 2zm14.195 6H7.092l1.529 7h9.777l1.589-7z"
                    clipRule="evenodd"
                  />
                  <path
                    fill="currentColor"
                    d="M10 22a2 2 0 100-4 2 2 0 000 4zM19 20a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          ))
        ) : (
          <div className="item">
            {" "}
            <h1 className="empty">No item Add </h1>
            <div>
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                height="5em "
                width="5em"
              >
                <path
                  fill="currentColor"
                  d="M14.341 3.579c-.347-.473-.831-1.027-1.362-1.558S11.894 1.006 11.421.659C10.615.068 10.224 0 10 0H2.25C1.561 0 1 .561 1 1.25v13.5c0 .689.561 1.25 1.25 1.25h11.5c.689 0 1.25-.561 1.25-1.25V5c0-.224-.068-.615-.659-1.421zm-2.07-.85c.48.48.856.912 1.134 1.271h-2.406V1.595c.359.278.792.654 1.271 1.134zM14 14.75c0 .136-.114.25-.25.25H2.25a.253.253 0 01-.25-.25V1.25c0-.135.115-.25.25-.25H10v3.5a.5.5 0 00.5.5H14v9.75z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="summary-card">
        <h2 className="summary-title">Order Summary</h2>
        <div className="summary-item">
          <span className="summary-item-text">Subtotal</span>
          <span className="summary-item-price">${calculateTotalPrice()}</span>
        </div>
        <div className="summary-item">
          <span className="summary-item-text">Estimated Shipping</span>
          <span className="summary-item-price">$5.90</span>
        </div>
        <div className="summary-item">
          <span className="summary-item-text">Shipping Discount</span>
          <span className="summary-item-price">-$5.90</span>
        </div>
        <div className="summary-item total">
          <span className="summary-item-text">Total</span>
          <span className="summary-item-price">${calculateTotalPrice()}</span>
        </div>
        <button className="checkout-button">Checkout Now</button>
      </div>
    </div>
  );
};

export default CartList;
