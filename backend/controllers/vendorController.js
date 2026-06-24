import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import sendMail from "../utils/sendMail.js";
import { autoCompleteBookings } from "./bookingController.js";

export const getVendorBookings = async (req, res) => {
  await autoCompleteBookings();
  try {
    if (req.user.role !== "vendor") {
      return res.status(403).json({
        message: "Only vendors can access this route",
      });
    }
    const bookings = await Booking.find({
      vendorId: req.user.id,
    })
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    if (req.user.role !== "vendor") {
      return res.status(403).json({
        message: "Only vendors can confirm bookings",
      });
    }

    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.vendorId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }

    if (booking.status === "confirmed" || booking.status === "cancelled") {
      return res.status(400).json({
        message: `Booking is already ${booking.status}`,
      });
    }

    booking.status = "confirmed";
    await booking.save();

    const user = await User.findById(booking.userId);
    if (user) {
      try {
        await sendMail(
          user.email,
          "Booking Confirmed",
          "Your booking has been confirmed by the vendor.",
        );
      } catch (err) {
        console.log("Mail failed", err);
      }
    }

    return res.status(200).json({
      message: "Booking confirmed successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    if (req.user.role !== "vendor") {
      return res
        .status(400)
        .json({ message: "you are not allowed to cancel the request" });
    }
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(400).json({ message: "booking not found" });
    }
    if (booking.vendorId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }
    if (booking.status === "confirmed" || booking.status === "cancelled") {
      return res.status(400).json({
        message: `Booking is already ${booking.status}`,
      });
    }
    booking.status = "cancelled";
    await booking.save();
    const user = await User.findById(booking.userId);
    if (user) {
      try {
        await sendMail(
          user.email,
          "Booking Cancelled",
          "Unfortunately, your booking has been cancelled by the vendor.",
        );
      } catch (err) {
        console.log("Mail failed", err);
      }
    }
    res.status(200).json({
      message: "Service cancelled successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
