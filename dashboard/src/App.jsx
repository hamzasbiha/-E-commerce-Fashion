import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import NavbarAdmin from "./Layout/navbar/NavbarAdmin";
import SidebarAdmin from "./Layout/Sidebar/SidebarAdmin";
import HomePage from "./components/HomePage";
import Footer from "./Layout/Footer/Footer";
import Profile from "./Pages/Profile/Profile";
import Products from "./Pages/Products/Products";
import Orders from "./Pages/Orders/Orders";
import Client from "./Pages/Clients/Clients";
import Chart from "./components/Chart";
import User from "./Pages/user/User";
import NotFound from "./Pages/Not Found/NotFound";
import Login from "./components/Login";
import AuthAdmin from "./HOC/AuthAdmin";
import Team from "./Pages/team/Team";
import Raports from "./Pages/Raports/Raports";
import { TERipple } from "tw-elements-react";
import AddProducts from "./components/AddProducts";
import UpdateProduct from "./components/UpdateProduct";
import Single from "./Pages/Single/Single";
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
    <>
      <NavbarAdmin />
      <div className="flex">
        <SidebarAdmin className="w-1/5 " />
        <div className="flex-1 flex items-center justify-center">
          <Outlet />
        </div>
        <>
          {showButton && (
            <TERipple rippleColor="light">
              <button
                type="button"
                onClick={backToTop}
                className={` ${
                  showButton ? `inline-block` : `hidden`
                } fixed bottom-[40px] right-[40px] p-3 bg-slate-900  text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out`}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  className="w-4 h-4"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                  ></path>
                </svg>
              </button>
            </TERipple>
          )}
        </>
      </div>
      <div className=" block">
        <Footer />
      </div>
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <AuthAdmin element={Layout} />,

      children: [
        { path: "/", element: <HomePage /> },
        { path: "/Profile", element: <Profile /> },
        { path: "/users", element: <Client /> },

        { path: "/Orders", element: <Orders /> },
        { path: "/Chart", element: <Chart /> },
        { path: "/user/:1", element: <User /> },
        { path: "/Profile/:id", element: <Profile /> },
        { path: "/team", element: <Team /> },
        { path: "/Reports", element: <Raports /> },
        { path: "/products", element: <Products /> },
        { path: "/AddProducts", element: <AddProducts /> },
        { path: "/update/:id", element: <UpdateProduct /> },
        { path: "/productDetails/:id", element: <Single /> },
        { path: "*", element: <NotFound /> },
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
