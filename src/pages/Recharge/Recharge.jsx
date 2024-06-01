import React, { useState } from "react";

const RechargePage = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setMobileNumber(value);
      if (value.length === 10 && /^[6-9]/.test(value)) {
        setError(""); // Clear error message if the input is valid
      } else if (value.length > 0 && !/^[6-9]/.test(value)) {
        setError("Mobile number must start with 6, 7, 8, or 9.");
      } else {
        setError("Please enter a valid 10-digit mobile number.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length === 10 && /^[6-9]/.test(mobileNumber)) {
      console.log("Form submitted:", mobileNumber);
      // Proceed with form submission
      setError(""); // Clear any previous errors
    } else if (mobileNumber.length > 0 && !/^[6-9]/.test(mobileNumber)) {
      setError("Mobile number must start with 6, 7, 8, or 9.");
    } else {
      setError("Mobile number must be exactly 10 digits.");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section with Image */}
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 bg-gray-800">
        <img
          src="https://via.placeholder.com/800x800" // Replace with your image URL
          alt="Recharge Background"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right Section with Recharge Form */}
      <div className="flex flex-col flex-grow p-4">
        <main className="bg-white p-6 mt-40 w-full">
          <h1 className="text-4xl font-bold mb-2">Prepaid mobile recharge</h1>
          <span className="text-sm opacity-80 text-gray-600 mt-1">
            Recharge your number for validity, talktime or data....
          </span>
          <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="mobile-number"
              >
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile-number"
                value={mobileNumber}
                onChange={handleInputChange}
                className="mt-1 block w-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your 10-digit number"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md"
            >
              Proceed
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default RechargePage;
