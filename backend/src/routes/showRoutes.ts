import express from "express";
import Show from "../models/Show";

const router = express.Router();

/* GET SHOWS */
router.get("/", async (req, res) => {
  const { movieId, date, location } = req.query;

  const query: any = {};
  if (movieId) query.movieId = movieId;
  if (date) query.date = date;
  if (location) query.location = location;

  const shows = await Show.find(query);
  res.json(shows);
});

/* CREATE SHOW (ADMIN) */
router.post("/", async (req, res) => {
  try {
    const show = await Show.create(req.body);
    res.status(201).json(show);
  } catch (err) {
    res.status(500).json({ message: "Failed to create show" });
  }
});

export default router;
