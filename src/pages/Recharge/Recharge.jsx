import React, { useState } from "react";

const RechargePage = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setMobileNumber(value);
      if (value.length === 10 && /^[6-9]/.test(value)) {
        setError("");
      } else if (value.length > 0 && !/^[6-9]/.test(value)) {
        setError("Mobile number must start with 6, 7, 8, or 9.");
      } else {
        setError("Please enter a valid 10-digit mobile number.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = mobileNumber.length === 10 && /^[6-9]/.test(mobileNumber);
    if (isValid) {
      console.log("Form submitted:", mobileNumber);
      setError(""); 
    } else if (mobileNumber) {
      setError("Mobile number must start with 6, 7, 8, or 9 and be 10 digits long.");
    } else {
      setError("Please enter a valid 10-digit mobile number.");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 bg-blue-600">
        <img
          src="https://via.placeholder.com/800x800"
          alt="Recharge Background"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <main className="bg-white p-6 mt-40 w-auto rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Prepaid Mobile Recharge</h1>
          <span className="text-sm text-gray-600 mt-1">
            Recharge your number for validity, talktime or data....
          </span>
          <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
            <div className="flex items-center border-b border-gray-300">
              <span className="text-xl font-medium text-blue-600 mr-2">+91</span>
              <input
                type="text"
                id="mobile-number"
                value={mobileNumber}
                onChange={handleInputChange}
                className="flex-1 py-2 border-none focus:outline-none"
                placeholder="Enter your 10-digit number"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 text-center rounded-md w-1/2 mt-4"
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
