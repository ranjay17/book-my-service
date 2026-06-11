import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllService } from "../redux/serviceSlice";

const VendorServices = () => {
  const services = useSelector((store) => store.service.service);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/vendor/all-service",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      dispatch(getAllService(response.data.services));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">My Services</h1>

        <p className="text-gray-500 mb-8">Manage all your created services.</p>

        {services.length === 0 ? (
          <div className="bg-white shadow rounded-xl p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-600">
              No Services Found
            </h2>

            <p className="text-gray-400 mt-2">
              Create your first service to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="text-2xl font-bold">{service.title}</h2>

                  <p className="text-gray-500 mt-2 line-clamp-3">
                    {service.description}
                  </p>

                  <div className="mt-4 space-y-2">
                    <p>
                      <span className="font-semibold">Category:</span>{" "}
                      {service.category}
                    </p>

                    <p>
                      <span className="font-semibold">Location:</span>{" "}
                      {service.location}
                    </p>

                    <p className="text-blue-600 font-bold text-xl">
                      ₹{service.price}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg">
                      Edit
                    </button>

                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorServices;
