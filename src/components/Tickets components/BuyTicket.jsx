import { useState } from "react";
import { ethers } from "ethers";

import SecurePass from "/src/artifacts/contracts/SecurePass.sol/SecurePass";

function BuyTicket({ securePassSignerInstance, isNewUser }) {
  const [eventId, setEventId] = useState("");

  const handleBuyTicket = async () => {
    try {
      const ticketPrice = await calculateTicketPrice(eventId);
      console.log("Ticket Price Calculated", ticketPrice);

      const convertedPrice = ethers.utils.parseEther(ticketPrice);
      console.log("Ticket Price Converted", convertedPrice);

      const tx = await securePassSignerInstance.buyTicket(eventId, {
        value: convertedPrice
      });
      await tx.wait();

      console.log("Ticket Bought");
    } catch (error) {
      console.error("An error occurred while buying the ticket:", error);
    }
  };

  async function calculateTicketPrice(eventId) {
    try {
      let addOns = 0;
      console.log("isNewUser", isNewUser);
      if (isNewUser === true) {
        addOns = 10;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const securePass = new ethers.Contract(
        "0xaD2270735faF82484621fBd528Bf2445106CA445",
        SecurePass.abi,
        provider
      );
      const eventDetails = await securePass.getEventDetails(eventId);

      // Convert both values to numbers and then add
      let ticketPrice = (Number(eventDetails.ticketPrice) + addOns).toString();

      return ticketPrice;
    } catch (error) {
      console.error(
        "An error occurred while calculating the ticket price:",
        error
      );
      return "0";
    }
  }

  const handleEventIdChange = (e) => {
    setEventId(e.target.value);
  };

  return (
    <div className="mt-10 ml-10">
      <h3 className="font-bold text-xl mb-4"> Buy Ticket:</h3>

      <p className="font-bold py-2"> Event Id: </p>
      <input
        type="text"
        className=" bg-gray-200 border-2 rounded-md px-2 py-1"
        placeholder="Event Id"
        value={eventId}
        onChange={handleEventIdChange}
      />
      <button
        className="mx-2 font-semibold my-4 px-2 py-1.5 bg-teal-400 text-white rounded-md hover:bg-teal-600"
        onClick={handleBuyTicket}
      >
        Buy Ticket
      </button>
    </div>
  );
}

export default BuyTicket;
