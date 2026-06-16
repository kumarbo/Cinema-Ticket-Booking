import { useEffect, useState } from "react";

export default function Admin() {
  const [movies, setMovies] = useState<any[]>([]);

  // ================= MOVIE FORM =================
  const [movieForm, setMovieForm] = useState({
    name: "",
    image: "",
    banner: "",
    description: "",
    releaseDate: "",
    runningTime: "",
    director: "",
    cast: "",
    trailer: "",
  });

  // ================= SHOW FORM =================
  const [showForm, setShowForm] = useState({
    movieId: "",
    date: "",
    location: "",
    times: "",
  });

  // ================= FETCH MOVIES =================
  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/movies");
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.log("Fetch movies error:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // ================= ADD MOVIE =================
  const addMovie = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: movieForm.name,
          image: movieForm.image,
          banner: movieForm.banner,
          description: movieForm.description,
          releaseDate: movieForm.releaseDate,
          runningTime: movieForm.runningTime,
          director: movieForm.director,
          cast: movieForm.cast
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean),
          trailer: movieForm.trailer,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add movie");
        return;
      }

      alert("Movie Added Successfully");

      // refresh dropdown
      fetchMovies();

      // reset form
      setMovieForm({
        name: "",
        image: "",
        banner: "",
        description: "",
        releaseDate: "",
        runningTime: "",
        director: "",
        cast: "",
        trailer: "",
      });
    } catch (err) {
      console.log("Add movie error:", err);
    }
  };

  // ================= ADD SHOW =================
  const addShow = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/shows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId: showForm.movieId,
          date: showForm.date,
          location: showForm.location,
          times: showForm.times
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add show");
        return;
      }

      alert("Show Added Successfully");

      setShowForm({
        movieId: "",
        date: "",
        location: "",
        times: "",
      });
    } catch (err) {
      console.log("Add show error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 Admin Panel</h1>

      {/* ================= MOVIE FORM ================= */}
      <h2>Add Movie</h2>

      <input
        placeholder="Movie Name"
        value={movieForm.name}
        onChange={(e) => setMovieForm({ ...movieForm, name: e.target.value })}
      />

      <input
        placeholder="Image URL"
        value={movieForm.image}
        onChange={(e) => setMovieForm({ ...movieForm, image: e.target.value })}
      />

      <input
        placeholder="Banner URL"
        value={movieForm.banner}
        onChange={(e) => setMovieForm({ ...movieForm, banner: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={movieForm.description}
        onChange={(e) =>
          setMovieForm({ ...movieForm, description: e.target.value })
        }
      />

      <input
        placeholder="Release Date"
        value={movieForm.releaseDate}
        onChange={(e) =>
          setMovieForm({ ...movieForm, releaseDate: e.target.value })
        }
      />

      <input
        placeholder="Running Time"
        value={movieForm.runningTime}
        onChange={(e) =>
          setMovieForm({ ...movieForm, runningTime: e.target.value })
        }
      />

      <input
        placeholder="Director"
        value={movieForm.director}
        onChange={(e) =>
          setMovieForm({ ...movieForm, director: e.target.value })
        }
      />

      <input
        placeholder="Cast (comma separated)"
        value={movieForm.cast}
        onChange={(e) => setMovieForm({ ...movieForm, cast: e.target.value })}
      />

      <input
        placeholder="Trailer URL"
        value={movieForm.trailer}
        onChange={(e) =>
          setMovieForm({ ...movieForm, trailer: e.target.value })
        }
      />

      <button onClick={addMovie}>➕ Add Movie</button>

      <hr />

      {/* ================= SHOW FORM ================= */}
      <h2>Add Show</h2>

      <select
        value={showForm.movieId}
        onChange={(e) => setShowForm({ ...showForm, movieId: e.target.value })}
      >
        <option value="">Select Movie</option>
        {movies.map((m) => (
          <option key={m._id} value={m._id}>
            {m.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={showForm.date}
        onChange={(e) => setShowForm({ ...showForm, date: e.target.value })}
      />

      <input
        placeholder="Location"
        value={showForm.location}
        onChange={(e) => setShowForm({ ...showForm, location: e.target.value })}
      />

      <input
        placeholder="Times (e.g. 10:00,14:00,18:00)"
        value={showForm.times}
        onChange={(e) => setShowForm({ ...showForm, times: e.target.value })}
      />

      <button onClick={addShow}>➕ Add Show</button>
    </div>
  );
}
