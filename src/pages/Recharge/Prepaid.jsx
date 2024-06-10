import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Auth/AuthGuard";
import { useNavigate } from "react-router-dom";

const PrepaidPlans = () => {
  const { userId } = useAuth();
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPlan, setCurrentPlan] = useState(null);
  const [clickedPlanId, setClickedPlanId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:8100/plans/prepaid");
        const prepaidPlans = response.data.filter(plan => plan.planType === "PREPAID");
        setPlans(prepaidPlans);
        setFilteredPlans(prepaidPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    const fetchCurrentPlan = async () => {
      try {
        const planResponse = await axios.get(`http://localhost:8100/user/${userId}/currentPlan`);
        setCurrentPlan(planResponse.data);
      } catch (error) {
        console.error("Error fetching current plan:", error);
      }
    };

    fetchPlans();
    fetchCurrentPlan();
  }, [userId]);

  const filterPlans = (category) => {
    setActiveFilter(category);
    setSearchQuery("");
    if (category === "All") {
      setFilteredPlans(plans);
    } else {
      const filtered = plans.filter(plan => plan.planCategory === category);
      setFilteredPlans(filtered);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setActiveFilter("All");
    const filtered = plans.filter(plan =>
      plan.planBenefits.toLowerCase().includes(query) ||
      plan.planCategory.toLowerCase().includes(query)
    );
    setFilteredPlans(filtered);
  };

  const handleBuyPlan = (plan) => {
   
      navigate("/payment-page", { state: { plan } });
    
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Sorry, Can&apos;t recharge now</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Your current plan is active. Please recharge after your current plan expires.
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded-md"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col flex-grow p-4">
        <main className="bg-white dark:bg-gray-800 rounded-lg p-6 mt-5 shadow-lg w-full">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary_light dark:text-blue-400">Prepaid Plans</h1>
          <div className="mb-6 text-center">
            <input
              type="text"
              className="w-full max-w-md px-5 py-2 border border-gray-300 dark:border-gray-700 rounded-full dark:bg-gray-700 dark:text-gray-200"
              placeholder="Search plans (e.g., OTT, Unlimited or Data)"
              value={searchQuery}
              onChange={handleSearch}
              aria-label="Search plans"
            />
          </div>
          <div className="mb-6">
            {userId && currentPlan && currentPlan.planType === "PREPAID" && (
              <div
                className="flex justify-between items-center bg-blue-100 dark:bg-blue-900 p-4 rounded-md mb-6"
                aria-expanded={clickedPlanId === "current"}
              >
                <div className="text-gray-800 dark:text-gray-200">
                  <h2 className="font-bold">
                    Current Plan: &#8377; {currentPlan.planPrice}, Validity: {currentPlan.planValidity === 0 ? "Unlimited" : currentPlan.planValidity === 1 ? "1 Day" : `${currentPlan.planValidity} Days`}
                  </h2>
                  <p>{clickedPlanId === "current" ? currentPlan.planBenefits : `${currentPlan.planBenefits.substring(0, 30)}...`}</p>
                </div>
                <button
                  className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 dark:hover:bg-blue-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuyPlan(currentPlan);
                  }}
                >
                  Repeat Recharge
                </button>
              </div>
            )}
          </div>
          <div className="mb-6 flex justify-center space-x-4">
            {["All", "Data", "Unlimited", "TalkTime"].map(category => (
              <button
                key={category}
                className={`border-2 px-6 py-2 rounded-full ${activeFilter === category ? "bg-blue-600 dark:bg-blue-700 border-blue-600 dark:border-blue-700 text-white" : "bg-white dark:bg-gray-700 border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-200"}`}
                onClick={() => filterPlans(category)}
              >
                {category === "All" ? "All Plans" : `${category} Packs`}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform flex flex-col justify-between relative border border-gray-200 dark:border-gray-700 ${clickedPlanId === plan.planId ? "scale-105" : ""}`}
                aria-expanded={clickedPlanId === plan.planId}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-primary_light dark:text-blue-400 mb-2">&#8377; {plan.planPrice}</h3>
                    <h3 className="text-md font-medium text-gray-500 dark:text-gray-300 mb-2">
                      {plan.planValidity === 0 ? "Unlimited" : plan.planValidity === 1 ? "1 Day" : `${plan.planValidity} Days`}
                    </h3>
                  </div>
                  <hr className="my-2 border-gray-300 dark:border-gray-600" />
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {clickedPlanId === plan.planId ? plan.planBenefits : `Description: ${plan.planBenefits.substring(0, 50)}...`}
                  </p>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded-md mt-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuyPlan(plan);
                  }}
                >
                  Recharge
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrepaidPlans;
