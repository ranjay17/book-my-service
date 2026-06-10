import React, { useEffect } from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./redux/userSlice";
import VendorHeader from "./Components/VendorHeader";

const App = () => {
  const userStore = useSelector((store)=>store.user.user);
  const dispatch = useDispatch();
  console.log(userStore)

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(addUser(JSON.parse(user)));
    }
  }, [dispatch]);

  const header = userStore?.role === "vendor" ? <VendorHeader /> : <Header />;

  return (
    <div>
      {header}
      <Outlet />
    </div>
  );
};

export default App;
