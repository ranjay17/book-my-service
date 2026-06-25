import React, { useEffect } from "react";
import Header from "./Components/Header";
import VendorHeader from "./Components/VendorHeader";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "./redux/userSlice";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const userStore = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token) {
      dispatch(removeUser());
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        dispatch(removeUser());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return;
      }

      if (user) {
        dispatch(addUser(JSON.parse(user)));
      }
    } catch (err) {
      dispatch(removeUser());
    }
  }, []);

  const header = userStore?.role === "vendor" ? <VendorHeader /> : <Header />;

  return (
    <div>
      {header}
      <Outlet />
    </div>
  );
};

export default App;
