import express from "express";
import Booking from "../models/Booking";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

// CREATE BOOKING (PROTECTED)
router.post("/", verifyToken, async (req: any, res) => {
  try {
    const booking = await Booking.create({
      userId: req.user.userId,
      movieId: req.body.movieId,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      seats: req.body.seats,
      totalPrice: req.body.totalPrice,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
});

// GET LOGGED-IN USER BOOKINGS
router.get("/my", verifyToken, async (req: any, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.userId,
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

export default router;
