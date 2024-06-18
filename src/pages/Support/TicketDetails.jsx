import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [newDetail, setNewDetail] = useState("");
  const { ticketId } = useParams();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  // Fetching Ticket Details
  useEffect(() => {
    axios.get(`http://localhost:8103/supportticket/ticket/${ticketId}`)
      .then(response => {
        console.log("Ticket details response:", response.data);
        setTicket(response.data); // Updates the state with the fetched data.
      })
      .catch(error => {
        console.error("Error fetching ticket details:", error);
      });
  }, [ticketId]);

  // Handling Reopen Ticket Action
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
        showNotification("Failed to reopen the ticket. Please try again.", "error");
      });
  };

  // Handling new detail change
  const handleNewDetailChange = event => {
    setNewDetail(event.target.value);
  };

  // Handling keydown event for new detail
  const handleNewDetailKeyDown = event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent default behavior of adding a new line
      if (newDetail.trim()) {
        const updatedDescription = `${ticket.description}\n${newDetail}`;
        
        axios.patch(`http://localhost:8103/supportticket/ticket/${ticketId}`, {
          description: updatedDescription
        })
        .then(response => {
          setTicket(prevTicket => ({
            ...prevTicket,
            description: updatedDescription
          }));
          setNewDetail(""); // Clear the new detail textarea
          showNotification("Detail added successfully", "success");
        })
        .catch(error => {
          console.error("Error updating ticket details:", error);
          showNotification("Failed to add detail. Please try again.", "error");
        });
      } else {
        showNotification("Detail cannot be empty", "error");
      }
    }
  };

  // Handling go back action
  const handleGoBack = () => {
    navigate('/tickets'); // Navigate to the status page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 transition-transform hover:shadow-blue-200 dark:bg-gray-800 relative">
        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mt-4 absolute top-0 right-10" onClick={handleGoBack}>
          Go Back
        </button>
        <h1 className="text-3xl font-bold mb-4 text-blue-500 dark:text-white">Ticket Details</h1>
        <h1 className="text-3xl font-bold mb-4 text-blue-500 dark:text-white">{ticket.issueType}</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2 dark:text-white">Ticket ID: {ticket.ticketId}</label>
          <textarea
            id="description"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 border-gray-300"
            style={{ height: "30vh" }}
            value={ticket.description}
            readOnly={true}
          />
        </div>
        {ticket.ticketStatus === "CLOSED" && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Add more details:</label>
              <textarea
                id="newDetail"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 border-gray-300"
                style={{ height: "20vh" }}
                value={newDetail}
                onChange={handleNewDetailChange}
                onKeyDown={handleNewDetailKeyDown}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Issue not resolved?</label>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={handleReopen}>
                Reopen Ticket
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketDetails;
