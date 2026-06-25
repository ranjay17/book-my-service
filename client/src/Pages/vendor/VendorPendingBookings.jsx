import React from "react";
import BookingCard from "../../Components/BookingCard";
import { useVendorBookings } from "../../hooks/useVendorBookings";
import {
  confirmBooking,
  cancelBooking,
  completeBooking,
} from "../../services/bookingService";

const VendorPendingBookings = () => {
  const { bookings, loading, refetch } = useVendorBookings();

  const handleAction = async (fn, id) => {
    await fn(id);
    refetch(); 
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {bookings.map((b) => (
        <BookingCard
          key={b._id}
          booking={b}
          onAccept={(id) => handleAction(confirmBooking, id)}
          onReject={(id) => handleAction(cancelBooking, id)}
          onComplete={(id) => handleAction(completeBooking, id)}
        />
      ))}
    </div>
  );
};

export default VendorPendingBookings;
