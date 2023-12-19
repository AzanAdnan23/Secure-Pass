import React, { useEffect } from "react";
import { ethers } from "ethers";
import SecurePass from "../artifacts/contracts/SecurePass.sol/SecurePass.json";

function EventDetails() {
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
      } catch (error) {
        console.log(error);
      }
    };

    getEventDetails();
  }, []);

  return (
    <div className="mb-96 ml-10">
      <h1 className="font-bold text-xl">Event Details</h1>
    </div>
  );
}

export default EventDetails;
