import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import serviceRouter from "./routes/serviceRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import vendorRouter from "./routes/vendorRoutes.js";
import ratingRouter from "./routes/ratingRoutes.js";

dotenv.config();
db()
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());
app.use('/user', userRouter);
app.use('/vendor', serviceRouter);
app.use('/api', bookingRouter);
app.use('/api', vendorRouter);
app.use('/api', ratingRouter);

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port:", process.env.PORT)
})
