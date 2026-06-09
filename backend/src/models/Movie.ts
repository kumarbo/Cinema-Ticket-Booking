import mongoose, { Schema, Document } from "mongoose";

export interface IMovie extends Document {
  name: string;
  image: string;
  banner: string;
  description: string;
  duration: string;
}

const movieSchema = new Schema<IMovie>(
  {
    name: String,
    image: String,
    banner: String,
    description: String,
    duration: String,
  },
  { timestamps: true },
);

export default mongoose.model<IMovie>("Movie", movieSchema);
