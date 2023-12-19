import { useState, useEffect } from "react";
import { ethers } from "ethers";

import CreateEvent from "../components/Event-components/createEvent";
import RemoveEvent from "../components/Event-components/RemoveEvent";
import UpdateEvent from "../components/Event-components/UpdateEvent";
import PaymentWithdrawal from "../components/Event-components/PaymentWithdrawal";
import EventDetails from "../components/Event-components/EventDetails";

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
          "0x550CCfAf6efe1810cC2630Bf452dCA4475789Fe0",
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

      <button  className="mx-10 font-semibold my-4 px-2 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-600" onClick={() => setShowUpdateEvent(!showUpdateEvent)}>
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
