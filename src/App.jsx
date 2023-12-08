import Homepage from "./pages/homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar />

          <Homepage />
        </Router>
      </div>
    </>
  );
}

export default App;
