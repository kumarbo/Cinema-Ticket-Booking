import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Movie = {
  _id: string;
  name: string;
  image: string;
};

export default function Featured() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("https://cinema-ticket-booking-1.onrender.com/api/movies/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="featured">
      <h3>Featured Movies</h3>

      <div className="movies">
        {movies.map((movie) => (
          <div className="movie" key={movie._id}>
            <Link to={`/detail/${movie._id}`}>
              <img src={movie.image} alt={movie.name} />
              <h4>{movie.name}</h4>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
