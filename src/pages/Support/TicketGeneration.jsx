import React, { useState } from "react";

const TicketGeneration = () => {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    issueType: "General Inquiry",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.subject) errors.subject = "Subject is required";
    if (!formData.description) errors.description = "Description is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log("Form Data Submitted:", formData);
      // Handle form submission logic (e.g., send data to an API)
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-6">Generate a Support Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="issueType"
            >
              Issue Type
            </label>
            <select
              id="issueType"
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 border-gray-300"
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Billing Issue">Billing Issue</option>
              <option value="Account Issue">Account Issue</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="description"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              formErrors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows="5"
          />
          {formErrors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.description}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-2"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketGeneration;
