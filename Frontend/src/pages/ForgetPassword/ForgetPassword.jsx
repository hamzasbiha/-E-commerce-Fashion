import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Forget.scss";
import axios from "axios";
import Swal from "sweetalert2";
const ForgetPassword = () => {
  console.log("hjklezahkl");
  const [verficationEmail, setVerficationEmail] = useState("");
  const navigation = useNavigate();
  console.log(verficationEmail);
  const SendingVerifyCode = async () => {
    const email = {
      email: verficationEmail,
    };
    try {
      const response = await axios.post(
        "http://localhost:443/api/users/auth/forgetpassword",
        email
      );
      console.log(response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Check your email for new password",
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      console.log({ error: error.message });
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
          <h1>Forget Password</h1>
          <div className="form">
            <input
              type="email"
              placeholder="verify"
              name="email"
              onChange={(e) => setVerficationEmail(e.target.value)}
            />

            <button onClick={SendingVerifyCode}>send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
