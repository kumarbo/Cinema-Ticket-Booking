import express from "express";
import SeatLock from "../models/SeatLock";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

// LOCK SEAT
router.post("/lock", verifyToken, async (req: any, res) => {
  try {
    const { movieId, date, time, location, seatId } = req.body;

    const existing = await SeatLock.findOne({
      movieId,
      date,
      time,
      location,
      seatId,
    });

    if (existing) {
      return res.status(400).json({ message: "Seat already locked" });
    }

    const lock = await SeatLock.create({
      movieId,
      date,
      time,
      location,
      seatId,
      lockedBy: req.user.userId,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
    });

    res.json(lock);
  } catch (err) {
    res.status(500).json({ message: "Lock failed" });
  }
});

// GET LOCKED SEATS
router.get("/", async (req, res) => {
  const { movieId, date, time, location } = req.query;

  const locks = await SeatLock.find({
    movieId,
    date,
    time,
    location,
  });

  const seatIds = locks.map((l) => l.seatId);

  res.json(seatIds);
});

// UNLOCK SEAT (when deselecting)
router.delete("/unlock", verifyToken, async (req: any, res) => {
  const { seatId, movieId, date, time, location } = req.body;

  await SeatLock.deleteOne({
    seatId,
    movieId,
    date,
    time,
    location,
    lockedBy: req.user.userId,
  });

  res.json({ success: true });
});

export default router;
