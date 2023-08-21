import React from "react";
import "./Featured.scss";
import Cards from "../Cards/Cards";
import useFetch from "../../Hooks/useFetch";
const Featured = () => {
  const { data, loading, error } = useFetch(`shop`);
  console.log(data);

  return (
    <div className="featured">
      <div className="top">
        <h1> products</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>
      <div className="bottom">
        {data
          ?.filter((item) => item.rating >= 4)
          .slice(6)
          .map((item) => (
            <Cards item={item} key={item.idproducts} />
          ))}
      </div>
    </div>
  );
};

export default Featured;
