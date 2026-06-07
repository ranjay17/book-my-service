import Booking from "../models/bookingModel.js";

export const getVendorBookings = async (req, res) => {
  try {
    if (req.user.role !== "vendor") {
      return res.status(403).json({
        message: "Only vendors can access this route",
      });
    }

    const bookings = await Booking.find({
      vendorId: req.user.id,
    });

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

    if (
      booking.status === "confirmed" ||
      booking.status === "completed" ||
      booking.status === "cancelled"
    ) {
      return res.status(400).json({
        message: `Booking is already ${booking.status}`,
      });
    }

    booking.status = "confirmed";
    await booking.save();

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

export const completeBooking = async (req, res) => {
  try {
    if (req.user.role !== "vendor") {
      return res.status(403).json({
        message: "Only vendors can complete bookings",
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

    if (booking.status !== "confirmed") {
      return res.status(400).json({
        message: "Only confirmed bookings can be completed",
      });
    }

    booking.status = "completed";
    await booking.save();

    return res.status(200).json({
      message: "Booking completed successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
