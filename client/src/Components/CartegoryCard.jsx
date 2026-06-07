import React from "react";

const CartegoryCard = ({ title, desc, img }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer group">
      <div className="overflow-hidden">
        <img
          src={img}
          alt={title}
          className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

        <p className="text-gray-500 mt-2 text-sm leading-6">{desc}</p>
      </div>
    </div>
  );
};

export default CartegoryCard;
