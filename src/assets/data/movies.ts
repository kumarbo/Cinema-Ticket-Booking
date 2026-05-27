import harsa from "../harsa.jpg";
import talak from "../talak.jpg";
import laaj from "../laaj.jpg";

export type Movie = {
  id: number;
  name: string;
  image: string;
};

export const movies: Movie[] = [
  { id: 1, name: "Laaj", image: laaj },
  { id: 2, name: "Harsa", image: harsa },
  { id: 3, name: "Talak", image: talak },
];
