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
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token) {
      dispatch(removeUser());
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        dispatch(removeUser());
        navigate("/login");
        return;
      }

      if (user) {
        dispatch(addUser(JSON.parse(user)));
      }
    } catch (err) {
      dispatch(removeUser());
      navigate("/login");
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
