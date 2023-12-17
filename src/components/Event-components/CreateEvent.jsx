import React, { useState } from "react";

function CreateEvent  ({ securePassInstance }) {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventTicketPrice, setEventTicketPrice] = useState("");
  const [eventTicketCount, setEventTicketCount] = useState("");

  const handleCreateEvent = async () => {
    try {
      // Convert date and time to timestamp
      const eventDateTime = new Date(`${eventDate}T${eventTime}`);
      const eventTimestamp = Math.floor(eventDateTime.getTime() / 1000);

      const tx = await securePassInstance.createEvent(
        eventName,
        eventTimestamp,
        eventTicketPrice,
        eventTicketCount
      );
      await tx.wait();
      console.log("Event Created");
    } catch (error) {
      console.error("An error occurred while creating the event:", error);
    }
  };

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleEventDateChange = (e) => {
    setEventDate(e.target.value);
  };

  const handleEventTimeChange = (e) => {
    setEventTime(e.target.value);
  };

  const handleEventTicketPriceChange = (e) => {
    setEventTicketPrice(e.target.value);
  };

  const handleEventTicketCountChange = (e) => {
    setEventTicketCount(e.target.value);
  };

  return (
    <div>
      <h3>Create Event</h3>

      <p>Event Name: </p>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={handleEventNameChange}
      />

      <p> Event Date </p>
      <input
        type="date"
        placeholder="Event Date"
        value={eventDate}
        onChange={handleEventDateChange}
      />

      <p>Event Time:</p>
      <input
        type="time"
        placeholder="05:00 PM" // fix this
        value={eventTime}
        onChange={handleEventTimeChange}
      />

      <p>Event Ticket Price:</p>
      <input
        type="number"
        placeholder="Event Ticket Price"
        value={eventTicketPrice}
        onChange={handleEventTicketPriceChange}
      />

      <p>Event Ticket Count:</p>
      <input
        type="number"
        placeholder="Event Ticket Count"
        value={eventTicketCount}
        onChange={handleEventTicketCountChange}
      />

      <button onClick={handleCreateEvent}>Create Event</button>
    </div>
  );
};

export default CreateEvent;
