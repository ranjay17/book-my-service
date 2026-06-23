import express from "express";
import auth from "../middleware/auth.js";
import {
  getVendorBookings,
  confirmBooking,
  cancelBooking,
} from "../controllers/vendorController.js";

const router = express.Router();

router.get("/vendor-bookings", auth, getVendorBookings);

router.patch("/confirm-booking/:id", auth, confirmBooking);

router.patch("/vendor-cancel-booking/:id", auth, cancelBooking);

export default router;
