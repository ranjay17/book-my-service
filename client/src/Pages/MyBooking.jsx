import React from "react";
import { useSelector } from "react-redux";

const MyBooking = () => {
  const bookings = useSelector((store) => store.booking);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">My Bookings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {bookings.length === 0 ? (
          <h1 className="text-3xl font-bold text-gray-500">No Bookings Yet</h1>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={booking.image}
                alt={booking.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h2 className="text-2xl font-bold">{booking.title}</h2>

                <p className="text-gray-600 mt-2">Vendor: {booking.vendor}</p>

                <p className="text-gray-600">Date: {booking.date}</p>

                <p className="text-gray-600">Time: {booking.time}</p>

                <p className="text-blue-600 font-bold text-xl mt-3">
                  ₹{booking.price}
                </p>

                <span className="inline-block mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
                  {booking.status}
                </span>
              </div>
            </div>
          ))
        )}
        {}
      </div>
    </div>
  );
};

export default MyBooking;
