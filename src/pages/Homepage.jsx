import React from "react";

const Homepage = () => {
  return (
    <div className="mb-32">
      <h1 className="text-center text-5xl font-extrabold font-sans m-6 pt-64">
        {" "}
        Secure Pass
      </h1>
      <p className="text-center text-2xl font-bold font-sans">
        Experience a New Era in Event Management
      </p>

      <br />
      <p className="text-center font-bold text-2xl mt-36">
        Welcome to SecurePass: Revolutionizing Event Ticketing with Blockchain
        and RFID
      </p>

      <br />
      <div className="font-sans mt-32 px-60">
        <h3 className="text-2xl mt-8 mb-4 font-bold">What is it?</h3>
        <p>
          SecurePass is a cutting-edge blockchain RFID-based ticketing system.
          It redefines how events are organized, ensuring security,
          transparency, and user-friendly ticketing experiences.
        </p>
        <br />

        <h3 className="text-2xl mt-12 mb-4 font-bold">
          Effortless Event Management and Simplified Ticket Purchasing
        </h3>
        <p>
          Streamline your events with a user-friendly dashboard for organizers,
          ensuring smooth organization. Attendees can easily purchase tickets
          directly from our website and enjoy exclusive benefits with RFID
          cards.
        </p>
        <br />

        <h3 className="text-2xl mt-12 mb-4 font-bold">Ensuring Ticket Legitimacy</h3>
        <p>
          SecurePass employs advanced blockchain technology and RFID integration
          to guarantee the legitimacy of every ticket. Our system showcases the
          potential of a secure and efficient ticketing experience
        </p>

        <br />

        <h3 className="text-2xl mt-12 mb-4 font-bold">Join SecurePass Today</h3>
        <p className="mb-48">
          SecurePass is the future of event ticketing. Join us today and
          experience a new era in event management.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
