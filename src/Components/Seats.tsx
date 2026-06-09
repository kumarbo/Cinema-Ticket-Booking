import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../Components/BookingContext";

const ROWS = 8;
const COLS = 10;

const seatPricing: Record<string, number> = {
  VIP: 60,
  STANDARD: 30,
};

const getSeatType = (row: number) => {
  return row < 2 ? "VIP" : "STANDARD";
};

export default function Seats() {
  const navigate = useNavigate();
  const { id } = useParams();

  const movieId = id || "";

  const { booking, setBooking } = useBooking();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);

  const date = booking.date || "";
  const time = booking.time || "";
  const location = booking.location || "";

  const token = localStorage.getItem("token");

  // =========================
  // FETCH BOOKED + LOCKED SEATS
  // =========================
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        // final booked seats
        const res1 = await fetch(
          `http://localhost:5000/api/bookings/seats?movieId=${movieId}&date=${date}&time=${time}&location=${location}`,
        );
        const booked = await res1.json();

        // locked seats
        const res2 = await fetch(
          `http://localhost:5000/api/seats?movieId=${movieId}&date=${date}&time=${time}&location=${location}`,
        );
        const locked = await res2.json();

        setBookedSeats([...(booked || []), ...(locked || [])]);
      } catch (err) {
        console.log(err);
        setBookedSeats([]);
      }
    };

    if (movieId && date && time && location) {
      fetchSeats();
    }
  }, [movieId, date, time, location]);

  // =========================
  // TOGGLE SEAT (LOCK SYSTEM)
  // =========================
  const toggleSeat = async (seatId: string, isBooked: boolean) => {
    if (isBooked) return;

    const isSelected = selectedSeats.includes(seatId);

    try {
      if (!isSelected) {
        // LOCK SEAT
        const res = await fetch("http://localhost:5000/api/seats/lock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movieId,
            date,
            time,
            location,
            seatId,
          }),
        });

        if (!res.ok) {
          alert("Seat already locked by another user");
          return;
        }
      } else {
        // UNLOCK SEAT
        await fetch("http://localhost:5000/api/seats/unlock", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movieId,
            date,
            time,
            location,
            seatId,
          }),
        });
      }

      setSelectedSeats((prev) =>
        isSelected ? prev.filter((s) => s !== seatId) : [...prev, seatId],
      );
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // TOTAL PRICE
  // =========================
  const totalPrice = selectedSeats.reduce((total, seatId) => {
    const rowIndex = seatId.charCodeAt(0) - 65;
    const type = getSeatType(rowIndex);
    return total + seatPricing[type];
  }, 0);

  // =========================
  // PROCEED BOOKING
  // =========================
  const handleProceed = async () => {
    if (selectedSeats.length === 0) return;

    const updatedBooking = {
      ...booking,
      movieId,
      seats: selectedSeats,
      totalPrice,
    };

    // update context
    setBooking(updatedBooking);

    // navigate instantly
    navigate("/bookingSummary");

    // save booking (final confirm)
    try {
      await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBooking),
      });
    } catch (err) {
      console.log("Booking failed", err);
    }
  };

  return (
    <section className="seats-container">
      <div className="screen">SCREEN</div>

      <div className="seat-map">
        {Array.from({ length: ROWS }).map((_, rowIndex) => {
          const rowLetter = String.fromCharCode(65 + rowIndex);
          const type = getSeatType(rowIndex);

          return (
            <div key={rowLetter} className="seat-row">
              <div>{rowLetter}</div>

              {Array.from({ length: COLS }).map((_, colIndex) => {
                const seatId = `${rowLetter}${colIndex + 1}`;

                const isBooked = bookedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                return (
                  <div
                    key={seatId}
                    className={`seat ${type.toLowerCase()} ${
                      isBooked ? "booked" : ""
                    } ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleSeat(seatId, isBooked)}
                  >
                    {colIndex + 1}
                  </div>
                );
              })}

              <div>{type}</div>
            </div>
          );
        })}
      </div>

      <button disabled={selectedSeats.length === 0} onClick={handleProceed}>
        Proceed ({selectedSeats.length}) - ₹{totalPrice}
      </button>
    </section>
  );
}
