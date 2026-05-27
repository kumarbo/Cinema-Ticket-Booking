import { Link } from "react-router-dom";
import { movies } from "../assets/data/movies";

export default function Featured() {
  return (
    <section className="featured">
      <h3>Featured Movies</h3>

      <div className="movies">
        {movies.map((movie) => (
          <div className="movie" key={movie.id}>
            <Link to="/">
              <img src={movie.image} alt={movie.name} />
              <h4>{movie.name}</h4>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
