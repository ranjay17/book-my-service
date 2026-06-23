import express from "express";
import auth from "../middleware/auth.js";
import {
  createReview,
  getServiceReviews,
  getServiceRatings,
} from "../controllers/ratingController.js";

const router = express.Router();

router.post("/create-review", auth, createReview);

router.get("/service-reviews/:serviceId", getServiceReviews);
router.get("/service-ratings", getServiceRatings);

export default router;
