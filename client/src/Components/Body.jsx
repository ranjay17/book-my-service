import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import ServicesCard from "./ServicesCard";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VendorDashboard from "./VendorDashboard";
import axios from "axios";
import { getAllService } from "../redux/serviceSlice";

const Body = () => {
  const dispatch = useDispatch();
  const service = useSelector((store)=>store.service.service);
  useEffect(() => {
    fetchAllService();
  }, []);

  const fetchAllService = async() =>{
    const response = await axios.get(
      "http://localhost:8000/vendor/all-service",
    );
    dispatch(getAllService(response.data.services))
  }
  const featuredServices = service.slice(0, 4);
  const user = useSelector((store) => store.user.user);

  if (user?.role === "vendor") {
    return <VendorDashboard />;
  }
  return (
    <div>
      <HeroSection />
      <div className="py-20 px-6 bg-gray-50">
        <div className="text-center mb-14">
          <p className="text-gray-500 mt-3 text-lg">
            Choose from a wide range of trusted services.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {featuredServices.map((s) => (
            <ServicesCard
              key={s._id}
              id={s._id}
              title={s.title}
              rating={s.rating || 4.8}
              img={s.image}
              location={s.location}
              vendor={s.vendorId.name || "Service Provider"}
              price={s.price}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <NavLink to="/services">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
              View All Services
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Body;
