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
    <div className="px-10">
      <p className="font-bold"> Enter Event Id to change Any of the Following.</p>
      <p className="font-bold py-2"> Event Id: </p>
      <input
        type="text"
        className=" bg-gray-200 border-2 rounded-md px-2 py-1"
        placeholder="Event Id"
        value={eventName} // fix this
        onChange={handleEventNameChange} //fix this
      />

      <p className="font-bold py-2"> Event Name: </p>
      <input
        type="text"
        className=" bg-gray-200 border-2 rounded-md px-2 py-1"
        placeholder="Event Name"
        value={eventName}
        onChange={handleEventNameChange}
      />
      <button  className="ml-12 font-semibold px-4 py-1.5 bg-teal-400 text-white rounded-md hover:bg-teal-600" onClick={handleUpdateEventName}>Update Event Name</button>
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
        placeholder="Event Time"
        value={eventTime}
        onChange={handleEventTimeChange}
      />
      <button  className="ml-28 font-semibold px-4 py-1.5 bg-teal-400 text-white rounded-md hover:bg-teal-600" onClick={handleUpdateEventDate}>Update Event Date & Time</button>

      <p className="font-bold py-2">Event Ticket Price:</p>
      <input
        type="number"
        className=" bg-gray-200 border-2 rounded-md px-2 py-1"
        placeholder="Event Ticket Price"
        value={eventTicketPrice}
        onChange={handleEventTicketPriceChange}
      />
      <button  className="ml-10 font-semibold px-4 py-1.5 bg-teal-400 text-white rounded-md hover:bg-teal-600" onClick={handleUpdateEventTicketPrice}>
        Update Event Ticket Price
      </button>

      <p className="font-bold py-2">Event Ticket Count:</p>
      <input
        type="number"
        className=" bg-gray-200 border-2 rounded-md px-2 py-1"
        placeholder="Event Ticket Count"
        value={eventTicketCount}
        onChange={handleEventTicketCountChange}
      />
      <button  className="ml-10 font-semibold px-4 py-1.5 bg-teal-400 text-white rounded-md hover:bg-teal-600" onClick={handleUpdateEventTicketCount}>
        Update Event Ticket Count
      </button>
    </div>
  );
}

export default UpdateEvent;
