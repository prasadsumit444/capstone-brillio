import React, { useState, useEffect } from "react";
import axios from "axios";

const PrepaidPlans = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPlan, setCurrentPlan] = useState(null);
  const [clickedPlanId, setClickedPlanId] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:8100/plans/prepaid'); // Replace with your actual API endpoint
        const prepaidPlans = response.data.filter(plan => plan.planType === 'PREPAID');
        setPlans(prepaidPlans);
        setFilteredPlans(prepaidPlans);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    const fetchCurrentPlan = async () => {
      try {
        const userId = 1; // Replace with dynamic user ID if needed
        const planResponse = await axios.get(`http://localhost:8100/user/${userId}/currentPlan`);
        setCurrentPlan(planResponse.data);
      } catch (error) {
        console.error('Error fetching current plan:', error);
      }
    };

    fetchPlans();
    fetchCurrentPlan();
  }, []);

  const filterPlans = (category) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredPlans(plans);
    } else {
      const filtered = plans.filter(plan => plan.planCategory === category);
      setFilteredPlans(filtered);
    }
  };

  const handlePlanClick = (planId) => {
    setClickedPlanId(clickedPlanId === planId ? null : planId);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-col flex-grow p-4">
        <main className="bg-white rounded-lg p-6 mt-6 shadow-lg w-full">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Prepaid Plans</h1>
          <div 
            className="flex justify-between items-center bg-blue-100 p-4 rounded-md mb-6"
            onClick={() => handlePlanClick('current')}
          >
            {currentPlan ? (
              <>
                <div className="text-gray-800">
                  <h2 className="font-bold">
                    Current Plan: ₹ {currentPlan.planPrice}, 
                    Validity: {currentPlan.planValidity === 0 ? "Unlimited" : currentPlan.planValidity === 1 ? "1 Day" : `${currentPlan.planValidity} Days`}
                  </h2>
                  <p>{clickedPlanId === 'current' ? currentPlan.planBenefits : `${currentPlan.planBenefits.substring(0, 30)}...`}</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">
                  Repeat Recharge
                </button>
              </>
            ) : (
              <span className="text-gray-800">Seems you don't have a plan. Please recharge!!</span>
            )}
          </div>
          <div className="mb-6 flex space-x-4">
            {['All', 'Data', 'Unlimited', 'TalkTime'].map(category => (
              <button
                key={category}
                className={`border-2 px-6 py-2 rounded-full ${activeFilter === category ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-400 text-gray-800'}`}
                onClick={() => filterPlans(category)}
              >
                {category === 'All' ? 'All Plans' : `${category} Packs`}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col justify-between relative border border-gray-200 hover:border-blue-600"
                onClick={() => handlePlanClick(plan.planId)}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">₹ {plan.planPrice}</h3>
                    <h3 className="text-md font-medium text-gray-500 mb-2">
                      {plan.planValidity === 0 ? "Unlimited" : plan.planValidity === 1 ? "1 Day" : `${plan.planValidity} Days`}
                    </h3>
                  </div>
                  <hr className="my-2" />
                  <p className="text-gray-700 mb-4">
                    {clickedPlanId === plan.planId ? plan.planBenefits : `Description: ${plan.planBenefits.substring(0, 50)}...`}
                  </p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
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

export default PrepaidPlans;
