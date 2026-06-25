import React, { useState } from "react";

const BookingCard = ({ booking, onAccept, onReject, onComplete }) => {
  const [loadingAction, setLoadingAction] = useState(null);

  const handleAction = async (action, fn) => {
    try {
      setLoadingAction(action);
      await fn(booking._id);
    } finally {
      setLoadingAction(null);
    }
  };

  const isLoading = (action) => loadingAction === action;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">{booking.serviceTitle}</h2>

      <p>
        <b>User:</b> {booking.userId?.name}
      </p>

      {booking.status === "confirmed" && (
        <p>
          <b>Phone:</b> {booking.userId?.phone}
        </p>
      )}

      <p>
        <b>Date:</b> {booking.bookingDate}
      </p>

      <p>
        <b>Time:</b> {booking.bookingTime}
      </p>

      <p className="mt-2 font-semibold">Status: {booking.status}</p>

      {booking.status === "pending" && (
        <div className="flex gap-3 mt-5">
          <button
            disabled={isLoading("accept")}
            onClick={() => handleAction("accept", onAccept)}
            className={`flex-1 py-2 rounded text-white ${
              isLoading("accept")
                ? "bg-gray-400"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading("accept") ? "Processing..." : "Accept"}
          </button>

          <button
            disabled={isLoading("reject")}
            onClick={() => handleAction("reject", onReject)}
            className={`flex-1 py-2 rounded text-white ${
              isLoading("reject")
                ? "bg-gray-400"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isLoading("reject") ? "Processing..." : "Reject"}
          </button>
        </div>
      )}

      {booking.status === "confirmed" && (
        <button
          disabled={isLoading("complete")}
          onClick={() => handleAction("complete", onComplete)}
          className={`w-full mt-5 py-2 rounded text-white ${
            isLoading("complete")
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading("complete") ? "Processing..." : "Mark Completed"}
        </button>
      )}
    </div>
  );
};

export default BookingCard;
