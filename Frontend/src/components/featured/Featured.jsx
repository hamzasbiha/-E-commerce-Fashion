import React from "react";
import "./Featured.scss";
import Cards from "../Cards/Cards";
import useFetch from "../../Hooks/useFetch";
const Featured = () => {
  const { data, loading, error } = useFetch(`shop`);
  console.log(data);
  //   {
  //     idproducts: 16,
  //     title: "Black T-Shirt",
  //     details: "t-shirt coton good for summer all the size available",
  //     img:
  //       "https://res.cloudinary.com/decy2t1yc/image/upload/v1687838007/proudcts/ql0a2tcanr74vy0kbner.jpg",
  //     img2:
  //       "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     price: "19.99",
  //     color: "Black",
  //     category: "T-shirt",
  //     rating: 5,
  //     REF: 12,
  //   },
  //   {
  //     idproducts: 17,
  //     title: "vest maron",
  //     details: "vest maron for winter classic one with good quality",
  //     img:
  //       "https://res.cloudinary.com/decy2t1yc/image/upload/v1687792212/products/guh7epuhxydijvztxrm4.jpg",
  //     img2:
  //       "https://images.pexels.com/photos/2916814/pexels-photo-2916814.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     price: "190.99",
  //     color: "Black",
  //     category: "T-shirt",
  //     rating: 5,
  //     REF: 13,
  //   },
  //   {
  //     idproducts: 18,
  //     title: "white t-Shirt",
  //     details: "good quality t-shirt white cotton",
  //     img:
  //       "https://res.cloudinary.com/decy2t1yc/image/upload/v1687484713/proudcts/oo1tkm4m8etd6xkhk5x6.jpg",
  //     img2:
  //       "https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     price: "19.99",
  //     color: "T-shirt",
  //     category: "white",
  //     rating: 4,
  //     REF: 15,
  //   },
  // ];
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
          ?.filter((item) => item.rating >= 4).slice(6)
          .map((item) => (
            <Cards item={item} key={item.idproducts} />
          ))}
      </div>
    </div>
  );
};

export default Featured;
