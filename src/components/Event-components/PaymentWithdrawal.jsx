import { useState } from "react";

function PaymentWithdrawal({ securePassInstance }) {
  const [eventId, setEventId] = useState("");

  const handleWithdrawPayment = async () => {
    try {
      const tx = await securePassInstance.withdrawPayment(eventId);
      await tx.wait();

      console.log("Payment Withdrawn");
    } catch (error) {
      console.error("An error occurred while withdrawing the payment:", error);
    }
  };

  const handleEventIdChange = (e) => {
    setEventId(e.target.value);
  };

  return (
    <div>
      <h3>Payment Withdrawal</h3>

      <p>Event Id: </p>
      <input
        type="text"
        placeholder="Event Id"
        value={eventId}
        onChange={handleEventIdChange}
      />
      <p> Note: you can't withdraw payments until the event is over</p>
      <button onClick={handleWithdrawPayment}> Withdraw Payments</button>
    </div>
  );
}

export default PaymentWithdrawal;
