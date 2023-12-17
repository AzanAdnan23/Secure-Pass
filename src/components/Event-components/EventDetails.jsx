import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import SecurePass from "../../artifacts/contracts/SecurePass.sol/SecurePass.json";

function EventDetails({ userAddress }) {
  const [eventIds, setEventIds] = useState([]);
  const [securePassInstance, setSecurePassInstance] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const initContract = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const securePass = new ethers.Contract(
          "0x550CCfAf6efe1810cC2630Bf452dCA4475789Fe0",
          SecurePass.abi,
          provider
        );
        setSecurePassInstance(securePass);

        const tx = await securePass.getEventIdsOfAUser(userAddress); // returns array of event ids
        setEventIds(tx);
        console.log("event details use effect called");
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initContract();
  }, []); // Empty dependency array ensures it runs once on mount

  useEffect(() => {
    const fetchEventDetails = async () => {
      const eventDetails = await Promise.all(eventIds.map(id => securePassInstance.getEventDetails(id)));
      setEvents(eventDetails);
    };

    if (securePassInstance && eventIds.length > 0) {
      fetchEventDetails();
    }
  }, [securePassInstance, eventIds]);

  return (
    <div>
      <h2>Event Details</h2>
      {events.map((event, index) => (
        <div key={index}>
          <p>Event Id: {event.eventId}</p>
          <p>Event Name: {event.eventName}</p>
          <p>Event Date: {event.eventDate}</p>
          <p>Event Time: {event.eventTime}</p>
          <p>Ticket Price: {event.ticketPrice}</p>
          <p>Ticket Count: {event.ticketCount}</p>
          <p>Tickets Sold: {event.ticketSold}</p>
          <p>Tickets Remaining: {event.ticketsRemaining}</p>
          <p>Event Status: {event.eventStatus}</p>
        </div>
      ))}
    </div>
  );
}

export default EventDetails;
