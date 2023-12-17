import { useState } from "react";

function UpdateEvent({ securePassInstance }) {    // fix update function also need to send event id
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventTicketPrice, setEventTicketPrice] = useState("");
  const [eventTicketCount, setEventTicketCount] = useState("");

  const handleUpdateEventName = async () => {
    try {
      const tx = await securePassInstance.updateEventName(eventName);
      await tx.wait();

      console.log("Event Name Updated");
    } catch (error) {
      console.error("An error occurred while updating the event name:", error);
    }
  };

  const handleUpdateEventDate = async () => {
    try {
      const eventDateTime = new Date(`${eventDate}T${eventTime}`);
      const eventTimestamp = Math.floor(eventDateTime.getTime() / 1000);

      const tx = await securePassInstance.updateEventDate(eventTimestamp);
      await tx.wait();

      console.log("Event Date Updated");
    } catch (error) {
      console.error("An error occurred while updating the event date:", error);
    }
  };

  const handleUpdateEventTicketPrice = async () => {
    try {
      const tx = await securePassInstance.updateTicketPrice(eventTicketPrice);
      await tx.wait();

      console.log("Event Ticket Price Updated");
    } catch (error) {
      console.error(
        "An error occurred while updating the event ticket price:",
        error
      );
    }
  };

  const handleUpdateEventTicketCount = async () => {
    try {
      const tx = await securePassInstance.updateTicketCount(eventTicketCount);
      await tx.wait();

      console.log("Event Ticket Count Updated");
    } catch (error) {
      console.error(
        "An error occurred while updating the event ticket count:",
        error
      );
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
      <h3> Edit Event Details </h3>

      <p> Event Name: </p>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={handleEventNameChange}
      />
      <button onClick={handleUpdateEventName}>Update Event Name</button>

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
        placeholder="Event Time"
        value={eventTime}
        onChange={handleEventTimeChange}
      />
      <button onClick={handleUpdateEventDate}>Update Event Date & Time</button>

      <p>Event Ticket Price:</p>
      <input
        type="number"
        placeholder="Event Ticket Price"
        value={eventTicketPrice}
        onChange={handleEventTicketPriceChange}
      />
      <button onClick={handleUpdateEventTicketPrice}>
        Update Event Ticket Price
      </button>

      <p>Event Ticket Count:</p>
      <input
        type="number"
        placeholder="Event Ticket Count"
        value={eventTicketCount}
        onChange={handleEventTicketCountChange}
      />
      <button onClick={handleUpdateEventTicketCount}>
        Update Event Ticket Count
      </button>
    </div>
  );
}

export default UpdateEvent;
