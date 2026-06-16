import harsa from "../harsa.jpg";
import talak from "../talak.jpg";
import laaj from "../laaj.jpg";
import harsaBanner from "../harsha-banner.webp";
import talakBanner from "../talak-banner.jpg";
import laajBanner from "../laaj-banner.jpg";

export type Movie = {
  id: number;
  name: string;
  image: string;
  description: string;
  banner: string;
  releaseDate: string;
  runningTime: string;
  director: string;
  cast: string;
  trailer: string;
};

export const movies: Movie[] = [
  {
    id: 1,
    name: "Laaj",
    image: laaj,
    description: "Watch Laaj",
    banner: laajBanner,
    releaseDate: "3/06/2026",
    runningTime: "95 mins",
    director: "Kumar Kattel",
    cast: "Balram , Dhurmus Kattel, Sitaram Bhandari",
    trailer: "https://www.youtube.com/watch?v=48-rWlGPeVc",
  },
  {
    id: 2,
    name: "Harsa",
    image: harsa,
    description: "Watch Harsa",
    banner: harsaBanner,
    releaseDate: "12/06/2026",
    runningTime: "90 mins",
    director: "Ekta Poudel",
    cast: "Khagendra Lamichhane and Barsha Raut",
    trailer: "https://www.youtube.com/watch?v=5caz5CU7Fs0",
  },
  {
    id: 3,
    name: "Talak",
    image: talak,
    description: "Watch Talak",
    banner: talakBanner,
    releaseDate: "16/06/2026",
    runningTime: "85 mins",
    director: "Nischal Basnet",
    cast: "Khagendra Lamichhane,Dayahang Rai,Shushank Mainali",
    trailer: "https://www.youtube.com/watch?v=EweSy8ND6Us",
  },
];
