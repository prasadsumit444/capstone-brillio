import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../Auth/AuthGuard";

const DataUsage = () => {
  const { userId } = useAuth();
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
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchParams.get("tab")) setActiveTab(searchParams.get("tab"));
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8100/datausage/userId/${userId}`
        );
        console.log("Data Usage Response:", response.data);

        const userData = response.data.dataUsageList.filter(
          (usage) => usage.user.userId === userId
        );

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
          smsRemaining: response.data.smsRemaining,
        });
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const formatDataRemaining = () => {
    if (remainingStats.dataRemaining > 1000) {
      return `${(remainingStats.dataRemaining / 1000).toFixed(2)} GB`;
    } else {
      return `${remainingStats.dataRemaining} MB`;
    }
  };

  const barChartOptions = (yLabel) => ({
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour of the Day",
          color: "#333",
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
          color: "#333",
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
        grid: {
          color: "#ddd",
        },
        ticks: {
          color: "#666",
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
          color: "#333",
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10">
      <div className="container mx-auto my-auto py-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">
          Data Usage
        </h1>
        <div className="flex justify-center mb-8 space-x-5">
          {["data", "voice", "sms"].map((tab) => (
            <button
              key={tab}
              className={`px-5 py-2 rounded ${
                activeTab === tab
                  ? "bg-blue-500 text-white dark:bg-blue-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="h-auto w-auto flex flex-col items-center">
          {loading ? (
            <p className="text-xl text-gray-800 dark:text-gray-200">Loading...</p>
          ) : error ? (
            <p className="text-xl text-red-600 dark:text-red-400">{error}</p>
          ) : (
            <>
              {activeTab === "data" && (
                <div className="w-full md:w-3/4 lg:w-2/3 flex flex-col items-center">
                  <div className="md:w-1/3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow text-center">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Data Usage Stats</h3>
                    <p className="mb-2 text-gray-700 dark:text-gray-300">
                      <strong>Remaining Data:</strong> {formatDataRemaining()}
                    </p>
                  </div>
                  <h2 className="py-4 text-2xl mb-4 text-center text-gray-800 dark:text-gray-200">Data Usage (Hourly)</h2>
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
                  <div className="md:w-1/3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow text-center">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Call Usage Stats</h3>
                    <p className="mb-2 text-gray-700 dark:text-gray-300">
                      <strong>Voice Used:</strong> {remainingStats.voiceUsed} minutes
                    </p>
                  </div>
                  <h2 className="py-4 text-2xl mb-4 text-center text-gray-800 dark:text-gray-200">Voice Usage (Hourly)</h2>
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
                  <div className="md:w-1/3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow text-center">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">SMS Usage Stats</h3>
                    <p className="mb-2 text-gray-700 dark:text-gray-300">
                      <strong>SMS Remaining:</strong> {remainingStats.smsRemaining}/100 SMS
                    </p>
                  </div>
                  <h2 className="py-4 text-2xl mb-4 text-center text-gray-800 dark:text-gray-200">SMS Usage (Hourly)</h2>
                  <div className="chart-container w-full h-96">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataUsage;
