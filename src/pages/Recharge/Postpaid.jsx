import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthGuard";

const PostpaidPlans = () => {
  const { userId } = useAuth();
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [clickedPlanId, setClickedPlanId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:8100/plans/postpaid");
        setPlans(response.data);
        setFilteredPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    const fetchCurrentPlan = async () => {
      try {
        const planResponse = await axios.get(`http://localhost:8100/user/${userId}/currentPlan`);
        setCurrentPlan(planResponse.data);
      } catch (error) {
        console.error('Error fetching current plan:', error);
      }
    };

    fetchPlans();
  }, [userId]);

  const handlePlanClick = (planId) => {
    setClickedPlanId((prevId) => (prevId === planId ? null : planId));
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = plans.filter(
      (plan) =>
        plan.planBenefits.toLowerCase().includes(query) ||
        (plan.planCategory && plan.planCategory.toLowerCase().includes(query))
    );
    setFilteredPlans(filtered);
  };

  const handleBuyPlan = (plan) => {
    navigate('/payment-page', { state: { plan } });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col flex-grow p-4">
        <main className="bg-white dark:bg-gray-800 rounded-lg p-6 mt-5 shadow-lg w-full">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">Postpaid Plans</h1>
          <div className="mb-6 text-center">
            <input
              type="text"
              className="w-full max-w-md px-5 py-2 border border-gray-300 dark:border-gray-700 rounded-full dark:bg-gray-700 dark:text-gray-200"
              placeholder="Search plans (e.g., OTT, family add-ons)"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div
            className="flex justify-between items-center bg-blue-100 dark:bg-blue-900 p-4 rounded-md mb-6 cursor-pointer"
            onClick={() => handlePlanClick('current')}
          >
            {currentPlan ? (
              <>
                <div className="text-gray-800 dark:text-gray-200">
                  <h2 className="font-bold">
                    Current Plan: ₹ {currentPlan.planPrice},
                    Validity: {currentPlan.planValidity === 0 ? "Unlimited" : currentPlan.planValidity === 1 ? "1 Day" : `${currentPlan.planValidity} Days`}
                  </h2>
                  <p>{clickedPlanId === 'current' ? currentPlan.planBenefits : `${currentPlan.planBenefits.substring(0, 30)}...`}</p>
                </div>
                <button className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 dark:hover:bg-blue-800"
                onClick={() => handleBuyPlan(currentPlan)}
                >
                  Repeat Recharge
                </button>
              </>
            ) : (
              <span className="text-gray-800 dark:text-gray-200">Seems you don't have a plan. Please buy a plan!!</span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col justify-between border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500"
                onClick={() => handlePlanClick(plan.planId)}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">₹ {plan.planPrice}</h3>
                    <h3 className="text-md font-medium text-gray-500 dark:text-gray-300 mb-2">{plan.planData} GB</h3>
                  </div>
                  <hr className="my-2 border-gray-300 dark:border-gray-600" />
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {clickedPlanId === plan.planId
                      ? plan.planBenefits
                      : `Description: ${plan.planBenefits.substring(0, 50)}...`}
                  </p>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded-md mt-auto"
                  onClick={() => handleBuyPlan(plan)}
                >
                  Buy Plan
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostpaidPlans;
