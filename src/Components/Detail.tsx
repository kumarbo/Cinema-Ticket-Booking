import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useBooking } from "./BookingContext";

type Movie = {
  _id: string;
  name: string;
  image: string;
  banner: string;
  description: string;
  releaseDate: string;
  runningTime: string;
  director: string;
  cast: string[];
  trailer: string;
};

export default function Details() {
  const { id } = useParams();
  const { setBooking } = useBooking();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [dateValue, setDateValue] = useState("");
  const [location, setLocation] = useState("");
  const [selectedShow, setSelectedShow] = useState<any>(null);

  // FETCH MOVIE
  useEffect(() => {
    fetch(`http://localhost:5000/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!movie) return <h2>Loading movie...</h2>;

  // NEXT 7 DAYS
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });

  // TRAILER
  const playTrailer = () => {
    window.open(movie.trailer, "_blank");
  };

  // FETCH SHOWS FROM BACKEND
  const checkDate = async () => {
    const res = await fetch(
      `http://localhost:5000/api/shows?movieId=${movie._id}&date=${dateValue}&location=${location}`,
    );

    const data = await res.json();
    setSelectedShow(data.length ? data[0] : null);
  };

  return (
    <section className="movie_detail">
      {/* BANNER */}
      <div className="featured-wallpaper">
        <img src={movie.banner} className="bannerImg" />
        <img
          src="/src/assets/play-button.png"
          className="playBtn"
          onClick={playTrailer}
        />
      </div>

      {/* MOVIE INFO */}
      <div className="movie-description">
        <div>
          <img src={movie.image} />
        </div>

        <div className="description-div">
          <h2>{movie.name}</h2>

          <p>{movie.description}</p>
          <p>Release Date: {movie.releaseDate}</p>
          <p>Director: {movie.director}</p>
          <p>Cast: {movie.cast?.join(", ")}</p>
        </div>
      </div>

      {/* DATE */}
      <div className="chooseDate">
        {dates.map((date, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              setDateValue(date.toISOString().split("T")[0]);
            }}
            className={activeIndex === i ? "active" : ""}
          >
            {formatDate(date)}
          </button>
        ))}
      </div>

      {/* LOCATION */}
      <select onChange={(e) => setLocation(e.target.value)}>
        <option value="">Choose Location</option>
        <option>Paramatta Complex</option>
        <option>Granville Center</option>
        <option>Penrith Westfield</option>
      </select>

      <button onClick={checkDate}>Search</button>

      {/* SHOW TIMES */}
      <div>
        {selectedShow ? (
          selectedShow.times.map((time: string) => (
            <Link
              key={time}
              to={`/seats/${movie._id}`}
              onClick={() =>
                setBooking((prev: any) => ({
                  ...prev,
                  movieId: movie._id,
                  movieName: movie.name,
                  date: dateValue,
                  location,
                  time,
                }))
              }
            >
              <button>{time}</button>
            </Link>
          ))
        ) : (
          <p>No shows available</p>
        )}
      </div>
    </section>
  );
}
