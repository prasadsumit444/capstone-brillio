import React, { useState } from "react";
import axios from "axios";
import { useNotification } from "./../NotificationContext"; // Ensure correct path

const TicketGeneration = () => {
  const [formData, setFormData] = useState({ description: "", issueType: "GENERAL_ENQUIRIES" });
  const [formErrors, setFormErrors] = useState({});
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors as user types
    if (name === "description" && value) {
      setFormErrors((prevErrors) => {
        const { description, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.description) errors.description = "Description is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const timestamp = new Date().toISOString();
        const dataToSend = {
          ...formData,
          ticketStatus: "OPEN",
          timeStamp: timestamp
        };
        const response = await axios.post("http://localhost:8103/supportticket/generateticket/2", dataToSend);
        console.log("Form Data Submitted:", response.data);
        showNotification("Ticket submitted successfully", "success");
        // Reset form after successful submission
        setFormData({ description: "", issueType: formData.issueType });
      } catch (error) {
        console.error("Error submitting the form:", error);
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // Request was made but no response was received
          console.error("Request data:", error.request);
        } else {
          // Something else happened
          console.error("Error message:", error.message);
        }
        showNotification("Failed to submit ticket", "error");
      }
    } else {
      setFormErrors(errors);
    }
  };
  
  

  return (
    <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full mx-auto mt-12 p-8 hover:shadow-blue-200">
      <h2 className="text-3xl font-bold mb-8">Generate a Support Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3" htmlFor="issueType">
            Issue Type
          </label>
          <select
            id="issueType"
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 border-gray-300"
          >
            <option value="GENERAL_ENQUIRIES">General Enquiries</option>
            <option value="NETWORK_ISSUES">Network Issues</option>
            <option value="BILLING_ISSUES">Billing Issues</option>
            <option value="ACCOUNT_ISSUES">Account Issues</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3" htmlFor="description">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              formErrors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows="6"
          />
          {formErrors.description && <p className="text-red-500 text-sm mt-2">{formErrors.description}</p>}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-6 py-3 text-lg font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Submit Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketGeneration;

