import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import serviceRouter from "./routes/serviceRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import vendorRouter from "./routes/vendorRoutes.js";

dotenv.config();
db()
const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/service', serviceRouter);
app.use('/api', bookingRouter);
app.use('/api', vendorRouter);

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port:", process.env.PORT)
})
