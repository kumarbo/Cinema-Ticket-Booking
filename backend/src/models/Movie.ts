import mongoose, { Schema, Document } from "mongoose";

export interface IMovie extends Document {
  name: string;
  image: string;
  banner: string;
  description: string;

  releaseDate: string;
  runningTime: string;
  director: string;
  cast: string[];
  trailer: string;
}

const movieSchema = new Schema<IMovie>(
  {
    name: { type: String, required: true },
    image: String,
    banner: String,
    description: String,

    releaseDate: String,
    runningTime: String,
    director: String,
    cast: {
      type: [String],
      default: [],
    },
    trailer: String,
  },
  { timestamps: true },
);

export default mongoose.model<IMovie>("Movie", movieSchema);
