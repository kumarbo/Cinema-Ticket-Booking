import { useNavigate } from "react-router-dom";
import { useBooking } from "../Components/BookingContext";

export default function BookingSummary() {
  const navigate = useNavigate();

  const { booking, clearBooking } = useBooking();

  const handlePayment = () => {
    alert("Payment Processed Successfully!");

    clearBooking();

    navigate("/");
  };

  return (
    <section className="summary-container">
      <h1>Booking Summary</h1>

      <div className="summary-details">
        <p>
          <strong>Date:</strong> {booking.date}
        </p>

        <p>
          <strong>Location:</strong> {booking.location}
        </p>

        <p>
          <strong>Time:</strong> {booking.time}
        </p>

        <p>
          <strong>Seats:</strong>{" "}
          {booking.seats.length > 0
            ? booking.seats.join(", ")
            : "No seats selected"}
        </p>

        <h2>Total Price: ${booking.totalPrice}</h2>
      </div>

      <div className="actions">
        <button onClick={() => navigate(-1)}>Go Back</button>

        <button onClick={handlePayment}>Confirm & Pay</button>
      </div>
    </section>
  );
}
