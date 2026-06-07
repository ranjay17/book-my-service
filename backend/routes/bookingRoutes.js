import express from "express";
import { cancelBooking, createBooking, getAllBooking } from "../controllers/bookingController.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router.post('/create-booking', auth,createBooking);
router.get('/all-booking', auth, getAllBooking)
router.patch('/cancel-booking/:id', auth, cancelBooking);

export default router;