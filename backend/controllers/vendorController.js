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
    }).sort({ createdAt: -1 });

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

export const cancelBooking = async(req,res) =>{
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
    res.status(200).json({
      message: "Service cancelled successfully",
      booking
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  

}
