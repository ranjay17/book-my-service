import React, { useEffect } from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "./redux/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(addUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
