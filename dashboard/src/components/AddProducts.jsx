import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
const AddProducts = () => {
  const [cookie] = useCookies();
  const [productData, setProductData] = useState({
    title: "",
    details: "",
    img: null,
    img2: null,
    price: 0,
    color: "",
    category: "",
    rating: "",
    genre: "",
    size: "",
    brand: "",
  });

  const uploadImage = async (imgField) => {
    const file = productData[imgField];
    console.log(file)
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ShopOnline");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/decy2t1yc/image/upload",
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error(`Error uploading ${imgField} image to Cloudinary:`, error);
      return null;
    }
  };
  console.log(productData);
  const handleFileChange = (e, imgField) => {
    const file = e.target.files[0];

    setProductData((prevData) => ({
      ...prevData,
      [imgField]: file,
    }));
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setProductData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");

    try {
      // Upload the first image
      const imgURL1 = await uploadImage("img");
      if (!imgURL1) {
        console.error("Error uploading the first image");
        return;
      }
      console.log("Image 1 URL:", imgURL1);

      // Upload the second image
      const imgURL2 = await uploadImage("img2");
      if (!imgURL2) {
        console.error("Error uploading the second image");
        return;
      }
      console.log("Image 2 URL:", imgURL2);

      // Now that you have the URLs, update the productData state with the URLs
      setProductData((prevData) => ({
        ...prevData,
        img: imgURL1,
        img2: imgURL2,
      }));
      console.log(productData);
      // Send the form data with the image URLs to your API
      const res = await axios.post(
        "http://localhost:443/api/proudcts/addProudct",
        {
          ...productData,
          img: imgURL1,
          img2: imgURL2,
        },
        {
          headers: { Authorization: `Bearer ${cookie.tokenAdmin}` },
        }
      );

      console.log("Product added successfully:", res.data);
      // You can handle the response here and show success messages, etc.
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      // Clear the form and close the modal
      setProductData({
        title: "",
        details: "",
        img: null,
        img2: null,
        price: 0,
        color: "",
        category: "",
        rating: "",
        genre: "",
        size: "",
        brand: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex items-center justify-center overflow-auto w-full">
      <form className="w-full">
        <div className="grid grid-cols-2 p-2 gap-4">
          <div>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "img")}
              required="true"
            />
          </div>
          <div className=" relative">
            <input
              type="file"
              className="absolute"
              onChange={(e) => handleFileChange(e, "img2")}
              required="true"
            />
          </div>
        </div>
        <form className="item-center justify-center relative">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title"
                required="true"
                value={productData.title}
                onChange={(e) => handleChange(e, "title")}
                aria-required="true"
              />
            </div>
            <div>
              <label
                htmlFor="details"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Details
              </label>
              <textarea
                id="details"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Details"
                required
                value={productData.details}
                onChange={(e) => handleChange(e, "details")}
                aria-required="true"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Price"
                required="true"
                value={productData.price}
                onChange={(e) => handleChange(e, "price")}
              />
            </div>
            <div>
              <label
                htmlFor="color"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
              >
                Color
              </label>
              <input
                type="text"
                id="color"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Color"
                required="true"
                value={productData.color}
                onChange={(e) => handleChange(e, "color")}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Category"
                required="true"
                value={productData.category}
                onChange={(e) => handleChange(e, "category")}
              />
            </div>
            <div>
              <label
                htmlFor="rating"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Rating
              </label>
              <input
                type="text"
                id="rating"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Rating"
                required="true"
                value={productData.rating}
                onChange={(e) => handleChange(e, "rating")}
              />
            </div>
            <div>
              <label
                htmlFor="genre"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Genre
              </label>
              <input
                type="text"
                id="genre"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Genre"
                required="true"
                value={productData.genre}
                onChange={(e) => handleChange(e, "genre")}
              />
            </div>
            <div>
              <label
                htmlFor="size"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                size
              </label>
              <input
                type="text"
                id="size"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="size"
                required="true"
                value={productData.size}
                onChange={(e) => handleChange(e, "size")}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="size"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              brand
            </label>
            <input
              type="text"
              id="brand"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="brand"
              required="true"
              value={productData.brand}
              onChange={(e) => handleChange(e, "brand")}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="availability"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Availability
            </label>
            <input
              type="number"
              id="availability"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Availability"
              required="true"
              value={productData.availability}
              onChange={(e) => handleChange(e, "availability")}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </form>
    </div>
  );
};

export default AddProducts;
