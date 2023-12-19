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
    <div className="px-10 mt-8 mb-60">
      <h3 className="font-bold text-xl mb-4">Payment Withdrawal</h3>

      <p className="font-bold py-2">Event Id: </p>
      <input
        type="text"
        className="bg-gray-200 border-2 rounded-md px-2 py-1"
        placeholder="Event Id"
        value={eventId}
        onChange={handleEventIdChange}
      />
      <p className="mt-6 font-bold"> Note: you can't withdraw payments until the event is over</p>
      <button className="font-semibold my-2 px-4 py-1.5 bg-teal-400 text-white rounded-md hover:bg-teal-600" onClick={handleWithdrawPayment}> Withdraw Payments</button>
    </div>
  );
}

export default PaymentWithdrawal;
