import React, { useState } from "react";

function CreateEvent({ securePassInstance }) {
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
    <div className="px-10">
      <h3 className="font-bold text-xl mb-4">Create New Event:</h3>

      <p className="font-bold py-2">Event Name: </p>
      <input
        type="text"
        className=" bg-gray-200 border-2 rounded-md px-2 py-1"
        placeholder="Event Name"
        value={eventName}
        onChange={handleEventNameChange}
      />

      <p className="font-bold py-2"> Event Date </p>
      <input
        type="date"
        className=" bg-gray-200 border-2 rounded-md px-2 py-1"
        placeholder="Event Date"
        value={eventDate}
        onChange={handleEventDateChange}
      />

      <p className="font-bold py-2">Event Time:</p>
      <input
        type="time"
        className=" bg-gray-200 border-2 rounded-md px-2 py-1"
        value={eventTime}
        onChange={handleEventTimeChange}
      />

      <p className="font-bold py-2">Event Ticket Price:</p>
      <input
        type="number"
        className=" bg-gray-200 border-2 rounded-md px-2 py-1 "
        placeholder="Event Ticket Price"
        value={eventTicketPrice}
        onChange={handleEventTicketPriceChange}
      />

      <p className="font-bold py-2">Event Ticket Count:</p>
      <input
        type="number"
        className=" bg-gray-200 border-2 rounded-md px-2 py-1 "
        placeholder="Event Ticket Count"
        value={eventTicketCount}
        onChange={handleEventTicketCountChange}
      />
      <div></div>
      <button
        className="font-semibold my-4 px-4 py-1.5 bg-teal-400 text-white rounded-md hover:bg-teal-600"
        onClick={handleCreateEvent}
      >
        Create Event
      </button>
    </div>
  );
}

export default CreateEvent;
