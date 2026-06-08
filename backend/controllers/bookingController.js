import Booking from "../models/bookingModel.js";
import Service from "../models/serviceModel.js";
import sendMail from "../utils/sendMail.js";
import User from "../models/userModel.js";

export const createBooking = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(400).json({
        message: "Only users can book services",
      });
    }

    const { serviceId, bookingDate, bookingTime } = req.body;

    if (!serviceId || !bookingDate || !bookingTime) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(400).json({
        message: "Service not found",
      });
    }
    const vendor = await User.findById(service.vendorId);

    if (!vendor) {
  return res.status(404).json({
    message: "Vendor not found",
  });
}

    const existingBooking = await Booking.findOne({
      serviceId,
      bookingDate,
      bookingTime,
      status: {
        $in: ["pending", "confirmed"],
      },
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This slot is already booked",
      });
    }

    const newBooking = new Booking({
      userId: req.user.id,
      serviceId: service._id,
      vendorId: service.vendorId,
      serviceTitle: service.title,
      price: service.price,
      location: service.location,
      bookingDate,
      bookingTime,
      status: "pending",
    });

    await newBooking.save();
    try {
      await sendMail(
        vendor.email,
        "New Booking Request",
        "You have received a new booking request. Please confirm or cancel it.",
      );
    } catch (err) {
      console.log("Mail failed");
    }

    return res.status(200).json({
      message: "Booking request sent",
      booking: newBooking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(400).json({
        message: "Only users can view their bookings",
      });
    }
    const booking = await Booking.find({ userId: req.user.id });
    return res.status(200).json({
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
    if (req.user.role !== "user") {
      return res.status(400).json({
        message: "Only users can cancel bookings",
      });
    }

    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(400).json({
        message: "Booking not found",
      });
    }

    if (booking.userId.toString() !== req.user.id) {
      return res.status(400).json({
        message: "You are not authorized to cancel this booking",
      });
    }

    if (booking.status === "completed" || booking.status === "cancelled") {
      return res.status(400).json({
        message: `Booking is already ${booking.status}`,
      });
    }

    booking.status = "cancelled";
    await booking.save();

    return res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
