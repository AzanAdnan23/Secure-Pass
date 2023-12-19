import { useState } from "react";

function RemoveEvent({ securePassInstance }) {
  const [eventId, setEventId] = useState("");

  const handleRemoveEvent = async () => {
    if (window.confirm("Are you sure you want to remove this event?")) {
      try {
        const tx = await securePassInstance.removeEvent(eventId);
        await tx.wait();

        console.log("Event Removed");
      } catch (error) {
        console.error("An error occurred while removing the event:", error);
      }
    }
  };

  const handleEventIdChange = (e) => {
    setEventId(e.target.value);
  };

  return (
    <div className="px-10">
      <h3 className="font-bold text-xl mb-4">Remove Event</h3>

      <p className="font-bold py-2">Event Id: </p>
      <input
        type="text"
        className="bg-gray-200 border-2 rounded-md px-2 py-1"
        placeholder="Event Id"
        value={eventId}
        onChange={handleEventIdChange}
      />

      <button className="font-semibold my-4 mx-6 px-4 py-1.5 bg-teal-400 text-white rounded-md hover:bg-teal-600" onClick={handleRemoveEvent}>Remove Event</button>
    </div>
  );
}

export default RemoveEvent;
