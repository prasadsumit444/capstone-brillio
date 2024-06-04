import React, { useState } from "react";
import { FaComments, FaStore, FaQuestionCircle, FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from React Router

const SupportCard = ({ title, description, icon: Icon, to }) => { // Pass 'to' prop for Link
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white shadow-lg rounded-lg mb-4 transform transition-transform ${
        isHovered ? "scale-105 shadow-blue-200" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-8 text-center">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6">{title}</h2>
        <p className="text-lg text-gray-700 mb-8">{description}</p>
        <div className="flex justify-around">
          {/* Wrap with Link and pass 'to' prop */}
          <Link to={to} className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700">
            <Icon className="mr-2" />
            {title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Welcome Section */}
      <div className="bg-blue-600 w-full p-12 rounded-lg shadow-lg text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-6">Welcome to ASAAP Support!</h1>
        <p className="text-xl text-white">
          We are here to assist you with any queries or issues you may have.
        </p>
      </div>

      {/* Support Options Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 mb-12 px-4">
        <SupportCard
          title="Chat with FAQ bot"
          description="Get instant answers to your questions using our FAQ chat bot"
          icon={FaComments}
          to=""
        />
        <SupportCard
          title="Generate a Support Ticket"
          description="Facing an issue? Generate a ticket and we will get back to you as soon as possible."
          icon={FaStore}
          to="/new-ticket"
        />
        <SupportCard
          title="Frequently Asked Questions"
          description="Browse our FAQs to find answers to common questions."
          icon={FaQuestionCircle}
          to="/faq"
        />
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
