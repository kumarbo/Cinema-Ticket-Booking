import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes";
import authRoutes from "./routes/authRoutes";
import seatRoutes from "./routes/seatRoutes";
import movieRoutes from "./routes/movieRoutes";
import showRoutes from "./routes/showRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);

export default app;
