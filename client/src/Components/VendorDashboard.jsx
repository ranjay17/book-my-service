import React from "react";
import { NavLink } from "react-router-dom";

const VendorDashboard = () => {
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
          <h2 className="text-gray-500">Total Services</h2>
          <h1 className="text-4xl font-bold mt-2">8</h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Pending Bookings</h2>
          <h1 className="text-4xl font-bold mt-2 text-yellow-500">5</h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Completed Jobs</h2>
          <h1 className="text-4xl font-bold mt-2 text-green-600">24</h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Total Earnings</h2>
          <h1 className="text-4xl font-bold mt-2 text-blue-600">₹18,500</h1>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <NavLink to='/vendor/create-service'>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
              + Create Service
            </button>
          </NavLink>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
            View My Services
          </button>

          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg">
            View Bookings
          </button>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Recent Bookings</h2>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-3">
            <div>
              <h3 className="font-semibold">AC Repair</h3>
              <p className="text-gray-500">Customer: Rahul Sharma</p>
            </div>

            <span className="text-yellow-600 font-semibold">Pending</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <div>
              <h3 className="font-semibold">Salon Service</h3>
              <p className="text-gray-500">Customer: Aman Verma</p>
            </div>

            <span className="text-green-600 font-semibold">Accepted</span>
          </div>

          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">Photography</h3>
              <p className="text-gray-500">Customer: Priya Singh</p>
            </div>

            <span className="text-blue-600 font-semibold">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
