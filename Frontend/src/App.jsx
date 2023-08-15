import "./App.scss";
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

const Layout = () => {
  return (
    <div className="App"> 
      <Navbar />
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
