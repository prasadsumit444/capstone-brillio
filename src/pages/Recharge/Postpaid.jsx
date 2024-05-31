import React, { useEffect, useState } from "react";
import axios from "axios";

const RechargePlans = () => {
  const [plans, setPlans] = useState([]);
  const [clickedPlanId, setClickedPlanId] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:8100/plans/postpaid'); 
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanClick = (planId) => {
    setClickedPlanId(clickedPlanId === planId ? null : planId);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Postpaid Plans
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col justify-between border border-gray-200 hover:border-blue-600"
              onClick={() => handlePlanClick(plan.planId)}
            >
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">₹ {plan.planPrice}</h3>
                  <h3 className="text-md font-medium text-gray-500 mb-2">
                    {plan.planData} GB
                  </h3>
                </div>
                <hr className="my-2" />
                <p className="text-gray-700 mb-4">
                  Description: {clickedPlanId === plan.planId ? plan.planBenefits : `${plan.planBenefits.substring(0, 50)}...`}
                </p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-auto">
                Buy Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RechargePlans;
