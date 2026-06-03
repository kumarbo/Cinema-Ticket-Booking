import "./App.css";
import Header from "./Components/Header";
import Featured from "./Components/Featured";
import Footer from "./Components/Footer";
import Detail from "./Components/Detail";
import Seats from "./Components/Seats";
import BookingSummary from "./Components/BookingSummary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./Components/BookingContext";

function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Featured />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/seats" element={<Seats />} />
          <Route path="/bookingSummary" element={<BookingSummary />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;
