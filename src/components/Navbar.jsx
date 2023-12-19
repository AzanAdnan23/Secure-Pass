import React from "react";
import { Link } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";

const NavBar = () => (
  <nav className="p-6  font-bold font-sans">
    <ul className="flex space-x-4 justify-between items-center">
      <li>
        <Link to="/">Home Page</Link>
      </li>
      <li>
        <Link to="/eventdetails">Event Details</Link>
      </li>
      <li>
        <Link to="/eventmanager">Event Manager Dashboard</Link>
      </li>
      <li>
        <Link to="/ticketspage">Tickets Dashboard</Link>
      </li>
      <li>
        <ConnectWallet />
      </li>
    </ul>
  </nav>
);

export default NavBar;
