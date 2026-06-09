import React, { createContext, useContext, useState } from "react";

export type Booking = {
  seats: string[];
  totalPrice: number;
  date: string;
  time: string;
  location: string;
};

interface BookingContextType {
  booking: Booking;
  setBooking: React.Dispatch<React.SetStateAction<Booking>>;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<Booking>({
    seats: [],
    totalPrice: 0,
    date: "",
    time: "",
    location: "",
  });

  const clearBooking = () => {
    setBooking({
      seats: [],
      totalPrice: 0,
      date: "",
      time: "",
      location: "",
    });
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setBooking,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return context;
}
