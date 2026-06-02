import { useParams } from "react-router-dom";
import { movies } from "../assets/data/movies";

export default function Header() {
  const { id } = useParams();

  const movie = movies.find((movie) => movie.id === Number(id));

  if (!movie) {
    return <h2>Movie not found</h2>;
  }

  //   play trailer function
  const playTrailer = () => {
    window.open(movie.trailer, "_blank");
  };

  return (
    <section className="movie_detail">
      <div className="featured-wallpaper">
        <img src={movie.banner} alt="" className="bannerImg" />
        <img
          src="/src/assets/play-button.png"
          alt=""
          className="playBtn"
          onClick={playTrailer}
        />
      </div>

      <div className="movie-description">
        <div className="thumbnail-pic">
          <img src={movie.image} alt="" />
        </div>

        <div className="details">
          <h2>{movie.name}</h2>

          <p>{movie.description}</p>
          <ul>
            <li>
              {" "}
              <strong>Release Date: </strong> {movie.releaseDate}
            </li>
            <li>
              <strong>Running Time: </strong>
              {movie.runningTime}
            </li>
            <li>
              <strong>Director: </strong>
              {movie.director}
            </li>
            <li>
              <strong>Cast: </strong>
              {movie.cast}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
