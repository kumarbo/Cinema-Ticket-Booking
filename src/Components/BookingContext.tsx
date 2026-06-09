import React, { createContext, useContext, useState } from "react";

export type Booking = {
  movieId: string;
  date: string;
  time: string;
  location: string;
  seats: string[];
  totalPrice: number;
};

interface BookingContextType {
  booking: Booking;
  setBooking: React.Dispatch<React.SetStateAction<Booking>>;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: Booking = {
  movieId: "",
  date: "",
  time: "",
  location: "",
  seats: [],
  totalPrice: 0,
};

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<Booking>(initialState);

  const clearBooking = () => setBooking(initialState);

  return (
    <BookingContext.Provider value={{ booking, setBooking, clearBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside provider");
  return context;
}
