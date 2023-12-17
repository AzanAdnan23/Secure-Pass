import express from 'express';
import { ethers } from 'ethers';
import SecurePass from '../src/artifacts/contracts/SecurePass.sol/SecurePass.json' assert { type: 'json' };

const app = express();
const port = 3000;

// Set up Ethereum provider (use the provider you used in the frontend)
const provider = new ethers.providers.JsonRpcProvider('https://rpc-evm-sidechain.xrpl.org');

const securePass = new ethers.Contract(
  "0x550CCfAf6efe1810cC2630Bf452dCA4475789Fe0",
  SecurePass.abi,
  provider
);

// Define a route for handling requests
app.get('/checkTicket', async (req, res) => {
  try {
    // Get event_id and ticket_id from the query parameters
    const { event_id, ticket_id } = req.query;

    // Call the smart contract function
    const isTicketValid = await securePass.isTicketValid(event_id, ticket_id);

    // Send the result back to the client
    res.json({ isTicketValid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
