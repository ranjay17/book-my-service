import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import ServicesCard from "./ServicesCard";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VendorDashboard from "./VendorDashboard";
import axios from "axios";
import { getAllService } from "../redux/serviceSlice";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const [ratingsMap, setRatingsMap] = React.useState({});
  const dispatch = useDispatch();
  const service = useSelector((store) => store.service.service);
  useEffect(() => {
    fetchAllService();
    fetchRatings();
  }, []);

  const fetchAllService = async () => {
    const response = await axios.get(`${BASE_URL}/vendor/all-service`);
    dispatch(getAllService(response.data.services));
  };

  const fetchRatings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/service-ratings`);

      const map = {};
      res.data.ratings.forEach((r) => {
        map[r._id] = {
          avg: r.avgRating.toFixed(1),
          count: r.totalReviews,
        };
      });

      setRatingsMap(map);
    } catch (error) {
      console.log(error)
    }
  };
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
          {featuredServices.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center min-h-[200px]">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <p className="mt-3 text-gray-500">Loading services...</p>
            </div>
          ) : (
            featuredServices.map((s) => (
              <ServicesCard
                key={s._id}
                id={s._id}
                title={s.title}
                rating={
                  ratingsMap[s._id]
                    ? `${ratingsMap[s._id].avg} (${ratingsMap[s._id].count})`
                    : "No reviews"
                }
                img={s.image}
                location={s.location}
                vendor={s.vendorId.name || "Service Provider"}
                price={s.price}
              />
            ))
          )}
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
