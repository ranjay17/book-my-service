import { useEffect, useState } from "react";
import { getVendorBookings, getReviews } from "../services/bookingService";

export const useVendorBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [reviewsMap, setReviewsMap] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await getVendorBookings();
      setBookings(res.data.bookings);

      const completed = res.data.bookings
        .filter((b) => b.status === "completed")
        .map((b) => b.serviceId);

      completed.forEach(async (id) => {
        const r = await getReviews(id);
        setReviewsMap((prev) => ({
          ...prev,
          [id]: r.data.reviews,
        }));
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    setBookings,
    reviewsMap,
    loading,
    refetch: fetchBookings,
  };
};
