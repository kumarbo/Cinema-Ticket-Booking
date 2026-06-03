import { useParams } from "react-router-dom";
import { movies } from "../assets/data/movies";
import { useState } from "react";
import { shows, type Show } from "../assets/data/dates";
import { Link } from "react-router-dom";

export default function Header() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dateValue, setDateValue] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  const { id } = useParams();

  const movie = movies.find((movie) => movie.id === Number(id));

  if (!movie) {
    return <h2>Movie not found</h2>;
  }

  // Generate next 7 days
  const getNext7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date;
    });
  };

  const dates = getNext7Days();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  // Play trailer
  const playTrailer = () => {
    window.open(movie.trailer, "_blank");
  };

  // Find show based on selected date + location
  const checkDate = () => {
    const foundShow = shows.find(
      (show) =>
        show.movieId === movie.id &&
        show.date === dateValue &&
        show.location === location,
    );

    setSelectedShow(foundShow || null);
  };

  return (
    <section className="movie_detail">
      <div className="featured-wallpaper">
        <img src={movie.banner} alt="" className="bannerImg" />
        <img
          src="/src/assets/play-button.png"
          alt="Play Trailer"
          className="playBtn"
          onClick={playTrailer}
        />
      </div>

      <div className="movie-description">
        <div className="thumbnail-pic">
          <img src={movie.image} alt={movie.name} />
        </div>

        <div className="details">
          <h2>{movie.name}</h2>

          <p>{movie.description}</p>

          <ul>
            <li>
              <strong>Release Date: </strong> {movie.releaseDate}
            </li>
            <li>
              <strong>Running Time: </strong> {movie.runningTime}
            </li>
            <li>
              <strong>Director: </strong> {movie.director}
            </li>
            <li>
              <strong>Cast: </strong> {movie.cast}
            </li>
          </ul>
        </div>
      </div>

      <div className="dateLocation">
        {/* DATE SELECTOR */}
        <div className="chooseDate">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setDateValue(date.toISOString().split("T")[0]);
              }}
              className={`dateBtn ${activeIndex === index ? "active" : ""}`}
            >
              {formatDate(date)}
            </button>
          ))}
        </div>

        {/* LOCATION + SEARCH */}
        <div className="location">
          <span>Choose Location:</span>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Choose Location</option>
            <option value="Paramatta Complex">Paramatta Complex</option>
            <option value="Granville Center">Granville Center</option>
            <option value="Penrith Westfield">Penrith Westfield</option>
          </select>

          <button onClick={checkDate}>Search</button>

          {/* SHOW TIMES */}
          <div className="availableTime">
            <div className="place">
              <h5>Screen Time</h5>

              {selectedShow ? (
                selectedShow.times.map((time) => (
                  <Link to="/seats">
                    <button key={time}>{time}</button>
                  </Link>
                ))
              ) : (
                <p>No shows available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
