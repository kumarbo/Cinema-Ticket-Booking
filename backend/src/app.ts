import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes";
import authRoutes from "./routes/authRoutes";
import seatRoutes from "./routes/seatRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);

export default app;
