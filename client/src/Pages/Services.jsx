import React, { useEffect, useState } from "react";
import ServicesCard from "../Components/ServicesCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Services = () => {
  const services = useSelector((store) => store.service.service);
  const searchText = useSelector((store) => store.service.searchText);

  console.log(
    "Full Service State:",
    useSelector((store) => store.service),
  );
  console.log("Search Text:", searchText);

  const [ratingsMap, setRatingsMap] = useState({});

  useEffect(() => {
    fetchRatings();
  }, []);

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
      console.log(error);
    }
  };

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className="py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">All Services</h1>

      {filteredServices.length === 0 ? (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold text-gray-500">
            No Services Found
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filteredServices.map((s) => (
            <ServicesCard
              key={s._id}
              id={s._id}
              title={s.title}
              rating={
                ratingsMap[s._id]
                  ? `${ratingsMap[s._id].avg} (${ratingsMap[s._id].count})`
                  : "No Reviews"
              }
              img={s.image}
              location={s.location}
              vendor={s.vendorId.name || "Service Provider"}
              price={s.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
