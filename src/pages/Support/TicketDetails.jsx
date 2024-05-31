import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNotification } from "./../NotificationContext"; // Ensure correct path
import { tickets } from "./constant";

const TicketDetails = () => {
  const [ticket, setTicket] = useState({ ticketId: "", userId: "", issueType: "", description: "", timestamp: "", ticketStatus: "" });
  const { ticketId } = useParams();
  const { showNotification } = useNotification();

  useEffect(() => {
    const foundTicket = tickets.find((t) => t.ticketId === ticketId);
    if (foundTicket) setTicket(foundTicket);
  }, [ticketId]);

  const handleReopen = () => {
    setTicket((prevTicket) => ({ ...prevTicket, ticketStatus: "Open" }));
    showNotification("Status changed from closed to open", "success");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 transition-transform hover:shadow-blue-200">
        <h1 className="text-3xl font-bold mb-4 text-blue-500">Ticket Details</h1>
        <h1 className="text-3xl font-bold mb-4 text-blue-500">{ticket.issueType}</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Ticket ID: {ticket.ticketId}</label>
          <textarea
            id="description"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 border-gray-300"
            style={{ height: "50vh" }}
            value={ticket.description}
            readOnly
          />
        </div>
        {ticket.ticketStatus === "Closed" && (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Issue not resolved?</label>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={handleReopen}>
              Reopen Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDetails;
