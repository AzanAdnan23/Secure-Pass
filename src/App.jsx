import Homepage from "./pages/homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EventManagerPage from "./pages/EventManagerPage";
import TicketsPage from "./pages/Ticketspage";

function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/eventmanager" element={<EventManagerPage />} />
            <Route path="/ticketspage" element={<TicketsPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
