import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userReducer";
import { useCookies } from "react-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailvefication, setEmailVerifaction] = useState("");
  const [ErrorVerfication, setErrorVerfication] = useState("");
  const [password, setPassword] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [loding, setLoding] = useState(false);
  const [err, setErr] = useState(null);
  const [cookie, setCookie] = useCookies();
  const navgation = useNavigate();
  const dispatch = useDispatch();
  const client = {
    email: email,
    password: password,
  };
  ///----------bottom drawer------------//
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
console.log(client)
  const handleLogin = async () => {
    setLoding(true);
    try {
      const res = await axios.post(
        "http://localhost:443/client/auth/login",
        client
      );

      dispatch(login(res.data.user)); // Dispatching the login action with the user data
      setCookie("token", res.data.accessToken); // Setting the token in the cookie
      setLoding(false);
      navgation(`/`);
    } catch (err) {
      setErr(err.response.data);
      setLoding(false);
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
          <h1>Login</h1>
          <div className="form">
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to={"/auth/forgetpassword"} className="link">Forget password ?</Link>

            <button onClick={() => handleLogin()}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
