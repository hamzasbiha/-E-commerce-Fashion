import React, { useState } from "react";
import "./products.scss";
import cover from "../../assets/cover.jpg";
import ListProducts from "../ListProducts/ListProducts";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

const Products = () => {
  const params = useParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { data, loading, error } = useFetch(`shop`);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sort, setSort] = useState(null);

  const handleCategoryChange = (category) => {
    // Check if the category is already selected
    if (selectedCategories.includes(category)) {
      // If selected, remove it from the array
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      // If not selected, add it to the array
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Products Categories</h2>
          {error
            ? "Somthing wrong"
            : loading
            ? "is loding..."
            : [...new Set(data?.map((item) => item.category.toLowerCase()))]
                .filter((e) => e !== "t-shirt")
                .map((category) => (
                  <div className="inputItem" key={category}>
                    <input
                      type="checkbox"
                      id={category}
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <label htmlFor={category}>{category}</label>
                  </div>
                ))}
        </div>
        <div className="filterItem">
          <h2>Filter by Price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={500}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span> {maxPrice} </span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="adc"
              name="price"
              onChange={(e) => setSort("adc")}
            />
            <label htmlFor="adc"> price (lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="ade"
              name="price"
              onChange={(e) => setSort("ade")}
            />
            <label htmlFor="adc"> price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img className="catImg" src={cover} />
        <ListProducts
          params={params}
          maxPrice={maxPrice}
          sort={sort}
          selectedCategories={selectedCategories}
        />
      </div>
    </div>
  );
};

export default Products;
