import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllService, removeService } from "../redux/serviceSlice";
import { NavLink, useNavigate } from "react-router-dom";

const VendorServices = () => {
  const services = useSelector((store) => store.service.service);
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
  const handleDelete = async(id) =>{
    try {
      const response = await axios.delete(
        `http://localhost:8000/vendor/delete-service/${id}`,
         {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      ); 
       if (response.status === 200) {
         dispatch(removeService(id));
         alert("Service deleted successfully");
          navigate("/vendor/dashboard");
       } 
    } catch (error) {
      alert("Service not deleted");
      console.log("error in deleting service:", error)
    }  
  }
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
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <NavLink to={`/vendor/edit-service/${service._id}`}>
                      <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                        ✏️ Edit
                      </button>
                    </NavLink>

                    <button
                      onClick={() => handleDelete(service._id)}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      🗑️ Delete
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
