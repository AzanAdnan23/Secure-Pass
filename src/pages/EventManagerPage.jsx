import { useState, useEffect } from "react";
import { ethers } from "ethers";
import CreateEvent from "../components/Event-components/createEvent";
import SecurePass from "/src/artifacts/contracts/SecurePass.sol/SecurePass";

const EventManagerPage = () => {
  const [securePassInstance, setSecurePassInstance] = useState(null);
  useEffect(() => {
    const initContract = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const securePass = new ethers.Contract(
          "0x4B27594c93f059EE395205f9197440b281e02107",
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

      <CreateEvent securePassInstance={securePassInstance} />

    </div>
  );
};

export default EventManagerPage;
