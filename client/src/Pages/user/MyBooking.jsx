import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${BASE_URL}/api/all-booking`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBookings(response.data?.booking || []);
    } catch (error) {
      console.log(error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      setLoading(true)
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
      setLoading(false)
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Unable to cancel booking");
      setLoading(false)
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === activeTab);

  if (loading) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        <p className="mt-3 text-gray-500">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">My Bookings</h1>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {["all", "pending", "confirmed", "completed", "cancelled"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ),
          )}
        </div>

        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-500">
              No Bookings Found
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">{booking.serviceTitle}</h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(
                      booking.status,
                    )}`}
                  >
                    {booking.status || "unknown"}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <p>
                    <b>Date:</b> {booking.bookingDate}
                  </p>

                  <p>
                    <b>Time:</b> {booking.bookingTime}
                  </p>

                  <p>
                    <b>Location:</b> {booking.location}
                  </p>

                  <p className="text-blue-600 font-bold text-xl mt-2">
                    ₹{booking.price}
                  </p>
                </div>

                {(booking.status === "pending" ||
                  booking.status === "confirmed") && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
                  >
                    Cancel Booking
                  </button>
                )}

                {booking.status === "completed" && (
                  <button
                    onClick={() => navigate(`/add-review/${booking._id}`)}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                  >
                    Add Review
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
