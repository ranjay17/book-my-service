import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/all-booking`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setBookings(response.data.booking);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/cancel-booking/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert(response.data.message);
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Unable to cancel booking");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-500">No Bookings Yet</h2>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold">{booking.serviceTitle}</h2>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold capitalize
                    ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  <p>
                    <b>Date :</b> {booking.bookingDate}
                  </p>

                  <p>
                    <b>Time :</b> {booking.bookingTime}
                  </p>

                  <p>
                    <b>Location :</b> {booking.location}
                  </p>

                  <p className="text-blue-600 font-bold text-xl">
                    ₹{booking.price}
                  </p>
                </div>

                {(booking.status === "pending" ||
                  booking.status === "confirmed") && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
                  >
                    Cancel Booking
                  </button>
                )}

                {booking.status === "completed" && (
                  <button
                    onClick={() => navigate(`/add-review/${booking._id}`)}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                  >
                    Add Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
