import { useState, useEffect } from "react";
import { ethers } from "ethers";

import CreateEvent from "../components/EventComponents/CreateEvent";
import RemoveEvent from "../components/EventComponents/RemoveEvent";
import UpdateEvent from "../components/EventComponents/UpdateEvent";
import PaymentWithdrawal from "../components/EventComponents/PaymentWithdrawal";
import EventDetails from "../components/EventComponents/EventDetails";

import SecurePass from "/src/artifacts/contracts/SecurePass.sol/SecurePass";

const EventManagerPage = () => {
  const [securePassInstance, setSecurePassInstance] = useState(null);
  const [showUpdateEvent, setShowUpdateEvent] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const initContract = async () => {
      try {
        console.log(" event manager page use effect called");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setUserAddress(accounts[0]);
        const signer = provider.getSigner();

        const securePass = new ethers.Contract(
          "0xfcf9d89556ff56D5106E29335245968eB7aC18e4",
          SecurePass.abi,
          signer
        );
        setSecurePassInstance(securePass);
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initContract();
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-8">Event Manager Dashboard</h1>
      <p className="text-center font-semibold mt-2">Seamless Control, Effortless Organization</p>
      <br />

      <EventDetails
        userAddress={userAddress}
        //  securePassInstance={securePassInstance}
      />
      <br />
      <CreateEvent securePassInstance={securePassInstance} />
      <br />
      <RemoveEvent securePassInstance={securePassInstance} />
      <br />
      <h3 className="mx-10 font-bold text-xl "> Edit Event Details </h3>

      <button  className="mx-10 font-semibold my-4 px-2 py-1.5 bg-teal-400 text-white rounded-md hover:bg-teal-600" onClick={() => setShowUpdateEvent(!showUpdateEvent)}>
        Edit Event Details
      </button>
      {showUpdateEvent && (
        <UpdateEvent securePassInstance={securePassInstance} />
      )}
      <br />  
      <PaymentWithdrawal securePassInstance={securePassInstance} />
    </div>
  );
};

export default EventManagerPage;
