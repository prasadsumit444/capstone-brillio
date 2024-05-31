// TicketDetails.js
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { tickets } from "./constant";

const TicketDetails = () => {
  const [ticket, setTicket] = useState({
    ticketId: "",
    userId: "",
    issueType: "",
    description: "",
    timestamp: "",
    ticketStatus: "",
  });

  // const { ticket } = location.state || {};

  const { ticketId } = useParams();
  useEffect(() => {
    setTicket(tickets.find((t) => t.ticketId === ticketId));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <button
          onClick={() => window.history.back()}
          className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Go Back
        </button>
        <h1 className="text-3xl font-bold mb-4 text-red-600">Ticket Details</h1>
        <h1 className="text-3xl font-bold mb-4 text-red-600">
          {ticket && ticket.issueType}
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="description"
          >
            {ticket && ticket.ticketId}
          </label>
          <textarea
            id="description"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 border-gray-300"
            style={{ height: "50vh" }}
            defaultValue={ticket && ticket.description}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Issue not resolved?
          </label>
          {ticket && ticket.ticketStatus === "Closed" && (
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Reopen Ticket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
