import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const VendorPendingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [reviewsMap, setReviewsMap] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/vendor-bookings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = res.data.bookings;
      setBookings(data);

      const completedServices = data
        .filter((b) => b.status === "completed")
        .map((b) => b.serviceId);

      completedServices.forEach((id) => {
        fetchReviews(id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async (serviceId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/service-reviews/${serviceId}`,
      );

      setReviewsMap((prev) => ({
        ...prev,
        [serviceId]: res.data.reviews,
      }));
    } catch (error) {
      console.log("Review fetch error:", error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/confirm-booking/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert(res.data.message);
      fetchBookings();
    } catch (error) {
      alert("Unable to accept booking");
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/vendor-cancel-booking/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert(res.data.message);
      fetchBookings();
    } catch (error) {
      alert("Unable to cancel booking");
    }
  };

  const handleComplete = async (id) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/complete-booking/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert(res.data.message);
      fetchBookings();
    } catch (error) {
      alert("Unable to mark completed");
    }
  };

  // ---------------- FILTER ----------------
  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter((b) => b.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">
          Booking Requests
        </h1>

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
          <div className="grid md:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">{booking.serviceTitle}</h2>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold capitalize ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="mt-5 space-y-2 text-gray-700">
                  <p>
                    <b>Customer:</b> {booking.userId?.name}
                  </p>

                  <p>
                    <b>Email:</b> {booking.userId?.email}
                  </p>

                  <p>
                    <b>Phone:</b> {booking.userId?.phone}
                  </p>
                  <p>
                    <b>Date:</b> {booking.bookingDate}
                  </p>
                  <p>
                    <b>Time:</b> {booking.bookingTime}
                  </p>
                  <p>
                    <b>Customer Address:</b> {booking.location}
                  </p>
                  <p className="text-blue-600 text-xl font-bold">
                    ₹{booking.price}
                  </p>
                </div>
                {booking.status === "pending" && (
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => handleAccept(booking._id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {booking.status === "confirmed" && (
                  <button
                    onClick={() => handleComplete(booking._id)}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                  >
                    Mark as Completed
                  </button>
                )}
                {booking.status === "completed" && (
                  <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-green-700 mb-2">
                      Customer Reviews
                    </h3>

                    {reviewsMap[booking.serviceId]?.length > 0 ? (
                      reviewsMap[booking.serviceId].map((r) => (
                        <div
                          key={r._id}
                          className="bg-white p-3 rounded-lg border mb-2"
                        >
                          <p className="font-semibold">
                            ⭐ {r.rating} - {r.userId?.name}
                          </p>
                          <p className="text-gray-600">{r.feedback}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No reviews yet</p>
                    )}
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
