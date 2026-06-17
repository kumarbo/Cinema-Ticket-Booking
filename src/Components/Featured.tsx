import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Movie = {
  _id: string;
  name: string;
  image: string;
};

export default function Featured() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://cinema-ticket-booking-1.onrender.com/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="featured">
        <h3>Featured Movies</h3>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Loading movies...</p>
          <p>
            Starting backend server (may take up to 1 minute on free hosting).
          </p>
        </div>
      </section>
    );
  }

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
