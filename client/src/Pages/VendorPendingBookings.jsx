
import React, { useEffect, useState } from "react";
import axios from "axios";

const VendorPendingBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/vendor-bookings",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBookings(res.data.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/confirm-booking/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(res.data.message);
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Unable to confirm booking");
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/cancel-booking/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(res.data.message);
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Unable to cancel booking");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          All Booking Requests
        </h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-500">
              No Bookings Found
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {booking.serviceTitle}
                  </h2>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold capitalize ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="mt-5 space-y-2 text-gray-700">
                  <p>
                    <b>Date:</b> {booking.bookingDate}
                  </p>

                  <p>
                    <b>Time:</b> {booking.bookingTime}
                  </p>

                  <p>
                    <b>Location:</b> {booking.location}
                  </p>

                  <p className="text-blue-600 text-xl font-bold">
                    ₹{booking.price}
                  </p>
                </div>

                {booking.status === "pending" && (
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => handleConfirm(booking._id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPendingBookings;
