import "./App.css";
import Header from "./Components/Header";
import Featured from "./Components/Featured";
import Footer from "./Components/Footer";
import Detail from "./Components/Detail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Featured />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
