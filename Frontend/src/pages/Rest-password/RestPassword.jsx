import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RestPassword.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const RestPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const Navgation=useNavigate()
  const information={
    token: token,
    newPassword: newPassword,
  }
  console.log(information)
  const handleRestPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        Swal.fire("Error", "Passwords do not match", "error");
        return;
      } else {
        const res = await axios.post(
          "http://localhost:443/api/users/rest-password",information
        );
        console.log(res);
        Navgation("/Login")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>ShopLena</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Rest Password</h1>
          <div className="form">
            <input
              type="password"
              placeholder="New password"
              name="new password"
              required="true"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="confirme password"
              name="password"
              required="true"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={() => handleRestPassword()}>Rest password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestPassword;
