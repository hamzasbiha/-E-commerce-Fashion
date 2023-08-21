import "./App.scss";
import { useState,useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "./pages/Homepage/HomePage";
import Products from "./pages/Products/Products";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import SingleProduct from "./pages/SingleProdcut/SingleProduct";
import Contact from "./components/Contact/Contact";
import Profile from "./pages/Profile/Profile";
import AuthUser from "./tools/HOC/AuthUser";
import CartList from "./components/CartList/CartList";
import SuccesPayment from "./pages/succesPayment/SuccesPayment";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import RestPassword from "./pages/Rest-password/RestPassword";
import { TERipple } from "tw-elements-react";
const Layout = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const backToTop = () => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="App">
      <Navbar />
     {showButton && <button className="BtnScroll" onClick={backToTop}>
      <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
    >
      <path d="M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" />
    </svg>
      </button>}
      <Outlet />
      <Footer />
    </div>
  );
};
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/Contact",
          element: <Contact />,
        },
        {
          path: "/products/:search_query",

          element: <Products />,
        },
        {
          path: "/products/",

          element: <Products />,
        },
        {
          path: "/product/:id",
          element: <SingleProduct />,
        },
        {
          path: "/Login",
          element: <Login />,
        },
        {
          path: "/Register",
          element: <Register />,
        },
        {
          path: "/checkout-succes",
          element: <SuccesPayment />,
        },
        {
          path: "/profile/:id",
          element: <AuthUser element={Profile} />,
        },
        {
          path: "/carts",
          element: <AuthUser element={CartList} />,
        },
        {
          path: "/auth/forgetpassword",
          element: <ForgetPassword />,
        },
        {
          path: "/reset-password",
          element: <RestPassword />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
