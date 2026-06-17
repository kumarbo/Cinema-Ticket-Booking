import { useEffect, useState } from "react";

type Booking = {
  _id: string;
  movieId: string;
  movieName: string;
  date: string;
  time: string;
  location: string;
  seats: string[];
  totalPrice: number;
  createdAt: string;
};

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          "https://cinema-ticket-booking-1.onrender.com/api/movies/api/bookings/my",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
        setBookings(data || []);
      } catch (err) {
        console.log("Failed to load bookings", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading bookings...</h2>;
  }

  if (!bookings.length) {
    return <h2 style={{ textAlign: "center" }}>No bookings found 🎟️</h2>;
  }

  return (
    <section style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>🎟️ My Bookings</h1>

      <div style={{ display: "grid", gap: "15px" }}>
        {bookings.map((b) => (
          <div
            key={b._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              background: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>{b.movieName}</h2>

            <p>
              <strong>Date:</strong> {b.date}
            </p>
            <p>
              <strong>Time:</strong> {b.time}
            </p>
            <p>
              <strong>Location:</strong> {b.location}
            </p>

            <p>
              <strong>Seats:</strong>{" "}
              {b.seats.map((s) => (
                <span
                  key={s}
                  style={{
                    display: "inline-block",
                    padding: "3px 8px",
                    margin: "2px",
                    background: "#eee",
                    borderRadius: "5px",
                  }}
                >
                  {s}
                </span>
              ))}
            </p>

            <p>
              <strong>Total Price:</strong> AUD{b.totalPrice}
            </p>

            <p style={{ fontSize: "12px", color: "gray" }}>
              Booking ID: {b._id}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
