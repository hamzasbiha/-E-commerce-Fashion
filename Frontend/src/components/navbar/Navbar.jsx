import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import Cart from "../cart/Cart";
import { useSelector } from "react-redux";
import { Cookies, useCookies } from "react-cookie";
import { useStripe } from '@stripe/react-stripe-js';

//my drawerr
const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const product = useSelector((state) => state.cart.product);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const drawerButton = document.querySelector(".toggle-button");
      if (!drawerButton.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };
 
  
  return (
    <>
      <span className="toggle-button" onClick={handleDrawerToggle}>
        <span className="carticon">
          <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M5.792 2H1v2h3.218l2.77 12.678H7V17h13v-.248l2.193-9.661L22.531 6H6.655l-.57-2.611L5.792 2zm14.195 6H7.092l1.529 7h9.777l1.589-7z"
              clipRule="evenodd"
            />
            <path
              fill="currentColor"
              d="M10 22a2 2 0 100-4 2 2 0 000 4zM19 20a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="span">{product.length}</span>
        </span>
      </span>
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <Cart />
      </div>
    </>
  );
};
//my nav bar
const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigate();
  
  const logout = () => {
    removeCookie("token");
    navigation("/login");
  };

  return (
    <>
          {showSearch && (
        <div className="top"><div className="search">
          <input type="text" className="input" />
        </div></div>
      )}
    <div className="NavBar">

      <div className="wrapper">
        <div className="left">
          <Link to={`/products/Homme`} className="item">
            Homme
          </Link>
          <Link to={`/products/femme`} className="item">
            femme
          </Link>
          <Link to={`/products/enfant`} className="item">
            enfant
          </Link>
        </div>
        <div className="center">
          <Link className="link" to={"/"}>
            ShopLena
          </Link>
        </div>
        <div className="right">
          <div className="item">
            <Link className="link" to={"/"}>
              HomePage
            </Link>
          </div>
          <div className="item">
            <Link className="link">About</Link>
          </div>
          <div className="item">
            <Link className="link">contact</Link>
          </div>
          <div className="item">
            <Link className="link" to={"/products"}>Stores</Link>
          </div>
          {/* search */}
          <Link className="link">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
              onClick={() => setShowSearch(!showSearch)}
            >
              <path d="M10 18a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0018 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
              <path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 00-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z" />
            </svg>
          </Link>

          {!cookie.token ? (
            <Link className="link" to={"/Login"}>
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
              </svg>
            </Link>
          ) : (
            <Link to={`/profile/${user.id_user}`} className="link">
              <img src={user.img_profile_user} alt="" className="profilePic" />
            </Link>
          )}
          <Drawer />
          {cookie.token ? (
            <div className="item">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
                className="logout"
                onClick={() => logout()}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M4 18h2v2h12V4H6v2H4V3a1 1 0 011-1h14a1 1 0 011 1v18a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zm2-7h7v2H6v3l-5-4 5-4v3z" />
              </svg>
            </div>
          ) : null}
        </div>
      </div>
    </div>
    </>
  );
};

export default Navbar;
