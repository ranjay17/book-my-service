import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import popularServices from "../utils/popularServices";
import { useDispatch } from "react-redux";
import { addBooking } from "../redux/bookingSlice";

const ServiceDetail = () => {
  const[selectDate, setSelectData] = useState("");
  const[selectTime, setSelectTime] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const service = popularServices.find((s) => s.id === Number(id));

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500">Service Not Found</h1>
      </div>
    );
  }

  const handleBookService = () => {
     dispatch(
       addBooking({
         serviceId: service.id,
         title: service.title,
         vendor: service.vendor,
         price: service.price,
         image: service.image,
         date: selectDate,
         time: selectTime,
         status: "Confirmed",
       }),
     );

    if (!selectDate || !selectTime) {
      alert("Please select date and time slot");
      return;
    }

    alert(`${service.title} confirmed on ${selectDate} at ${selectTime}`);
    navigate("/my-bookings");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image */}
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-[450px] object-cover"
        />

        {/* Content */}
        <div className="p-8">
          {/* Title + Rating */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">
              {service.title}
            </h1>

            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
              ⭐ {service.rating}
            </span>
          </div>

          {/* Vendor */}
          <p className="mt-4 text-lg text-gray-600">
            Vendor:
            <span className="font-semibold text-gray-800 ml-2">
              {service.vendor}
            </span>
          </p>

          {/* Location */}
          <p className="mt-2 text-gray-500">📍 Location: {service.location}</p>

          {/* Price */}
          <div className="mt-6">
            <h2 className="text-3xl font-bold text-blue-600">
              ₹{service.price}
            </h2>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-3">Description</h3>

            <p className="text-gray-600 leading-7">
              Professional {service.title.toLowerCase()} service provided by
              experienced experts. Get reliable, high-quality service at your
              preferred location and time.
            </p>
          </div>

          {/* Booking Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Select Date & Slot</h3>

            <div className="flex flex-col gap-5">
              <input
                type="date"
                value={selectDate}
                onChange={(e)=>setSelectData(e.target.value)}
                className="border border-gray-300 px-4 py-3 rounded-lg w-fit focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex flex-wrap gap-4">
                <button
                  className="border px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
                  onClick={() => setSelectTime("10:00 AM")}
                  style={{
                    background: selectTime === "10:00 AM" ? "green" : "",
                  }}
                >
                  10:00 AM
                </button>

                <button
                  className="border px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
                  onClick={() => setSelectTime("12:00 PM")}
                  style={{
                    background: selectTime === "12:00 PM" ? "green" : "",
                  }}
                >
                  12:00 PM
                </button>

                <button
                  className="border px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
                  onClick={() => setSelectTime("02:00 PM")}
                  style={{
                    background: selectTime === "02:00 PM" ? "green" : "",
                  }}
                >
                  02:00 PM
                </button>

                <button
                  className="border px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
                  onClick={() => setSelectTime("04:00 PM")}
                  style={{
                    background: selectTime === "04:00 PM" ? "green" : "",
                  }}
                >
                  04:00 PM
                </button>
              </div>
            </div>
          </div>

          {/* Book Button */}
          <div className="mt-10">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition"
            onClick={handleBookService}
            >
              Book Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
