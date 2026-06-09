import React from "react";
import { NavLink } from "react-router-dom";

const ServicesCard = ({ id, title, rating, img, location, vendor, price }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 cursor-pointer group">
      <div className="overflow-hidden relative">
        <img
          src={img}
          alt={title}
          className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold shadow">
          ⭐ {rating}
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
          {title}
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          By <span className="font-medium text-gray-700">{vendor}</span>
        </p>
        <p className="text-gray-500 text-sm mt-1">📍 {location}</p>
        <div className="flex items-center justify-between mt-5">
          <h3 className="text-2xl font-bold text-blue-600">₹{price}</h3>
          <NavLink
            to={`/service/${id}`}
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-500"
            }
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
              Book Now
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
