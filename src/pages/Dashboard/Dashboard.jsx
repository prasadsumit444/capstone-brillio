import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthGuard";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [usageData, setUsageData] = useState({
    fullName: "User!",
    mobileNumber: "",
    userStatus: "",
    planType: "",
    planDescription: "",
    planPrice: 0,
    expiryDate: "",
    planData: 100,
    remainingData: 0,
    planSms: 100,
    remainingSms: 0,
  });

  const { userId } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:8104/account/dashboard/${userId}/dashboardInfo`) // Replace with your API endpoint
      .then((response) => {
        const {
          fullName,
          mobileNumber,
          userStatus,
          planType,
          planDescription,
          planPrice,
          expiryDate,
          planData,
          remainingData,
          planSms,
          remainingSms,
        } = response.data;

        setUsageData({
          fullName,
          mobileNumber,
          userStatus,
          planType,
          planDescription,
          planPrice,
          expiryDate,
          planData,
          remainingData,
          planSms,
          remainingSms,
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the usage data!", error);
      });
  }, [userId]);

  // Calculating used data
  const usedData =
    usageData.planData == null
      ? 100
      : usageData.planData - usageData.remainingData;
  const usedSms =
    usageData.planSms == null
      ? 100
      : usageData.planSms - usageData.remainingSms;

  const dataUsage = {
    datasets: [
      {
        data: [usedData, usageData.remainingData || 0],
        backgroundColor: ["#e0f2fe", "#1e40af"],
        hoverBackgroundColor: ["#e0f2fe", "#1d4ed8"],
        borderWidth: 1,
        borderColor: "#ffffff",
      },
    ],
    labels: ["Used", "Left"],
  };

  const smsUsage = {
    datasets: [
      {
        data: [usedSms, usageData.remainingSms || 0],
        backgroundColor: ["#e0f2fe", "#1e40af"],
        hoverBackgroundColor: ["#e0f2fe", "#1d4ed8"],
        borderWidth: 1,
        borderColor: "#ffffff",
      },
    ],
    labels: ["Used", "Left"],
  };

  const voiceUsage = {
    datasets: [
      {
        data: [100, 0],
        backgroundColor: ["#e0f2fe", "#1e40af"],
        hoverBackgroundColor: ["#e0f2fe", "#1d4ed8"],
        borderWidth: 1,
        borderColor: "#ffffff",
      },
    ],
    labels: ["Used", "Left"],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: "70%",
  };

  const renderCenterText = (chartData, isDataUsage) => {
    const remaining = chartData.datasets[0].data[1];

    const remainingText = isDataUsage
      ? remaining > 1024
        ? `${(remaining / 1024).toFixed(2)} GB`
        : remaining != null
        ? `${remaining.toFixed(2)} MB`
        : "0 MB"
      : remaining;

    const label = isDataUsage
      ? remaining > 1024
        ? "data Left"
        : "Left"
      : "SMS Left";

    return (
      <div className="text-center">
        <span className="text-2xl font-bold text-gray-700">
          {remainingText}
        </span>
        <br />
        <span className="text-sm text-gray-500">{label}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-12 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row flex-grow m-4 space-x-0 md:space-x-4 space-y-4 md:space-y-0">
        {/* Center Column: Plan Details and Data Usage */}
        <div className="flex-1 flex flex-col space-y-4">
          <Link to="/profile" className="flex-grow h-1/4">
            <div className="bg-white rounded-lg shadow-lg p-5 transform transition-transform duration-300 hover:scale-105 hover:shadow-m hover:shadow-blue-200 dark:hover:shadow-white dark:bg-gray-800">
              <h1 className="text-3xl font-semibold text-primary_light mb-6 dark:text-blue-300">
                Hi {usageData.fullName},
              </h1>
              <div className="text-2xl flex justify-between dark:text-white">
                <p>{usageData.mobileNumber}</p>
                <p>{usageData.userStatus}</p>
              </div>
            </div>
          </Link>
          <div className="bg-white rounded-lg shadow-md p-5 h-2/4 dark:bg-gray-800">
            <h2 className="text-primary_light text-3xl font-semibold mb-6 dark:text-blue-300">
              {usageData.planType == null
                ? "Kindly Recharge"
                : usageData.planType}
            </h2>
            <div className="text-2xl flex justify-between mb-4 text-gray-700 dark:text-white">
              ₹ {usageData.planPrice}
            </div>
            <div className="text-xl flex justify-between mb-4 text-gray-700 dark:text-white">
              {usageData.planDescription == null
                ? "Hi there, We're thrilled to have you on board. It looks like you haven't chosen a plan yet. To start enjoying all the benefits and features we offer, explore our various plans and pick the one that suits you best."
                : usageData.planDescription}
            </div>
            <div className="text-xl flex justify-between mb-3 text-gray-500 dark:text-white">
              Plan expires on:{" "}
              {usageData.expiryDate == null
                ? "Loading..."
                : usageData.expiryDate}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md h-1/4 p-5 flex-grow transform transition-transform duration-300 hover:scale-105 hover:shadow-m hover:shadow-blue-200 dark:bg-gray-800 dark:hover:shadow-white">
            <h2 className="text-lg font-semibold text-primary_light mb-6 dark:text-blue-300">
              Quick Access
            </h2>
            <div className="flex justify-around">
              <Link
                to="/transaction"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 dark:text-white dark:hover:text-blue-300"
              >
                Transactions
              </Link>
              <Link
                to="/support"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 dark:text-white dark:hover:text-blue-300"
              >
                Support
              </Link>
              <Link
                to="/settings"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 dark:text-white dark:hover:text-blue-300"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Data, SMS, and Voice */}
        <div className="w-full md:w-1/4 flex flex-col space-y-4">
          <Link to="/datausage?tab=data" className="flex-grow">
            <div className="bg-white rounded-lg shadow-md p-5 flex-grow transform transition-transform duration-300 hover:scale-105 relative hover:shadow-m hover:shadow-blue-200 dark:hover:shadow-white dark:text-white dark:hover:text-blue-300 dark:bg-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 pb-4 dark:text-gray-900">
                Data
              </h2>
              <div className="relative h-24">
                <Doughnut data={dataUsage} options={options} />
                <div className="absolute inset-0 flex items-center justify-center pl-24 pb-6">
                  {renderCenterText(dataUsage, true)}
                </div>
              </div>
            </div>
          </Link>
          <Link to="/datausage?tab=sms" className="flex-grow">
            <div className="bg-white rounded-lg shadow-md p-5 flex-grow transform transition-transform duration-300 hover:scale-105 relative hover:shadow-m hover:shadow-blue-200 dark:hover:shadow-white dark:text-white dark:hover:text-blue-300 dark:bg-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 pb-4">SMS</h2>
              <div className="relative h-24">
                <Doughnut data={smsUsage} options={options} />
                <div className="absolute inset-0 flex items-center justify-center pl-24 pb-6">
                  {renderCenterText(smsUsage, false)}
                </div>
              </div>
            </div>
          </Link>
          <Link to="/datausage?tab=voice" className="flex-grow">
            <div className="bg-white rounded-lg shadow-md p-5 flex-grow transform transition-transform duration-300 hover:scale-105 relative hover:shadow-m hover:shadow-blue-200 dark:hover:shadow-white dark:text-white dark:hover:text-blue-300 dark:bg-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 pb-4">
                Voice
              </h2>
              <div className="relative h-24">
                <Doughnut data={voiceUsage} options={options} />
                <div className="absolute inset-0 flex items-center justify-center text-2xl text-gray-900 pl-28 pb-6">
                  Unlimited
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
