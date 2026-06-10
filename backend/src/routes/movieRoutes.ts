import express from "express";
import Movie from "../models/Movie";

const router = express.Router();

/* GET ALL MOVIES */
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

/* GET SINGLE MOVIE */
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

router.post("/", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: "Failed to create movie" });
  }
});

export default router;
