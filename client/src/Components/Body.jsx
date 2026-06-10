import React from "react";
import HeroSection from "./HeroSection";
import popularServices from "../utils/popularServices";
import ServicesCard from "./ServicesCard";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import VendorDashboard from "./VendorDashboard";

const Body = () => {
  const featuredServices = popularServices.slice(0, 4);
  const user = useSelector((store) => store.user.user);

  if (user?.role === "vendor") {
    return <VendorDashboard />;
  }

  return (
    <div>
      <HeroSection />
      <div className="py-20 px-6 bg-gray-50">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-800">
            Explore Categories
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Choose from a wide range of trusted services.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {featuredServices.map((s) => (
            <ServicesCard
              key={s.id}
              id={s.id}
              title={s.title}
              rating={s.rating}
              img={s.image}
              location={s.location}
              vendor={s.vendor}
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
