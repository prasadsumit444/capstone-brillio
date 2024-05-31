// TicketStatus.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { tickets } from "./constant";

const TicketStatus = () => {
  const [activeTab, setActiveTab] = useState("Open");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold">Your Tickets</div>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "Open"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("Open")}
          >
            Open
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "Closed"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("Closed")}
          >
            Closed
          </button>
        </div>
      </header>
      <div>
        {tickets
          .filter((ticket) => ticket.ticketStatus === activeTab)
          .map((ticket) => (
            <div
              key={ticket.ticketId}
              className="bg-white shadow-md rounded-lg mb-4 p-4 flex justify-between items-center"
            >
              <div className="flex-grow">
                <div className="text-lg font-semibold">
                  Ticket Number: {ticket.ticketId}
                </div>
                <div className="text-gray-700">{ticket.issueType}</div>
              </div>
              <div className="text-gray-600">{ticket.timestamp}</div>

              <Link
                to={{
                  pathname: `/tickets/${ticket.ticketId}`,
                }}
              >
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-red-600">
                  View Ticket
                </button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TicketStatus;
