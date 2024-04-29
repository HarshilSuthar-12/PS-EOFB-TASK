import React from "react";
import { Navigate } from "react-router-dom";
 
function ProtectedRoute({ component: Component, ...rest }) {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");
 
  // Check if token exists and is not null
  if (token) return <Component {...rest} />;
 
  // If no token, redirect to login page
  return <Navigate to="/" replace />;
}
 
export default ProtectedRoute;