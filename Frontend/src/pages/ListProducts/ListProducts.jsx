import React, { useState, useEffect } from "react";
import "./ListProducts.scss";
import Cards from "../../components/Cards/Cards";
import "react-loading-skeleton/dist/skeleton.css";
import useFetch from "../../Hooks/useFetch";

const ListProducts = ({ params, selectedCategories, maxPrice, sort }) => {
  const query = params.search_query
    ? `shop?genre=${params.search_query}`
    : "shop";
  const { data, loading, error } = useFetch(query);
 
  // Filter the data based on selected categories
  const filteredData = selectedCategories.length
    ? data.filter((item) =>
        selectedCategories.includes(item.category.toLowerCase())
      )
    : data;

  // Convert maxPrice to a numeric value
  const numericMaxPrice = parseInt(maxPrice);

  // Filter the data by price
  const filteredByPriceData = filteredData?.filter((item) => {
    const itemPrice = parseFloat(item.price);
    return itemPrice <= numericMaxPrice;
  });

  // Sort the data
  let sortedData = filteredByPriceData;
  if (sort === "adc") {
    // Sort by lowest price (ascending order)
    sortedData = [...filteredByPriceData].sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
  } else if (sort === "ade") {
    // Sort by highest price (descending order)
    sortedData = [...filteredByPriceData].sort(
      (a, b) => parseFloat(b.price) - parseFloat(a.price)
    );
  }

  return (
    <div className="list">
      {error ? (
        "Something went wrong!"
      ) : loading ? (
        "Loading..."
      ) : (
        sortedData?.map((item) => (
          <Cards item={item} key={item.idproducts} />
        ))
      )}
    </div>
  );
};

export default ListProducts;
