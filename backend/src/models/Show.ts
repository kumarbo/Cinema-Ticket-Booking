import mongoose, { Schema, Document } from "mongoose";

export interface IShow extends Document {
  movieId: string;
  date: string;
  location: string;
  times: string[];
}

const showSchema = new Schema<IShow>(
  {
    movieId: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    times: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export default mongoose.model<IShow>("Show", showSchema);
