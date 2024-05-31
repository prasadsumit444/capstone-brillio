import React, { useState } from "react";

const Setting = () => {
  const [promotionalEmails, setPromotionalEmails] = useState(true);
  const [theme, setTheme] = useState("light");

  const handleSuspendService = () => {
    // Add suspend service logic here
    alert("Your Asaap service has been temporarily suspended.");
  };

  const handleDeleteAccount = () => {
    // Add delete account logic here
    alert("Your Asaap account has been permanently deleted.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-4/5 lg:w-3/5 bg-white p-8 shadow-lg rounded-lg mt-4">
        <h2 className="text-4xl font-bold mb-6 text-gray-700">
          Account Settings
        </h2>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Email Preferences
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            Update your email preferences to receive tailored offers and updates
            from Asaap, the leading telecommunications company. Stay informed
            with relevant information tailored to your needs.
          </p>
          <div className="flex items-center justify-between px-4">
            <span className="text-md font-normal text-gray-700 mr-4">
              Receive promotional emails
            </span>
            <div className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
              <button
                onClick={() => setPromotionalEmails(true)}
                className={`border-1 px-3 py-2 ${
                  promotionalEmails
                    ? "bg-gray-200"
                    : "text-gray-700 hover:bg-gray-50 focus:relative"
                }`}
              >
                ON
              </button>
              <button
                onClick={() => setPromotionalEmails(false)}
                className={`border-l px-3 py-2 ${
                  !promotionalEmails
                    ? "bg-gray-200"
                    : "text-gray-700 hover:bg-gray-50 focus:relative"
                }`}
              >
                OFF
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-700 mb-2">App Theme</h3>
          <p className="text-sm text-gray-700 mb-4">
            Customize your Asaap app experience with your preferred theme.
            Choose between a light or dark theme for optimal comfort.
          </p>
          <div className="flex items-center justify-between px-4">
            <span className="text-md font-normal text-gray-700 mr-4">
              Set App Theme
            </span>
            <div className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
              <button
                onClick={() => setTheme("light")}
                className={`border-1 px-3 py-2 ${
                  theme === "light"
                    ? "bg-gray-200"
                    : "text-gray-700 hover:bg-gray-50 focus:relative"
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`border-l px-3 py-2 ${
                  theme === "dark"
                    ? "bg-gray-200"
                    : "text-gray-700 hover:bg-gray-50 focus:relative"
                }`}
              >
                Dark
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Temporarily Suspend Service
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            If you need to temporarily pause your Asaap service, you can do so
            here. This feature is particularly useful if you are traveling or
            need to temporarily halt your service for any reason.
          </p>
          <button
            onClick={handleSuspendService}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
          >
            Suspend Service
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Delete Account
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            If you wish to permanently delete your Asaap account, please proceed
            carefully. This action{" "}
            <span className="text-red-500">cannot be undone</span>. Deleting
            your account will result in the loss of all your data and services
            associated with your Asaap account.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
