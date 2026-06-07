import React, { useState } from "react";
import popularServices from "../utils/popularServices";
import ServicesCard from "../Components/ServicesCard";

const Services = () => {
  const [services, setServices] = useState(popularServices);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {services.map((s) => (
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
    </div>
  );
};

export default Services;
