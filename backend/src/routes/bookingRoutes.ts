import express from "express";
import Booking from "../models/Booking";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

/* =========================
   CREATE BOOKING
========================= */
router.post("/", verifyToken, async (req: any, res) => {
  try {
    const { movieId, movieName, date, time, location, seats, totalPrice } =
      req.body;

    if (!movieId || !movieName || !seats?.length) {
      return res.status(400).json({
        message: "Missing booking details",
      });
    }

    // prevent double booking
    const existing = await Booking.findOne({
      movieId: String(movieId),
      date: String(date),
      time: String(time),
      location: String(location),
      seats: { $in: seats },
    });

    if (existing) {
      return res.status(400).json({
        message: "One or more seats already booked",
      });
    }

    const booking = await Booking.create({
      userId: req.user.userId,
      movieId,
      movieName,
      date,
      time,
      location,
      seats,
      totalPrice,
    });

    return res.status(201).json(booking);
  } catch (err) {
    console.log("BOOKING ERROR:", err);
    return res.status(500).json({
      message: "Booking failed",
    });
  }
});

/* =========================
   GET BOOKED SEATS
========================= */
router.get("/seats", async (req, res) => {
  try {
    const { movieId, date, time, location } = req.query;

    const bookings = await Booking.find({
      movieId: String(movieId),
      date: String(date),
      time: String(time),
      location: String(location),
    });

    // FIXED TYPE ERROR HERE
    const bookedSeats: string[] = [];

    bookings.forEach((b: any) => {
      if (Array.isArray(b.seats)) {
        bookedSeats.push(...b.seats);
      }
    });

    return res.json(bookedSeats);
  } catch (err) {
    console.log("SEATS ERROR:", err);
    return res.status(500).json({
      message: "Failed to fetch booked seats",
    });
  }
});

/* =========================
   GET USER BOOKINGS
========================= */
router.get("/my", verifyToken, async (req: any, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.json(bookings);
  } catch (err) {
    console.log("MY BOOKINGS ERROR:", err);
    return res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
});

export default router;
