import React, { useState, useEffect } from "react";
import Hero from "../assets/bg.png";
import { useDispatch } from "react-redux";
import { setSearchText } from "../redux/serviceSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchedService, setSearchedService] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchService = () => {
    dispatch(setSearchText(searchedService));
    navigate("/services");
  };

  useEffect(() => {
  }, [searchedService]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img src={Hero} alt="bg" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 text-white max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Book Trusted
        </h1>

        <h1 className="text-5xl md:text-7xl font-bold text-blue-400 leading-tight">
          Services Near You
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200">
          Find salon, cleaning, repair, photography and more at your doorstep.
        </p>

        <div className="mt-8 bg-white p-3 rounded-xl flex items-center gap-3 w-full max-w-2xl shadow-xl">
          <input
            type="text"
            placeholder="Describe the service you need..."
            className="flex-1 outline-none text-gray-700 px-3 py-2"
            value={searchedService}
            onChange={(e) => setSearchedService(e.target.value)}
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            onClick={handleSearchService}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
