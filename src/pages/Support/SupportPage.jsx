import React, { useState } from "react";
import { FaComments, FaStore, FaQuestionCircle, FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from React Router
 
const SupportCard = ({ title, description, icon: Icon, to }) => {
  const [isHovered, setIsHovered] = useState(false);
 
  return (
    <div
      className={`bg-white shadow-lg rounded-lg mb-8 transform transition-transform ${
        isHovered ? "scale-105 shadow-blue-200" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: "380px", height: "320px" }} // Adjust width and height as needed
    >
      <div className="p-6 flex flex-col justify-between h-full  dark:bg-gray-600 rounded-xl">
        <div className="text-center">
          <Icon className="  text-6xl text-blue-600 mb-4  dark:text-white" />
          <h2 className="text-3xl font-semibold text-blue-600 mb-2  dark:text-white">{title}</h2>
          <p className="text-lg text-gray-700 dark:text-white">{description}</p>
        </div>
        <div className="text-center mt-4">
          <Link
            to={to}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700  dark:bg-gray-900"
          >
            {title}
          </Link>
        </div>
      </div>
    </div>
  );
};
 
export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 dark:bg-gray-900">
      {/* Welcome Section */}
      <div className="bg-blue-600 w-full p-12 rounded-lg shadow-lg text-center mb-12  dark:bg-gray-800 ">
        <h1 className="text-5xl font-bold text-white mb-6">Welcome to ASAAP Support!</h1>
        <p className="text-xl text-white">
          We are here to assist you with any queries or issues you may have.
        </p>
      </div>
 
      {/* Support Options Section */}
      <div className="w-full flex justify-center mb-12 px-4">
        <SupportCard
          title="Generate a Support Ticket"
          description="Facing an issue? Generate a ticket and we will get back to you as soon as possible."
          icon={FaStore}
          to="/new-ticket"
        />
        <div className="mx-4"></div> {/* Empty space for separation */}
        <SupportCard
          title="Frequently Asked Questions"
          description="Browse our FAQs to find answers to common questions."
          icon={FaQuestionCircle}
          to="/faq"
        />
        <div className="mx-4"></div> {/* Empty space for separation */}
        <SupportCard
          title="View Your Tickets"
          description="Check Status of your Ticket"
          icon={FaChalkboardTeacher}
          to="/tickets"
        />
      </div>
    </div>
  );
}
