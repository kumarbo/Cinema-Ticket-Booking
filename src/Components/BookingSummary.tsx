import { useBooking } from "../Components/BookingContext";
import { useNavigate } from "react-router-dom";

export default function BookingSummary() {
  const navigate = useNavigate();
  const { booking, clearBooking } = useBooking();

  const handlePayment = () => {
    alert("Payment Successful!");

    clearBooking();
    navigate("/");
  };

  return (
    <section>
      <h1>Booking Summary</h1>

      <p>
        <b>Movie ID:</b> {booking.movieId}
      </p>
      <p>
        <b>Date:</b> {booking.date}
      </p>
      <p>
        <b>Time:</b> {booking.time}
      </p>
      <p>
        <b>Location:</b> {booking.location}
      </p>

      <p>
        <b>Seats:</b> {booking.seats.join(", ")}
      </p>
      <p>
        <b>Total:</b> ${booking.totalPrice}
      </p>

      <button onClick={() => navigate(-1)}>Go Back</button>
      <button onClick={handlePayment}>Confirm & Pay</button>
    </section>
  );
}
