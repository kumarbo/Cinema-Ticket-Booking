import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  userId: string;
  movieId: string;
  movieName: string;
  date: string;
  time: string;
  location: string;
  seats: string[];
  totalPrice: number;
}

const bookingSchema = new Schema<IBooking>(
  {
    userId: { type: String, required: true },
    movieId: { type: String, required: true },
    movieName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    seats: { type: [String], required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IBooking>("Booking", bookingSchema);
