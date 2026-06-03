export type Show = {
  movieId: number;
  date: string;
  location: string;
  times: string[];
};

export const shows: Show[] = [
  {
    movieId: 1,
    date: "2026-06-03",
    location: "Paramatta Complex",
    times: ["11:00 AM", "2:00 PM", "6:00 PM"],
  },
  {
    movieId: 1,
    date: "2026-06-03",
    location: "Granville Center",
    times: ["12:00 PM", "4:00 PM", "8:00 PM"],
  },
  {
    movieId: 1,
    date: "2026-06-04",
    location: "Penrith Westfield",
    times: ["10:00 AM", "1:00 PM", "7:00 PM"],
  },
  {
    movieId: 2,
    date: "2026-06-04",
    location: "Granville Center",
    times: ["11:30 AM", "3:30 PM", "7:30 PM"],
  },
  {
    movieId: 2,
    date: "2026-06-05",
    location: "Penrith Westfield",
    times: ["12:00 PM", "5:00 PM"],
  },
  {
    movieId: 3,
    date: "2026-06-05",
    location: "Penrith Westfield",
    times: ["11:00 AM", "2:30 PM", "6:30 PM"],
  },
];
