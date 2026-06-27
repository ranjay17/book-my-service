import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import sendMail from "../utils/sendMail.js";

export const getVendorBookings = async (req, res) => {
  try {
    if (req.user.role !== "vendor") {
      return res.status(403).json({ message: "Only vendors" });
    }

    const bookings = await Booking.find({ vendorId: req.user.id })
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({ bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Not found" });
    }

    if (booking.vendorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Already processed" });
    }

    booking.status = "confirmed";
    await booking.save();

    const user = await User.findById(booking.userId);
    if (user?.email) {
      try {
        await sendMail(
          user.email,
          "Booking Confirmed",
          "Your booking is confirmed",
        );
      } catch (err) {
        console.error("Confirm email failed:", err.message);
      }
    }

    return res.status(200).json({
      message: "Confirmed",
      booking,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Not found" });
    }

    if (booking.vendorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Already processed" });
    }

    booking.status = "cancelled";
    await booking.save();

    const user = await User.findById(booking.userId);
    if (user?.email) {
      try {
        await sendMail(
          user.email,
          "Booking Cancelled",
          "Your booking was cancelled",
        );
      } catch (err) {
        console.error("Cancel email failed:", err.message);
      }
    }

    return res.status(200).json({
      message: "Cancelled",
      booking,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
