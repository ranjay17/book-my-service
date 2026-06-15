import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const VendorDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/vendor-bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBookings(res.data.bookings);
    } catch (error) {
      console.log("Error in fetching bookings:", error);
    }
  };

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending",
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;

  const totalEarnings = bookings
    .filter((booking) => booking.status === "confirmed")
    .reduce((sum, booking) => sum + booking.price, 0);

  // Show only latest 5 bookings
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Welcome Section */}
      <div className="bg-blue-600 text-white rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold">Welcome Back 👋</h1>
        <p className="mt-2 text-lg text-blue-100">
          Manage your services and bookings from your dashboard.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Total Bookings</h2>
          <h1 className="text-4xl font-bold mt-2">{totalBookings}</h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Pending Bookings</h2>
          <h1 className="text-4xl font-bold mt-2 text-yellow-500">
            {pendingBookings}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Confirmed Jobs</h2>
          <h1 className="text-4xl font-bold mt-2 text-green-600">
            {confirmedBookings}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Total Earnings</h2>
          <h1 className="text-4xl font-bold mt-2 text-blue-600">
            ₹{totalEarnings}
          </h1>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <NavLink to="/vendor/create-service">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
              + Create Service
            </button>
          </NavLink>

          <NavLink to="/vendor/services">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
              View My Services
            </button>
          </NavLink>

          <NavLink to="/vendor/pending-bookings">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg">
              View Bookings
            </button>
          </NavLink>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Bookings</h2>

          <NavLink
            to="/vendor/pending-bookings"
            className="text-blue-600 font-semibold hover:underline"
          >
            View All →
          </NavLink>
        </div>

        {recentBookings.length === 0 ? (
          <p className="text-gray-500 text-lg">No bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {booking.serviceTitle}
                  </h3>

                  <p className="text-gray-500">📅 {booking.bookingDate}</p>

                  <p className="text-gray-500">🕒 {booking.bookingTime}</p>

                  <p className="text-gray-500">📍 {booking.location}</p>

                  <p className="text-blue-600 font-bold mt-1">
                    ₹{booking.price}
                  </p>
                </div>

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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
