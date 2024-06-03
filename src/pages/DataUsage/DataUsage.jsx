import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const DataUsage = () => {
  const [usage, setUsage] = useState({
    hourlyData: [],
    voiceHourly: [],
    smsHourly: [],
  });
  const [activeTab, setActiveTab] = useState("data");
  const [remainingStats, setRemainingStats] = useState({
    dataRemaining: 0,
    voiceUsed: 0,
    smsRemaining: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8100/datausage/userId/2"
        ); // Add userId dynamically here
        console.log("Data Usage Response:", response.data); // Log API response
        const userData = response.data.dataUsageList.filter(
          (usage) => usage.user.userId === 2
        ); // Add userId dynamically here

        const hourlyData = Array.from({ length: 24 }, (_, i) => {
          const data = userData.find((usage) => usage.usageHour === i);
          return data ? data.dataUsageMb : 0;
        });

        const voiceHourly = Array.from({ length: 24 }, (_, i) => {
          const data = userData.find((usage) => usage.usageHour === i);
          return data ? data.voiceMinutes : 0;
        });

        const smsHourly = Array.from({ length: 24 }, (_, i) => {
          const data = userData.find((usage) => usage.usageHour === i);
          return data ? data.smsCount : 0;
        });

        const totalVoiceUsage = voiceHourly.reduce(
          (sum, value) => sum + value,
          0
        );

        setUsage({ hourlyData, voiceHourly, smsHourly });

        setRemainingStats({
          dataRemaining: response.data.dataRemaining,
          voiceUsed: totalVoiceUsage,
          smsRemaining: response.data.SmsRemaining,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const barChartOptions = (yLabel) => ({
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour of the Day",
          color: "#333", // X-axis label color
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel,
          color: "#333", // Y-axis label color
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
        grid: {
          color: "#ddd", // Y-axis grid color
        },
        ticks: {
          color: "#666", // Y-axis tick color
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#333", // Legend label color
          font: {
            size: 14,
          },
        },
      },
    },
  });

  const barChartData = (data, label, bgColor, borderColor) => ({
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: label,
        data: data,
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto my-auto py-10 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Data Usage
        </h1>
        <div className="flex justify-center mb-8 space-x-5">
          {["data", "voice", "sms"].map((tab) => (
            <button
              key={tab}
              className={`px-5 py-2 rounded ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="h-auto w-auto flex flex-col items-center">
          {activeTab === "data" && (
            <div className="w-full md:w-3/4 lg:w-2/3 flex flex-col items-center">
              <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg shadow text-center">
                <h3 className="text-xl font-semibold mb-2">Data Usage Stats</h3>
                <p className="mb-2">
                  <strong>Remaining Data:</strong>{" "}
                  {remainingStats.dataRemaining} MB
                </p>
              </div>
              <h2 className="py-4 text-2xl mb-4 text-center">
                Data Usage (Hourly)
              </h2>
              <div className="chart-container w-full h-96">
                <Bar
                  data={barChartData(
                    usage.hourlyData,
                    "Data Usage (MB)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(75, 192, 192, 1)"
                  )}
                  options={barChartOptions("Data Usage (MB)")}
                />
              </div>
            </div>
          )}
          {activeTab === "voice" && (
            <div className="w-full md:w-3/4 lg:w-2/3 flex flex-col items-center">
              <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg shadow text-center">
                <h3 className="text-xl font-semibold mb-2">Call Usage Stats</h3>
                <p className="mb-2">
                  <strong>Voice Used:</strong> {remainingStats.voiceUsed}{" "}
                  minutes
                </p>
              </div>
              <h2 className="py-4 text-2xl mb-4 text-center">
                Voice Usage (Hourly)
              </h2>
              <div className="chart-container w-full h-96">
                <Bar
                  data={barChartData(
                    usage.voiceHourly,
                    "Voice Minutes",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(54, 162, 235, 1)"
                  )}
                  options={barChartOptions("Voice Minutes")}
                />
              </div>
            </div>
          )}
          {activeTab === "sms" && (
            <div className="w-full md:w-3/4 lg:w-2/3 flex flex-col items-center">
              <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg shadow text-center">
                <h3 className="text-xl font-semibold mb-2">SMS Usage Stats</h3>
                <p className="mb-2">
                  <strong>SMS Remaining:</strong> {remainingStats.smsRemaining}
                  /100 SMS
                </p>
              </div>
              <h2 className="py-4 text-2xl mb-4 text-center">
                SMS Usage (Hourly)
              </h2>
              <div className="chart-container w-full  h-96">
                <Bar
                  data={barChartData(
                    usage.smsHourly,
                    "SMS Count",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(255, 206, 86, 1)"
                  )}
                  options={barChartOptions("SMS Count")}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataUsage;
