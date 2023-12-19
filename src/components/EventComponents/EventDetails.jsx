import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import SecurePass from "../../artifacts/contracts/SecurePass.sol/SecurePass";

function EventDetails({ userAddress }) {
  const [eventIds, setEventIds] = useState([]);
  const [securePassInstance, setSecurePassInstance] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const initContract = async () => {
      if (userAddress) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);

          const securePass = new ethers.Contract(
            "0xfcf9d89556ff56D5106E29335245968eB7aC18e4",
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
      }
    };

    initContract();
  }, [userAddress]); // Empty dependency array ensures it runs once on mount

  useEffect(() => {
    const fetchEventDetails = async () => {
      const eventDetails = await Promise.all(
        eventIds.map((id) => securePassInstance.getEventDetails(id))
      );
      setEvents(eventDetails);
    };

    if (securePassInstance && eventIds.length > 0) {
      fetchEventDetails();
    }
  }, [securePassInstance, eventIds]);

  return (
    <div className="p-10">
  <h2 className="font-bold text-xl">Event Details:</h2>
  {events.map(
    (event, index) =>
      event && (
        <div key={index}>
          <br />
          <p>
            <span className="font-bold">Event Id:</span> {event.eventId && event.eventId.toString()}
          </p>
          <p>
            <span className="font-bold">Event Name:</span> {event.eventName}
          </p>
          <p>
            <span className="font-bold">Event Date:</span>{" "}
            {event.eventDate && formatTimestamp(event.eventDate)}
          </p>
          <p>
            <span className="font-bold">Ticket Price:</span>{" "}
            {event.ticketPrice && event.ticketPrice.toString()}
          </p>
          <p>
            <span className="font-bold">Ticket Count:</span>{" "}
            {event.ticketCount && event.ticketCount.toString()}
          </p>
          <p>
            <span className="font-bold">Tickets Sold:</span>{" "}
            {event.ticketSold && event.ticketSold.toString()}
          </p>
        </div>
      )
  )}
</div>

  );
}
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert to milliseconds
  return date.toLocaleString(); // Adjust the format as needed
};
export default EventDetails;
