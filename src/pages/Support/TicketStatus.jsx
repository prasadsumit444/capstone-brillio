import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useAuth } from "../Auth/AuthGuard";

const TicketStatus = () => {
  const [activeTab, setActiveTab] = useState("OPEN");
  const [ticketsData, setTicketsData] = useState([]);
  const {userId} = useAuth()

  useEffect(() => {
    // Fetch data when component mounts
    axios.get(`http://localhost:8103/supportticket/ticketstatus/${userId}`)
      .then(response => {
        // Handle success, set tickets data
        setTicketsData(response.data);
      })
      .catch(error => {
        // Handle error
        console.error("Error fetching tickets:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const filteredTickets = ticketsData.filter((ticket) => ticket.ticketStatus === activeTab);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center dark:bg-gray-900">
      <header className="flex justify-between items-center mb-6 w-full max-w-4xl">
        <div className="text-2xl font-bold dark:text-white">Your Tickets</div>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "OPEN"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("OPEN")}
          >
            Open
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "CLOSED"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("CLOSED")}
          >
            Closed
          </button>
        </div>
      </header>
      <div className="w-full max-w-4xl">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              className="bg-white shadow-lg rounded-lg mb-4 p-4 flex justify-between items-center transform transition-transform hover:scale-105 hover:shadow-blue-200 dark:bg-gray-600"
            >
              <div className="flex-grow">
                <div className="text-lg font-semibold dark:text-white">
                  Ticket Number: {ticket.ticketId}
                </div>
                <div className="text-gray-700 dark:text-white
                ">{ticket.issueType}</div>
              </div>
              <div className="text-gray-600 mr-4">{ticket.timeStamp}</div>
              <Link
                to={{
                  pathname: `/tickets/${ticket.ticketId}`,
                }}
              >
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-white">
                  View Ticket
                </button>
              </Link>
            </div>
          ))
        ) : (
          <div className="bg-blue-100 text-gray-800 p-4 rounded-md">
           <h2 className="font-bold">No Tickets Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketStatus;
