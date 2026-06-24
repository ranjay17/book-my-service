import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/userSlice";

const VendorHeader = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  const navLinkClass = ({ isActive }) =>
    `${
      isActive ? "text-blue-600 font-bold" : "text-gray-700"
    } hover:text-blue-600 transition`;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(removeUser());
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <NavLink to="/vendor/dashboard" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-14 w-14 object-cover" />
            <h1 className="text-xl font-bold text-blue-600">BookMyService</h1>
          </NavLink>
        </div>
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <li>
            <NavLink to="/vendor/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/vendor/services" className={navLinkClass}>
              My Services
            </NavLink>
          </li>

          <li>
            <NavLink to="/vendor/create-service" className={navLinkClass}>
              Create Service
            </NavLink>
          </li>

          <li>
            <NavLink to="/vendor/bookings" className={navLinkClass}>
              Bookings
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
