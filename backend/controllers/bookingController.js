import Booking from "../models/bookingModel.js";
import Service from "../models/serviceModel.js";
import sendMail from "../utils/sendMail.js";
import User from "../models/userModel.js";

export const createBooking = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "Only users can book services" });
    }

    const { serviceId, bookingDate, bookingTime, location } = req.body;

    if (!serviceId || !bookingDate || !bookingTime || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(400).json({ message: "Service not found" });
    }

    const vendor = await User.findById(service.vendorId);

    const bookingDateObj = new Date(bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDateObj < today) {
      return res.status(400).json({ message: "Past dates cannot be booked" });
    }

    if (bookingDateObj.getTime() === today.getTime()) {
      const currentHour = new Date().getHours();

      const slotMap = {
        "10:00 AM": 10,
        "12:00 PM": 12,
        "02:00 PM": 14,
        "04:00 PM": 16,
      };

      if (slotMap[bookingTime] <= currentHour) {
        return res.status(400).json({ message: "Slot already passed" });
      }
    }

    const existingBooking = await Booking.findOne({
      serviceId,
      bookingDate,
      bookingTime,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existingBooking) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const newBooking = await Booking.create({
      userId: req.user.id,
      serviceId: service._id,
      vendorId: service.vendorId,
      serviceTitle: service.title,
      price: service.price,
      location,
      bookingDate,
      bookingTime,
      status: "pending",
    });

    if (vendor?.email) {
      sendMail(
        vendor.email,
        "New Booking Request",
        "You have a new booking request.",
      ).catch(() => {});
    }

    return res.status(200).json({
      message: "Booking request sent",
      booking: newBooking,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "Only users allowed" });
    }

    const bookings = await Booking.find({ userId: req.user.id }).sort({
      createdAt: -1,
    }); 

    return res.status(200).json({ booking: bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "Only users allowed" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(400).json({ message: "Not found" });

    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (["completed", "cancelled"].includes(booking.status)) {
      return res.status(400).json({ message: "Already processed" });
    }

    booking.status = "cancelled";
    await booking.save();

    const vendor = await User.findById(booking.vendorId);

    if (vendor?.email) {
      sendMail(
        vendor.email,
        "Booking Cancelled",
        `Booking for ${booking.serviceTitle} cancelled`,
      ).catch(() => {});
    }

    return res.status(200).json({
      message: "Cancelled successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
