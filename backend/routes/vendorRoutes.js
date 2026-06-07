import express from "express";
import auth from "../middleware/auth.js";
import {
  getVendorBookings,
  confirmBooking,
  completeBooking,
} from "../controllers/vendorController.js";

const router = express.Router();

router.get("/vendor-bookings", auth, getVendorBookings);

router.patch("/confirm-booking/:id", auth, confirmBooking);

router.patch("/complete-booking/:id", auth, completeBooking);

export default router;
