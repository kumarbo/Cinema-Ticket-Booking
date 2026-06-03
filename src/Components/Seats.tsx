import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useBooking } from "../Components/BookingContext";

// seat layout config
const ROWS = 8;
const COLS = 10;

// simulate booked seats from backend
const bookedSeats = ["A1", "A2", "B5", "C7", "F3"];

// pricing rules
const seatPricing = {
  STANDARD: 30,
  VIP: 60,
};

const getSeatType = (row: number) => {
  if (row < 2) return "VIP"; // front rows VIP
  if (row < 6) return "STANDARD"; // middle standard
  return "STANDARD";
};

export default function Seats() {
  const navigate = useNavigate();
  //   const { setBookingDetails } = useBooking();

  const { selectedSeats: savedSeats, setBookingDetails } = useBooking();
  const [selectedSeats, setSelectedSeats] = useState<string[]>(savedSeats);

  const toggleSeat = (seatId: string, isBooked: boolean) => {
    if (isBooked) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId],
    );
  };

  const totalPrice = selectedSeats.reduce((total, seatId) => {
    const rowLetter = seatId.charAt(0);
    const rowIndex = rowLetter.charCodeAt(0) - 65;
    const type = getSeatType(rowIndex);
    return total + seatPricing[type];
  }, 0);

  const handleProceed = () => {
    if (selectedSeats.length === 0) return;

    // Save directly to the shared global store
    setBookingDetails(selectedSeats, totalPrice);

    // Navigate cleanly
    navigate("/bookingSummary");
  };

  return (
    <section className="seats-container">
      {/* SCREEN */}
      <div className="screen">SCREEN</div>

      {/* SEAT MAP */}
      <div className="seat-map">
        {Array.from({ length: ROWS }).map((_, rowIndex) => {
          const rowLetter = String.fromCharCode(65 + rowIndex);
          const seatType = getSeatType(rowIndex);

          return (
            <div className="seat-row" key={rowLetter}>
              <div className="row-label">{rowLetter}</div>

              {Array.from({ length: COLS }).map((_, colIndex) => {
                const seatId = `${rowLetter}${colIndex + 1}`;
                const isBooked = bookedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                return (
                  <div
                    key={seatId}
                    className={`
                      seat 
                      ${seatType.toLowerCase()} 
                      ${isBooked ? "booked" : ""} 
                      ${isSelected ? "selected" : ""}
                    `}
                    onClick={() => toggleSeat(seatId, isBooked)}
                  >
                    {colIndex + 1}
                  </div>
                );
              })}

              <div className="row-type">{seatType}</div>
            </div>
          );
        })}
      </div>

      <div className="seat-legend">
        <div className="legend-item">
          <span className="box available"></span>
          <p>Available </p>
        </div>

        <div className="legend-item">
          <span className="box booked"></span>
          <p>Booked</p>
        </div>

        <div className="legend-item">
          <span className="box vip"></span>
          <p>VIP </p>
        </div>

        <div className="legend-item">
          <span className="box ys"></span>
          <p>Your Seats </p>
        </div>
      </div>

      <div className="proceed">
        <button onClick={handleProceed} disabled={selectedSeats.length === 0}>
          Proceed
        </button>
      </div>
    </section>
  );
}
