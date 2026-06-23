import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { removeUser } from "../redux/userSlice";
import { setSearchText } from "../redux/serviceSlice";

const Header = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch()
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
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-14 w-14 object-cover" />
            <h1 className="text-xl font-bold text-blue-600">BookMyService</h1>
          </NavLink>
        </div>

        <ul className="hidden md:flex items-center gap-8 font-medium">
          <li onClick={() => dispatch(setSearchText(""))}>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/my-bookings" className={navLinkClass}>
              My Bookings
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {user ? (
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                <button className="font-medium">Login</button>
              </NavLink>

              <NavLink to="/signup">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
                  Signup
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
