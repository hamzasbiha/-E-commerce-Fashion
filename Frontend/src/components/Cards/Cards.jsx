import React from "react";
import { Link, useParams } from "react-router-dom";

import "./Cards.scss";

const Cards = ({ item }) => {
  const params = useParams().id;

  return (
    <>
      <Link className="link" to={`/product/${item.idproducts}`}>
        <div className="Card">
          <div className="image">
            <img src={item.img} alt="" className="mainImg" />
            <img src={item.img2} alt="" className="secondImg" />
          </div>
          <h3>{item.title}</h3>
          <div className="prices">
            <div>{item.price} DT</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Cards;
