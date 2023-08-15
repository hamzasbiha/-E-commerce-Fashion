import axios from "axios";
import React, { useEffect, useState } from "react";


const ListAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [loding, setLoding] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get("http://localhost:443/api/admin/getall");
        console.log(res.data);
        setAdmins(res.data);
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    fetchAdmins();
  }, [loding]);

  const DeleteAdmin = async (id) => {
    setLoding(true);

    try {
      const res = await axios.delete(`http://localhost:443/api/admin/${id}`);
      console.log(res);
      setLoding(false);
    } catch (error) {
      console.log({ error: error.message });
      setLoding(false);
    }
  };
  return (
    <div className="card  bg-black -mt-20 gap-5 ">
      <table className="table max-w-25   p-2">
        <thead className="gap-5">
          <tr className=" text-white">
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        {admins
          .filter((adminnn) => adminnn.Role !== "Admin")
          .map((list) => {
            return (
              <tbody className="space-y-8 items-center justify-center" key={list.id_admin}>
                <img
                  src={list.img_Profile}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover ml-12"
                />
                <td>{list.FullName}</td>
                <td>{list.email}</td>
                <td>{list.Role}</td>
                <button
                  className="btn btn-warning h-5 "
                  onClick={(x) => {
                    x = list.id_admin;
                    DeleteAdmin(x);
                  }}
                >
                  Delete
                </button>
              </tbody>
            );
          })}
      </table>
    </div>
  );
};

export default ListAdmin;
