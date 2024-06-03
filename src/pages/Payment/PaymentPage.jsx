import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setMonth, setYear, getMonth, getYear } from "date-fns";
import { FaCreditCard, FaMobileAlt } from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineLoading } from "react-icons/ai";
import axios from "axios"; // Import Axios
import { useAuth } from "../Auth/AuthGuard";

const formatCardNumber = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};


const CardDetailsForm = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const handleCardNumberChange = (event) => {
    const inputCardNumber = event.target.value.replace(/\D/g, ""); // Replace non-numeric characters with empty string
    const truncatedCardNumber = inputCardNumber.slice(0, 16); // Truncate to 16 characters
    setCardNumber(formatCardNumber(truncatedCardNumber));
  };

  const handleExpiryDateChange = (date) => {
    setExpiryDate(date);
  };

  const handleCvvChange = (event) => {
    const inputCvv = event.target.value.replace(/\D/g, ""); // Replace non-numeric characters with empty string
    const truncatedCvv = inputCvv.slice(0, 3); // Truncate to 3 characters
    setCvv(truncatedCvv);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    const plainCardNumber = cardNumber.replace(/\s+/g, "");

    if (!plainCardNumber || plainCardNumber.length !== 16) {
      newErrors.plainCardNumber = "Please enter a valid 16-digit card number.";
      valid = false;
    }

    if (!expiryDate) {
      newErrors.expiryDate = "Please enter the expiry date.";
      valid = false;
    }

    if (!cvv || cvv.length !== 3) {
      newErrors.cvv = "Please enter a valid 3-digit CVV number.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const plainCardNumber = cardNumber.replace(/\s+/g, "");
    onSubmit({
      cardNumber: plainCardNumber,
      expiryDate: `${(expiryDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${expiryDate.getFullYear()}`,
      cvv,
    });
  };

  const filterExpiredDates = (date) => {
    const currentDate = new Date();
    return (
      date >=
      setYear(
        setMonth(currentDate, getMonth(currentDate)),
        getYear(currentDate)
      )
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label
          htmlFor="cardNumber"
          className="text-gray-800 font-semibold mb-1"
        >
          Card Number<span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="Enter card number"
          className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
          required
        />
        {errors.plainCardNumber && (
          <span className="text-red-600">{errors.plainCardNumber}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="expiryDate"
          className="text-gray-800 font-semibold mb-1"
        >
          Expiry Date<span className="text-red-600">*</span>
        </label>
        <DatePicker
          id="expiryDate"
          selected={expiryDate}
          onChange={handleExpiryDateChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
          filterDate={filterExpiredDates}
          className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
          placeholderText="MM/YYYY"
          required
        />
        {errors.expiryDate && (
          <span className="text-red-600">{errors.expiryDate}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="cvv" className="text-gray-800 font-semibold mb-1">
          CVV<span className="text-red-600">*</span>
        </label>
        <input
          type="password"
          id="cvv"
          value={cvv}
          onChange={handleCvvChange}
          placeholder="CVV"
          className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
          required
        />
        {errors.cvv && <span className="text-red-600">{errors.cvv}</span>}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 transition-colors"
      >
        Make Payment
      </button>
    </form>
  );
};

const UpiPaymentForm = ({ onSubmit }) => {
  const [upiId, setUpiId] = useState("");
  const [errorsupi, setErrorsupi] = useState({});

  const handleUpiIdChange = (event) => {
    setUpiId(event.target.value);
  };

  const validateFormUPI = () => {
    let valid = true;
    const newErrors = {};
  
    // Assuming upiId is defined somewhere in your component's state
    if (!upiId) {
      newErrors.upiId = "Please enter a valid UPI ID";
      setErrorsupi(newErrors);
      valid = false;
    } else if (upiId.indexOf('@') <= 0) {
      newErrors.upiId = "Please enter a valid UPI ID";
      setErrorsupi(newErrors);
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(upiId.slice(upiId.indexOf('@') + 1))) {
      newErrors.upiId = "Please enter a valid UPI ID";
      setErrorsupi(newErrors);
      valid = false;
    }
  
    return valid;
  };
  
  
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateFormUPI()) {
      return;
    }
    onSubmit(upiId);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="upiId" className="text-gray-800 font-semibold mb-1">
          UPI ID<span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="upiId"
          value={upiId}
          onChange={handleUpiIdChange}
          placeholder="Enter UPI ID"
          className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
          required
        />
        {errorsupi.upiId && (
          <span className="text-red-600">{errorsupi.upiId}</span>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 transition-colors"
      >
        Make Payment
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const navigate = useNavigate(); // Add useNavigate hook
  const [selectedOption, setSelectedOption] = useState("card");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minute timer

  useEffect(() => {
    let interval;
    if (showProcessing && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showProcessing, timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 105 && showProcessing) { // 30 seconds
      setPaymentSuccess(true);
      setShowProcessing(false);
    }
  }, [timeRemaining, showProcessing]);

  const handleOptionChange = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null); // Close the form if the same option is clicked twice
    } else {
      setSelectedOption(option);
    }
  };

  const handleCardSubmit = (cardDetails) => {
    console.log("Submitting card details:", cardDetails);
    setPaymentSuccess(true);
    sendPaymentData("CARD");
  };

  const handleUpiSubmit = (upiId) => {
    console.log("Submitting UPI ID:", upiId);
    setShowProcessing(true);
    setTimeout(() => {
      setPaymentSuccess(true);
      setShowProcessing(false);
      sendPaymentData("UPI");
    }, 2000); // Simulate 2-second delay for UPI processing
  };
  const {userId} = useAuth();
  const sendPaymentData = (paymentMode) => {
    axios.post(`http://localhost:8102/transaction/userid/${userId}/paymentdetails`, {
      planId: 1,
      paymentMode,
      transactionStatus: "SUCCESS"
    })
    .then(response => {
      console.log("Payment data sent successfully:", response.data);
    })
    .catch(error => {
      console.error("Error sending payment data:", error);
    });
  };

  const closeModal = () => {
    setPaymentSuccess(false);
    setShowProcessing(false);
    setTimeRemaining(300);
    navigate('/dashboard');
};


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
      <div className="md:w-2/3 space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          Payment options
        </h2>
        <div className="bg-white shadow-md rounded-lg">
          <div
            onClick={() => handleOptionChange("card")}
            className={`cursor-pointer py-4 px-6 border-b rounded-t-lg flex items-center ${
              selectedOption === "card" ? "bg-blue-100" : "bg-white"
            }`}
          >
            <FaCreditCard className="text-blue-600 mr-2" />
            <span className="text-gray-800 font-medium">
              Credit/Debit/ATM Card
            </span>
          </div>
          {selectedOption === "card" && (
            <div className="p-6 bg-white rounded-b-lg">
              <CardDetailsForm onSubmit={handleCardSubmit} />
            </div>
          )}
        </div>
        <div className="bg-white shadow-md rounded-lg">
          <div
            onClick={() => handleOptionChange("upi")}
            className={`cursor-pointer py-4 px-6 border-b rounded-t-lg flex items-center ${
              selectedOption === "upi" ? "bg-blue-100" : "bg-white"
            }`}
          >
            <FaMobileAlt className="text-blue-600 mr-2" />
            <span className="text-gray-800 font-medium">UPI</span>
          </div>
          {selectedOption === "upi" && (
            <div className="p-6 bg-white rounded-b-lg">
              <UpiPaymentForm onSubmit={handleUpiSubmit} />
            </div>
          )}
        </div>
      </div>
      <div className="md:w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          Payment Summary
        </h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-gray-800 font-medium">
              Postpaid Bill | 9880572182
            </h3>
            <p className="text-gray-600">Bill Payment</p>
            <div className="border-t mt-4 pt-4">
              <p className="text-gray-800 font-medium">Amount Payable</p>
              <p className="text-gray-800 font-medium">₹1</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">Don't worry. Your money is safe!</p>
            <p className="text-gray-600">100% secured payments</p>
          </div>
        </div>
      </div>
      {showProcessing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-2">Processing Payment</h3>
            <p className="text-gray-600 mb-4">Please complete the payment.</p>
            <div className="flex items-center justify-center mb-4">
              <AiOutlineLoading className="animate-spin text-blue-600 mr-2" />
              <span className="text-gray-800 font-medium">
                Time Remaining: {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>
      )}
      {paymentSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <AiOutlineCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Payment Successful</h3>
            <p className="text-gray-600 mb-4">
              Your payment has been processed successfully.
            </p>
            <button
              onClick={closeModal}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
