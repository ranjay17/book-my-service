import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2 cursor-pointer">
          <Link to="/">
            <img src={logo} alt="logo" className="h-14 w-14 object-cover" />
          </Link>
          <Link to="/">
            <h1 className="text-xl font-bold text-blue-600">BookMyService</h1>
          </Link>
        </div>
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <li className="hover:text-blue-600 cursor-pointer transition">
            Home
          </li>
          <Link to="/services">
            <li className="hover:text-blue-600 cursor-pointer transition">
              Services
            </li>
          </Link>
          <Link to="/categories">
            <li className="hover:text-blue-600 cursor-pointer transition">
              Categories
            </li>
          </Link>

          <li className="hover:text-blue-600 cursor-pointer transition">
            Vendors
          </li>
          <li className="hover:text-blue-600 cursor-pointer transition">
            About
          </li>
          <Link to="/my-bookings">
            <li className="hover:text-blue-600 cursor-pointer transition">
              My Bookings
            </li>
          </Link>
        </ul>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="text-gray-700 font-medium hover:text-blue-600 transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
