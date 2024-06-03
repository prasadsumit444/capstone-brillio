import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostpaidPlans = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
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

    fetchPlans();
  }, []);

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
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-col flex-grow p-4">
        <main className="bg-white rounded-lg p-6 mt-5 shadow-lg w-full">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Postpaid Plans</h1>
          <div className="mb-6">
            <input
              type="text"
              className="w-3/12 px-5 ml-50 border border-gray-700 rounded-full"
              placeholder="Search plans (e.g., OTT, family add-ons)"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col justify-between border border-gray-200 hover:border-blue-600"
                onClick={() => handlePlanClick(plan.planId)}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">₹ {plan.planPrice}</h3>
                    <h3 className="text-md font-medium text-gray-500 mb-2">{plan.planData} GB</h3>
                  </div>
                  <hr className="my-2" />
                  <p className="text-gray-700 mb-4">
                    {clickedPlanId === plan.planId
                      ? plan.planBenefits
                      : `Description: ${plan.planBenefits.substring(0, 50)}...`}
                  </p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-auto"
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
