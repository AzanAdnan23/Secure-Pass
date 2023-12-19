import { useState, useEffect } from "react";
import { ethers } from "ethers";

import SecurePass from "/src/artifacts/contracts/SecurePass.sol/SecurePass";

function UserDetails({ userAddress, isNewUser }) {
  const [securePassProviderInstance, setSecurePassProviderInstance] =
    useState(null);
  const [userId, setUserId] = useState(null);
  const [hasRFIDCard, setHasRFIDCard] = useState(null);
  const [ticketsArray, setTicketsArray] = useState([]);
  const [ticketIds, setTicketIds] = useState([]);
  const [eventIds, setEventIds] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [isValidTickets, setIsValidTickets] = useState([]);

  useEffect(() => {
    const initUserDetails = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const securePass = new ethers.Contract(
          "0xfcf9d89556ff56D5106E29335245968eB7aC18e4",
          SecurePass.abi,
          provider
        );
        setSecurePassProviderInstance(securePass);

        const rawUserDetails = await securePass.getUserDetails(userAddress);

        // Convert BigNumber to string
        const newUserId = rawUserDetails[0].toString();
        const newHasRFIDCard = rawUserDetails[2];
        const newTicketsArray = rawUserDetails[3].map((ticket) =>
          ticket.toString()
        );

        // Update separate state variables
        setUserId(newUserId);
        setHasRFIDCard(newHasRFIDCard);
        setTicketsArray(newTicketsArray);

        console.log("User Details useEffect called");
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initUserDetails();
  }, [userAddress]);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        if (securePassProviderInstance) {
          const ids = [];
          const events = [];
          const buyersList = [];
          const validTicketsList = [];

          // Iterate through ticketsArray and fetch details for each ticket
          for (let i = 0; i < ticketsArray.length; i++) {
            const ticketId = ticketsArray[i];

            const rawTicketDetails =
              await securePassProviderInstance.getTicketDetails(ticketId);

            // Convert BigNumber to string or handle as needed
            ids.push(rawTicketDetails[0].toString());
            events.push(rawTicketDetails[1].toString());
            buyersList.push(rawTicketDetails[2]);
            validTicketsList.push(rawTicketDetails[3]);
          }

          // Update state variables with ticket details
          setTicketIds(ids);
          setEventIds(events);
          setBuyers(buyersList);
          setIsValidTickets(validTicketsList);
        }
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    fetchTicketDetails();
  }, [securePassProviderInstance, ticketsArray]);

  return (
    <div className="mx-10">
      <h1 className="font-bold mb-4 text-xl">User Details</h1>
      {isNewUser ? (
        <p> New User</p>
      ) : (
        <div>
          <p>
            <span className="font-bold">User Address:</span> {userAddress}
          </p>
          <p>
            <span className="font-bold">User ID:</span> {userId}
          </p>
          <p>
            <span className="font-bold">Has RFID Card:</span>{" "}
            {hasRFIDCard ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-bold">Tickets ID:</span>{" "}
            {ticketsArray.join(", ")}
          </p>
        </div>
      )}

      {!isNewUser && (
        <div>
          <h3 className="mt-8 mb-4 font-bold text-xl">Tickets Details</h3>
          <ul>
            {ticketIds.map((ticketId, index) => (
              <li key={index}>
                <p>
                  <span className="font-bold">Ticket ID:</span> {ticketId}
                </p>
                <p>
                  <span className="font-bold">Event ID:</span> {eventIds[index]}
                </p>
                <p>
                  <span className="font-bold">Buyer:</span> {buyers[index]}
                </p>
                <p>
                  <span className="font-bold">Valid:</span>{" "}
                  {isValidTickets[index] ? "Yes" : "No"}
                </p>
                <br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
