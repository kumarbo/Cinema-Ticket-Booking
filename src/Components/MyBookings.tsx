import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBookings(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>🎟 My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} style={{ border: "1px solid #ccc", margin: 10 }}>
            <p>Movie: {b.movieId}</p>
            <p>Date: {b.date}</p>
            <p>Time: {b.time}</p>
            <p>Location: {b.location}</p>
            <p>Seats: {b.seats.join(", ")}</p>
            <p>Total: ₹{b.totalPrice}</p>
          </div>
        ))
      )}
    </div>
  );
}
