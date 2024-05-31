import React from "react";
import { FaComments, FaPhone, FaStore } from "react-icons/fa";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      {/* Welcome Section */}
      <div className="bg-blue-500 w-full p-10 rounded-lg shadow-md mb-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to ASAAP Support!
        </h1>
      </div>

      {/* Discussion Section */}
      <div className="bg-blue-500 w-full p-10 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-semibold text-white mb-2">
          Still need to discuss something?
        </h2>
        <p className="text-lg text-white mb-6">We'd love to help you.</p>
        <div className="flex justify-center space-x-4">
          <button className="flex items-center bg-white text-blue-600 px-6 py-3 rounded-full shadow hover:bg-gray-200">
            <FaComments className="mr-2" />
            Chat with us
          </button>
          <button className="flex items-center bg-white text-blue-600 px-6 py-3 rounded-full shadow hover:bg-gray-200">
            <FaPhone className="mr-2" />
            Call us
          </button>
          <button className="flex items-center bg-white text-blue-600 px-6 py-3 rounded-full shadow hover:bg-gray-200">
            <FaStore className="mr-2" />
            Find a store
          </button>
        </div>
      </div>
    </div>
  );
}
