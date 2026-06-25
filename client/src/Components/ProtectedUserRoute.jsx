import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedUserRoute = ({ children }) => {
  const user = useSelector((store) => store.user.user);
  const token = localStorage.getItem("token");

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  if (!user && token) {
    return <div>Loading...</div>;
  }

  if (user?.role !== "user") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedUserRoute;
