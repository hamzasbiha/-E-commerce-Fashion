import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
const Products = () => {
  const [cookie] = useCookies();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2); // Set the number of rows per page
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [trigger, setTrigger] = useState(false);
  const [loding, setLoding] = useState(false);
  // Set the number of items per row
  const fetchProducts = async () => {
    setLoding(true);
    try {
      const res = await axios.get("http://localhost:443/api/proudcts/", {
        headers: { Authorization: `Bearer ${cookie.tokenAdmin}` },
      });
      setProducts(res.data);
      setLoding(false);
      // Dispatch(fetchProducts(res.data)); // Remove this line as it is not needed
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [cookie, trigger]);

  const totalItems = products.length;

  // Calculate the total number of pages based on the totalItems and itemsPerRow
  const totalRows = Math.ceil(totalItems / (rowsPerPage * itemsPerRow));

  // ... (existing code)

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalRows));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Disable the "Next" button when the current page is equal to the total number of pages
  const isNextButtonDisabled = currentPage === totalRows;

  // Disable the "Previous" button when the current page is 1
  const isPrevButtonDisabled = currentPage === 1;
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * rowsPerPage * itemsPerRow;
    const endIndex = Math.min(
      startIndex + rowsPerPage * itemsPerRow,
      totalItems
    );
    return products?.slice(startIndex, endIndex);
  };

  const handleDelete = async (id) => {
    setTrigger(true);
    try {
      const res = await axios.delete(
        `http://localhost:443/api/proudcts/${id}`,
        {
          headers: { Authorization: `Bearer ${cookie.tokenAdmin}` },
        }
      );
      console.log(res);
      setTrigger(false);
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  return (
    <div className=" ml-4 table ">
      <div className="gap-2 p-2">
        {" "}
        <Link
          to={"/AddProducts"}
          className=" text-lg btn-circle bg-transparent font-semibold text-center text-red-500"
        >
          Add product
        </Link>
      </div>
      <div className="flex  justify-between items-center ">
        <span
          onClick={handlePrevPage}
          disabled={isPrevButtonDisabled} // Use the disabled prop to disable the button
          className={`cursor-pointer text-white font-bold py-2 px-4 rounded ${
            isPrevButtonDisabled ? "opacity-50" : ""
          }`}
        >
          Previous
        </span>
        <span>
          {currentPage} / {totalRows}
        </span>
        <span
          onClick={handleNextPage}
          disabled={isNextButtonDisabled} // Use the disabled prop to disable the button
          className={`cursor-pointer text-white font-bold py-2 px-4 rounded ${
            isNextButtonDisabled ? "opacity-50" : ""
          }`}
        >
          Next
        </span>
      </div>
      <div
        className={`grid grid-cols-3 grid-rows-2 gap-4 items-center justify-center max-h-fit `}
      >
        {!loding ? (
          getCurrentPageProducts().map((item) => (
            <div className="gap-3" key={item?.idproducts}>
              <div className="rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-96 ">
                <div className="items-center justify-between">
                  <button
                    className="text-base outline-red-600 bg-transparent text-red-600  mb-3 border-none p-2 gap-2 hero-overlay items-center"
                    onClick={() => {
                      const id = item.idproducts;
                      handleDelete(id);
                    }}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/update/${item.idproducts}`}
                    className="text-base bg-transparent text-blue-600 hero-overlay mb-3 border-none p-2 gap-2 "
                  >
                    update
                  </Link>
                </div>
                <div
                  key={item?.idproducts}
                  className="rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 "
                >
                  <Link
                    to={`/productDetails/${item.idproducts}`}
                    className="w-1/2 flex"
                  >
                    <img
                      className="rounded-t-lg object-cover"
                      src={
                        !item.img
                          ? "https://images.wondershare.com/repairit/aticle/2021/07/resolve-images-not-showing-problem-1.jpg"
                          : item.img
                      }
                      alt=""
                    />
                    <img
                      className=" rounded-t-lg object-cover"
                      src={item?.img2}
                      alt=""
                    />
                  </Link>

                  <div className="p-6">
                    <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                      {item?.title}
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                      {item?.details.substring(0, 200)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex  justify-between items-center ">
        <span
          onClick={handlePrevPage}
          disabled={isPrevButtonDisabled} // Use the disabled prop to disable the button
          className={`cursor-pointer text-white font-bold py-2 px-4 rounded ${
            isPrevButtonDisabled ? "opacity-50" : ""
          }`}
        >
          Previous
        </span>
        <span>
          {currentPage} / {totalRows}
        </span>
        <span
          onClick={handleNextPage}
          disabled={isNextButtonDisabled} // Use the disabled prop to disable the button
          className={`cursor-pointer text-white font-bold py-2 px-4 rounded ${
            isNextButtonDisabled ? "opacity-50" : ""
          }`}
        >
          Next
        </span>
      </div>
    </div>
  );
};

export default Products;
