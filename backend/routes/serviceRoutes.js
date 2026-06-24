import express from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getParticularService,
  updateService,
  getMyServices,
} from "../controllers/serviceController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/create-service', auth,createService);
router.get('/all-service', getAllServices);
router.get('/particular-service/:id', getParticularService)
router.patch('/update-service/:id', auth,updateService);
router.delete('/delete-service/:id', auth, deleteService);
router.get("/my-services", auth, getMyServices);

export default router;