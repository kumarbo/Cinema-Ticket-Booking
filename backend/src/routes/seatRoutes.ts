import express from "express";
import SeatLock from "../models/SeatLock";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

/* =========================
   CLEAN EXPIRED LOCKS
========================= */
const cleanExpiredLocks = async () => {
  await SeatLock.deleteMany({
    expiresAt: { $lt: new Date() },
  });
};

/* =========================
   LOCK SEAT
========================= */
router.post("/lock", verifyToken, async (req: any, res) => {
  try {
    const { movieId, date, time, location, seatId } = req.body;

    await cleanExpiredLocks();

    const existing = await SeatLock.findOne({
      movieId,
      date,
      time,
      location,
      seatId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Seat already locked",
      });
    }

    const lock = await SeatLock.create({
      movieId,
      date,
      time,
      location,
      seatId,
      lockedBy: req.user.userId,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    });

    return res.json(lock);
  } catch (err) {
    console.log("LOCK ERROR:", err);
    return res.status(500).json({
      message: "Lock failed",
    });
  }
});

/* =========================
   GET LOCKED SEATS
========================= */
router.get("/", async (req, res) => {
  try {
    const { movieId, date, time, location } = req.query;

    await cleanExpiredLocks();

    const locks = await SeatLock.find({
      movieId: String(movieId),
      date: String(date),
      time: String(time),
      location: String(location),
    });

    const seatIds = locks.map((l) => l.seatId);

    return res.json(seatIds);
  } catch (err) {
    console.log("GET LOCKS ERROR:", err);
    return res.status(500).json({
      message: "Failed to fetch locked seats",
    });
  }
});

/* =========================
   UNLOCK SEAT
========================= */
router.delete("/unlock", verifyToken, async (req: any, res) => {
  try {
    const { movieId, date, time, location, seatId } = req.body;

    await SeatLock.deleteOne({
      movieId,
      date,
      time,
      location,
      seatId,
      lockedBy: req.user.userId,
    });

    return res.json({ success: true });
  } catch (err) {
    console.log("UNLOCK ERROR:", err);
    return res.status(500).json({
      message: "Unlock failed",
    });
  }
});

export default router;
