import { useState, useEffect } from "react";
import { ethers } from "ethers";
import BuyTicket from "../components/Tickets components/BuyTicket";

import SecurePass from "/src/artifacts/contracts/SecurePass.sol/SecurePass";
import UserDetails from "../components/Tickets components/UserDetails";

const TicketsPage = () => {
  const [securePassSignerInstance, setSecurePassSignerInstance] =
    useState(null);
  const [securePassProviderInstance, setSecurePassProviderInstance] =
    useState(null);

  const [userAddress, setUserAddress] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const initSignerContract = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);

        setUserAddress(accounts[0]);

        const signer = provider.getSigner();

        const securePass = new ethers.Contract(
          "0x0d85e584217b9e11c1006d984D5895B3E6185EEf",
          SecurePass.abi,
          signer
        );
        if (securePass && typeof securePass.buyTicket === "function") {
          setSecurePassSignerInstance(securePass);
        } else {
          console.log("securePass.buyTicket is not a function");
        }

        console.log(" Tickets page signer use effect called");
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };
    initSignerContract();
  }, []); // Empty dependency array ensures it runs once on mount

  useEffect(() => {
    const initProviderContract = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const securePass = new ethers.Contract(
          "0x0d85e584217b9e11c1006d984D5895B3E6185EEf",
          SecurePass.abi,
          provider
        );

        setSecurePassProviderInstance(securePass);
        console.log(" Tickets page provider use effect called");
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };
    initProviderContract();
  }, []); // Empty dependency array ensures it runs once on mount

  useEffect(() => {
    if (securePassProviderInstance && userAddress) {
      isUserNew();
    }
  }, [securePassProviderInstance, userAddress]);

  async function isUserNew() {
    try {
      const user = await securePassProviderInstance.isNewuser(userAddress);
      console.log("Is New User:", user);
      setIsNewUser(user);
    } catch (error) {
      console.error("Error in isNewUser:", error);
    }
  }

  return (
    <div className="mb-60">
      <h1 className="text-center font-bold text-2xl mt-8">Tickets Page</h1>
      <p className="text-center font-semibold mt-2">
        Your Gateway to Event Exploration and Ticket Management
      </p>
      {securePassProviderInstance && userAddress && (
        <UserDetails userAddress={userAddress} isNewUser={isNewUser} />
      )}
      <BuyTicket
        securePassSignerInstance={securePassSignerInstance}
        isNewUser={isNewUser}
      />
    </div>
  );
};

export default TicketsPage;
