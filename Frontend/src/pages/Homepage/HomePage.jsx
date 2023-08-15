import React, { useEffect, useState } from "react";
import Slider from "../../components/slider/Slider";
import "./HomePage.scss";
import Featured from "../../components/featured/Featured";
import Categories from "../../components/categories/categories";
import Contact from "../../components/Contact/Contact";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const user = useSelector((state) => state.user.user);
  const navgation = useNavigate();
  const idUser = user.id_user;
  const product = useSelector((state) => state.cart.product);
  const quantity = product.map((item) => {
    return item.quantity;
  });
  const idproducts = product.map((item) => item.idprodcuts);
  console.log(quantity);
  const productAdded = {
    product_idporudct: idproducts,
    user_id_user: idUser,
    quantity: quantity,
  };
  console.log(productAdded);
  useEffect(() => {
    // Check if the URL has a query parameter "success=true" after successful payment
    const succesPayment = async () => {
      const params = new URLSearchParams(window.location.search);

      if (params.get("success") === "true") {
        try {
          const res = await axios.post(
            "http://localhost:443/order/webhook",
            productAdded
          );
          console.log(res);
          navgation("/");
        } catch (error) {
          console.log({ error: error.message });
        }
      }
    };
    succesPayment();
  }, []);

  return (
    <div className="Home">
      <Slider />
      <Featured type="featured" />
      <Categories />
      <Featured type="Tredning" />
      <Contact />
    </div>
  );
};

export default HomePage;
