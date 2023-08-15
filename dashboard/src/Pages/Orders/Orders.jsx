import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
const Orders = () => {
  const [cookie] = useCookies();
  const [Orders, setOrders] = useState([]);
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:443/order/Allorders", {
        headers: { Authorization: `Bearer ${cookie.tokenAdmin}` },
      });
      console.log(res.data);
      setOrders(res.data);
    } catch (error) {
      console.log({ error: error.message });
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="h-full w-full p-4 gap-3 ml-8">
      <h1 className="flex items-center justify-center text-5xl text-orange-500">
        Orders
      </h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>payed</th>
            <th>Status</th>
            <th>client</th>
          </tr>
        </thead>
        <tbody>
          {/* row s*/}
          {Orders?.map((items) => (
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="font-bold">{items.id_order} </div>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={items.img}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{items.title}</div>
                    <div className="text-sm opacity-50">{items.category}</div>
                  </div>
                </div>
              </td>
              <td>
                {items.FullName}
                <br />
              </td>
              <td>{items.email} </td>
              <th>
                <td className="flex items-center space-x-3">
                  {items.price} DT{" "}
                </td>
              </th>
              <th>
                <td className="flex items-center space-x-3">{items.status} </td>
              </th>
              <th>
                <td className="flex items-center space-x-3">{items.email} </td>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
