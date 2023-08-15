import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const AuthAdmin = ({ element: Component, ...rest }) => {
  const [cookies] = useCookies();

  // Check if the user is not authenticated
  const isAuthenticated = cookies.tokenAdmin;

  // If the user is not authenticated, redirect to the signin page
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  // If the user is authenticated, render the protected component
  return <Component {...rest} />;
};

export default AuthAdmin;
