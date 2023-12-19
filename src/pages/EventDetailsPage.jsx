import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import SecurePass from "../artifacts/contracts/SecurePass.sol/SecurePass.json";

function EventDetails() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const securePass = new ethers.Contract(
          "0xfcf9d89556ff56D5106E29335245968eB7aC18e4",
          SecurePass.abi,
          provider
        );

        const eventDetails = await securePass.getAllEvents();
        console.log(eventDetails);

        // Filter out events with default values
        const filteredEvents = eventDetails.filter(
          (event) => event[0].toString() !== "0" // Adjust the condition as needed
        );

        // Convert bignumber hex values to strings
        const formattedEvents = filteredEvents.map((event) => {
          const formattedDateTime = new Date(parseInt(event[2].toString()) * 1000).toLocaleString();

          return {
            eventId: event[0].toString(),
            eventName: event[1],
            eventDate: formattedDateTime,
            ticketPrice: event[3].toString(),
            ticketCount: event[4].toString(),
            eventOrganizers: event[6],
            isValid: event[7],
          };
        });

        setEvents(formattedEvents);
      } catch (error) {
        console.error(error);
      }
    };

    getEventDetails();
  }, []);

  if (events.length === 0) {
    return (
      <div className="mb-96 ml-10">
        <h1 className="font-bold text-xl">Event Details</h1>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="mb-96 ml-10">
      <h1 className="font-bold mb-8 text-xl">Event Details</h1>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <h2>
              <span className="font-bold">Event Name:</span> {event.eventName}
            </h2>
            <p>
              <span className="font-bold">Event ID:</span> {event.eventId}
            </p>
            <p>
              <span className="font-bold">Event Date:</span> {event.eventDate}
            </p>
            <p>
              <span className="font-bold">Ticket Price:</span> {event.ticketPrice}
            </p>
            <p>
              <span className="font-bold">Tickets Availabe:</span> {event.ticketCount}
            </p>
            <p>
              <span className="font-bold">Event Organizers:</span>{" "}
              {event.eventOrganizers}
            </p>
            <p>
              <span className="font-bold">IsValid:</span>{" "}
              {event.isValid ? "Yes" : "No"}
            </p>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default EventDetails;
