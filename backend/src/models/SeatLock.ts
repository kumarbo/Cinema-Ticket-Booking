import mongoose from "mongoose";

const seatLockSchema = new mongoose.Schema(
  {
    movieId: String,
    date: String,
    time: String,
    location: String,
    seatId: String,

    lockedBy: String, // userId
    expiresAt: Date,
  },
  { timestamps: true },
);

seatLockSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("SeatLock", seatLockSchema);
