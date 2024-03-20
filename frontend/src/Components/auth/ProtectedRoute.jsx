import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
}
