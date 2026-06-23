import Ratings from "../models/ratingModel.js";
import Booking from "../models/bookingModel.js";

export const createReview = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({
        message: "Only users can give reviews",
      });
    }

    const { rating, feedback, bookingId } = req.body;

    if (!rating || !feedback || !bookingId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }

    if (booking.status !== "completed") {
      return res.status(400).json({
        message: "Review can only be added after service completion",
      });
    }

    const existingReview = await Ratings.findOne({
      bookingId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "Review already submitted",
      });
    }

    const review = await Ratings.create({
      userId: booking.userId,
      serviceId: booking.serviceId,
      bookingId: booking._id,
      rating,
      feedback,
    });

    return res.status(201).json({
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getServiceReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const reviews = await Ratings.find({
      serviceId,
    })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getServiceRatings = async (req, res) => {
  try {
    const ratings = await Ratings.aggregate([
      {
        $group: {
          _id: "$serviceId",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json({
      ratings,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};