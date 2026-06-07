import React, { useState } from "react";
import HeroSection from "./HeroSection";
import categories from "../utils/categoriesData";
import CartegoryCard from "./CartegoryCard";
import popularServices from "../utils/popularServices";
import ServicesCard from "./ServicesCard";
import { Link } from "react-router-dom";

const Body = () => {
   const[searchServices, setSearchServices] = useState("");
    const featuredCategories = categories.slice(0,4);
    const featuredServices = popularServices.slice(0,4);
  return (
    <div>
      <HeroSection searchServices={searchServices} setSearchServices={setSearchServices}/>
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
          {featuredCategories.map((c) => (
            <CartegoryCard
              key={c.id}
              title={c.title}
              desc={c.description}
              img={c.image}
            />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
            View All Categories
          </button>
        </div>
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
        <Link to="/services">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
            View All Services
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Body;
