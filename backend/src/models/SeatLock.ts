import mongoose, { Schema } from "mongoose";

const seatLockSchema = new Schema(
  {
    movieId: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    seatId: { type: String, required: true },

    lockedBy: { type: String, required: true },

    // expires automatically after 5 min
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

/**
 * 🧠 TTL INDEX
 * MongoDB automatically deletes documents when expiresAt < now
 */
seatLockSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("SeatLock", seatLockSchema);
