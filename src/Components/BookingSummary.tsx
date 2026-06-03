import { useNavigate } from "react-router-dom";
import { useBooking } from "./BookingContext"; // Import context hook

export default function BookingSummary() {
  const navigate = useNavigate();

  // Extract your values straight out of global air
  const { selectedSeats, totalPrice, clearBooking } = useBooking();

  const handlePayment = () => {
    alert("Payment Processed!");
    clearBooking(); // Reset states to empty safely
    navigate("/");
  };

  return (
    <section className="summary-container">
      <h1>Booking Summary</h1>

      <p>Seats Selected: {selectedSeats.join(", ")}</p>
      <h2>Total Price: ${totalPrice}</h2>

      <div className="actions">
        <button onClick={() => navigate(-1)}>Go Back</button>
        <button onClick={handlePayment}>Confirm & Pay</button>
      </div>
    </section>
  );
}
