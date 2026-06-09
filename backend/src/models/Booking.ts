import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    userId: { type: String, required: true },

    movieId: String,
    date: String,
    time: String,
    location: String,

    seats: [String],
    totalPrice: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
