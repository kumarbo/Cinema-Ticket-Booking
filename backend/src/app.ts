import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

export default app;
