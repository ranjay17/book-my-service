import React from "react";
import ServicesCard from "../Components/ServicesCard";
import { useSelector } from "react-redux";

const Services = () => {
  const services = useSelector((store)=>store.service.service);
  console.log(services)
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {services.map((s) => (
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
    </div>
  );
};

export default Services;
