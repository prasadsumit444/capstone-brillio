//naya
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNotification } from "./../NotificationContext";

const TicketDetails = () => {
  const [ticket, setTicket] = useState({
    ticketId: "",
    userId: "",
    issueType: "",
    description: "",
    timestamp: "",
    ticketStatus: ""
  });
  const { ticketId } = useParams();
  const { showNotification } = useNotification();

  useEffect(() => {
    axios.get(`http://localhost:8103/supportticket/ticket/${ticketId}`)
      .then(response => {
        console.log("Ticket details response:", response.data);
        setTicket(response.data);
      })
      .catch(error => {
        console.error("Error fetching ticket details:", error);
      });
  }, [ticketId]);

  const handleReopen = () => {
    if (!ticket.description.trim()) {
      showNotification("Description cannot be empty", "error");
      return;
    }

    axios.patch(`http://localhost:8103/supportticket/ticket/${ticketId}`, {
      description: ticket.description, // Include description in the patch request
      ticketStatus: "OPEN"
    })
      .then(response => {
        setTicket(prevTicket => ({
          ...prevTicket,
          ticketStatus: "OPEN"
        }));
        showNotification("Status changed from closed to open", "success");
      })
      .catch(error => {
        console.error("Error reopening ticket:", error);
      });
  };

  const handleDescriptionChange = event => {
    setTicket(prevTicket => ({
      ...prevTicket,
      description: event.target.value
    }));
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
            onChange={handleDescriptionChange}
            readOnly={ticket.ticketStatus === "OPEN"}
            
             // Handle description change
          />
        </div>
        {ticket.ticketStatus === "CLOSED" && (
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
