import React, { createContext, useContext, useState } from "react";

// 1. Define types for our shared data structure
interface BookingContextType {
  selectedSeats: string[];
  totalPrice: number;
  setBookingDetails: (seats: string[], price: number) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  // 2. Initialize state directly from sessionStorage if it exists (fixes refresh loss)
  const [selectedSeats, setSelectedSeats] = useState<string[]>(() => {
    const saved = sessionStorage.getItem("ctx_seats");
    return saved ? JSON.parse(saved) : [];
  });

  const [totalPrice, setTotalPrice] = useState<number>(() => {
    const saved = sessionStorage.getItem("ctx_price");
    return saved ? Number(saved) : 0;
  });

  // 3. Setter function to update both React State and Session Storage at once
  const setBookingDetails = (seats: string[], price: number) => {
    setSelectedSeats(seats);
    setTotalPrice(price);
    sessionStorage.setItem("ctx_seats", JSON.stringify(seats));
    sessionStorage.setItem("ctx_price", price.toString());
  };

  // 4. Utility function to wipe data after payment
  const clearBooking = () => {
    setSelectedSeats([]);
    setTotalPrice(0);
    sessionStorage.removeItem("ctx_seats");
    sessionStorage.removeItem("ctx_price");
  };

  return (
    <BookingContext.Provider
      value={{ selectedSeats, totalPrice, setBookingDetails, clearBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

// 5. Custom hook for easy access and clean code
export function useBooking() {
  const context = useContext(BookingContext);
  if (!context)
    throw new Error("useBooking must be used within a BookingProvider");
  return context;
}
