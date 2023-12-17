import { useState } from "react";

function RemoveEvent  ({ securePassInstance }) {
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
    <div>
      <h3>Remove Event</h3>

      <p>Event Id: </p>
      <input
        type="text"
        placeholder="Event Id"
        value={eventId}
        onChange={handleEventIdChange}
      />

      <button onClick={handleRemoveEvent}>Remove Event</button>
    </div>
  );
};

export default RemoveEvent;
