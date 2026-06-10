import "./App.css";
import Header from "./Components/Header";
import Featured from "./Components/Featured";
import Footer from "./Components/Footer";
import Detail from "./Components/Detail";
import Seats from "./Components/Seats";
import BookingSummary from "./Components/BookingSummary";
import Login from "./Components/Login";
import Registration from "./Components/Registration";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./Components/BookingContext";
import { AuthProvider } from "./Components/AuthContext";

import ProtectedRoute from "./Components/ProtectedRoute";
import MyBookings from "./Components/MyBookings";

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Featured />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/my-bookings" element={<MyBookings />} />

            {/* 🔒 PROTECTED ROUTES */}
            <Route
              path="/detail/:id"
              element={
                <ProtectedRoute>
                  <Detail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/seats/:id"
              element={
                <ProtectedRoute>
                  <Seats />
                </ProtectedRoute>
              }
            />

            <Route
              path="/bookingSummary"
              element={
                <ProtectedRoute>
                  <BookingSummary />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
