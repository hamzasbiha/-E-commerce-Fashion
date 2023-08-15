import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";

const Single = () => {
  const params = useParams();
  const id = params.id;
  const [singleProduct, setSingleProduct] = useState({});
  const [cookie] = useCookies();
  const idproducts = params.id;
  const [perview, setPerview] = useState({
    imgPerview: null,
    imgPerview2: null,
  });
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
  console.log(productData);
  const uploadImage = async (imgField) => {
    const file = productData[imgField];
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
      const res = await axios.put(
        `http://localhost:443/api/proudcts/update/${idproducts}`,
        productData,
        {
          headers: { Authorization: `Bearer ${cookie.tokenAdmin}` },
        }
      );

      console.log(res);

      // ... (rest of the code)
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handlePerview = (e, imgField) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    console.log(file);
    // Set up the FileReader onload event to get the data URL when the file is read
    reader.onload = () => {
      setPerview((prevPreview) => ({
        ...prevPreview,
        [imgField]: reader.result, // Set the data URL as the value of the imgField (img or img2)
      }));
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const SingleProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:443/api/proudcts/${id}`,
          {
            headers: { Authorization: `Bearer ${cookie.tokenAdmin}` },
          }
        );
        setSingleProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    SingleProduct();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full items-center">
      <div className="md:w-1/2 p-4">
        <div className="grid grid-cols-2 p-2 gap-3 ">
          <img
            src={!perview.imgPerview ? singleProduct.img : perview.imgPerview}
            alt=""
            className="rounded-lg"
          />
          <img
            src={
              !perview.imgPerview2 ? singleProduct.img2 : perview.imgPerview2
            }
            alt=""
            className="rounded-lg"
          />
        </div>
      </div>
      <div className=" md:w-1/2 p-4">
        <div className="flex  overflow-auto max-w-screen-lg">
          <form className="w-full " enctype="multipart/form-data">
            <div className="grid grid-cols-2 p-2 gap-4">
              <div>
                <input
                  type="file"
                  onChange={(e) => {
                    handlePerview(e, "imgPerview");
                    handleFileChange(e, "img");
                  }}
                  required="true"
                />
              </div>
              <div className=" relative">
                <input
                  type="file"
                  className="absolute"
                  onChange={(e) => {
                    handlePerview(e, "imgPerview2");
                    handleFileChange(e, "img2");
                  }}
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
                    placeholder={singleProduct.title}
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
                    placeholder={singleProduct.details}
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
                    placeholder={singleProduct.price}
                    required
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
                    placeholder={singleProduct.color}
                    required
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
                    placeholder={singleProduct.category}
                    required
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
                    type="number"
                    id="rating"
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={singleProduct.rating}
                    required
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
                    placeholder={singleProduct.genre}
                    required
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
                    placeholder={singleProduct.size}
                    required
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
                  placeholder={singleProduct.brand}
                  required
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
                  placeholder={singleProduct.availability}
                  required
                  value={productData.availability}
                  onChange={(e) => handleChange(e, "availability")}
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </form>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Single;
