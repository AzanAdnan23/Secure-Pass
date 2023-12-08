import React from "react";
import { Link } from "react-router-dom";


const NavBar = ({ onConnect }) => (
  <nav className="bg-black text-white p-6  font-bold font-sans">
    <ul className="flex space-x-4 justify-between items-center">
      <li>
        <Link to="/">
         Home Page
        </Link>
      </li>
      <li>
        <Link to="/">Event Manager Dashboard</Link>
      </li>
      <li>
        <Link to="/">Tickets Dashboard</Link>
      </li>
      <li>

      </li>
    </ul>
  </nav>
);

export default NavBar;
