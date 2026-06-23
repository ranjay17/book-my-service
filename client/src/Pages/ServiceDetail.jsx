import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const ServiceDetail = () => {
  const [selectDate, setSelectData] = useState("");
  const [selectTime, setSelectTime] = useState("");
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const services = useSelector((store) => store.service.service);
  const service = services.find((s) => s._id === id);

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/service-reviews/${id}`,
      );
      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + Number(r.rating), 0) / reviews.length
        ).toFixed(1)
      : null;

  const handleBookService = async () => {
    if (!selectDate || !selectTime) {
      alert("Please select date and time slot");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/create-booking`,
        {
          serviceId: service._id,
          bookingDate: selectDate,
          bookingTime: selectTime,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert(response.data.message);
      navigate("/my-bookings");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  if (!service) {
    return <h1 className="text-center text-2xl">Service Not Found</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <img src={service.image} className="w-full h-[450px] object-cover" />

        <div className="p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">{service.title}</h1>

            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
              ⭐ {averageRating ? averageRating : "4.8"} ({reviews.length})
            </span>
          </div>

          <p className="mt-4 text-lg">Vendor: {service.vendorId.name}</p>

          <p className="text-gray-500">📍 {service.location}</p>

          <h2 className="text-3xl font-bold text-blue-600 mt-4">
            ₹{service.price}
          </h2>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold">Select Slot</h3>

            <input
              type="date"
              value={selectDate}
              onChange={(e) => setSelectData(e.target.value)}
              className="border p-2 mt-3"
            />

            <div className="flex gap-3 mt-3">
              {["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectTime(t)}
                  className={`px-3 py-2 border rounded ${
                    selectTime === t ? "bg-green-500 text-white" : ""
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleBookService}
            className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Book Service
          </button>
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet</p>
            ) : (
              reviews.map((r) => (
                <div key={r._id} className="border-b py-3">
                  <p className="font-semibold">
                    ⭐ {r.rating} - {r.userId?.name}
                  </p>
                  <p className="text-gray-600">{r.feedback}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
