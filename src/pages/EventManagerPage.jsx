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
      <h1>EventManager</h1>
      <p>event page</p>

      <EventDetails
        userAddress={userAddress}
        securePassInstance={securePassInstance}
      />
      <CreateEvent securePassInstance={securePassInstance} />
      <RemoveEvent securePassInstance={securePassInstance} />
      <br />
      <button onClick={() => setShowUpdateEvent(!showUpdateEvent)}>
        Edit Event Details
      </button>
      {showUpdateEvent && (
        <UpdateEvent securePassInstance={securePassInstance} />
      )}
      <PaymentWithdrawal securePassInstance={securePassInstance} />
    </div>
  );
};

export default EventManagerPage;
