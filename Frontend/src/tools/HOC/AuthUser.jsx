import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const AuthUser = ({ element: Component, ...rest }) => {

  const [cookies] = useCookies();


  // Check if the user is not authenticated
  const isAuthenticated = cookies.token;

  // If the user is not authenticated, redirect to the signin page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated, render the protected component
  return <Component {...rest} />;
};

// Rest of your code...

export default AuthUser;
