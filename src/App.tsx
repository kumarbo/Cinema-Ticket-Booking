import "./App.css";
import Header from "./Components/Header";
import Featured from "./Components/Featured";
import Footer from "./Components/Footer";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Featured />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
