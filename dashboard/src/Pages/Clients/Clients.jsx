import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
const Clients = () => {
  const [cookie] = useCookies();
  const [user, setUser] = useState([]);
  console.log(cookie.tokenAdmin)
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:443/api/users/getallusers",
        {
          headers: { Authorization: `Bearer ${cookie.tokenAdmin}` },
        }
      );
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.log({ error: error.message });
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="h-full w-full">
      <h1 className="flex items-center justify-center text-5xl text-orange-500">
        Our Client's
      </h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>created_at</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {user.map((users) => (
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="font-bold">{users.id_user} </div>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={users.img_profile_user}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{users.FullName}</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                {users.FullName}
                <br />
              </td>
              <td>{users.email} </td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
