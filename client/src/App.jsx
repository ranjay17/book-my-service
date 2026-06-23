import React, { useEffect } from "react";
import Header from "./Components/Header";
import VendorHeader from "./Components/VendorHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "./redux/userSlice";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const userStore = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(removeUser());
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        dispatch(removeUser());

        alert("Session expired. Please login again.");

        navigate("/login");
        return;
      }
      if (user) {
        dispatch(addUser(JSON.parse(user)));
      }
    } catch (error) {
      console.log(error)
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      dispatch(removeUser());

      navigate("/login");
    }
  }, [dispatch, navigate]);

  const header = userStore?.role === "vendor" ? <VendorHeader /> : <Header />;

  return (
    <div>
      {header}
      <Outlet />
    </div>
  );
};

export default App;
