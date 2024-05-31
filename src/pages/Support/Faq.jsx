import React, { useState } from "react";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "How can I change my Airtel postpaid plan?",
    answer:
      "You can change your Airtel postpaid plan by logging into the Airtel Thanks app or website and selecting the 'Change Plan' option. Alternatively, you can visit the nearest Airtel store for assistance with plan changes.",
  },
  {
    question:
      "What should I do if I face network issues with my Airtel connection?",
    answer:
      "If you experience network issues with your Airtel connection, you can try troubleshooting steps such as restarting your device, checking for network coverage in your area, and ensuring your SIM card is inserted correctly. If the issue persists, you can contact Airtel customer care for further assistance.",
  },
  {
    question: "How do I activate Airtel digital TV services?",
    answer:
      "To activate Airtel digital TV services, you can visit the Airtel website, use the Airtel Thanks app, or contact Airtel customer care. You may need to purchase a set-top box and choose a suitable subscription plan to start enjoying Airtel digital TV services.",
  },
  {
    question: "Can I transfer my Airtel prepaid balance to another number?",
    answer:
      "Yes, Airtel allows balance transfer between prepaid numbers using the 'Airtel Me2U' service. You can dial *141# from your Airtel number to transfer balance to another Airtel number. Note that a nominal service charge may apply for each balance transfer.",
  },
  {
    question: "How do I subscribe to Airtel broadband services?",
    answer:
      "You can subscribe to Airtel broadband services by visiting the Airtel website, using the Airtel Thanks app, or contacting Airtel customer care. Airtel offers various broadband plans with high-speed internet, unlimited data, and additional benefits such as free router installation and complimentary subscriptions to OTT platforms.",
  },
  {
    question: "How can I activate Airtel Wi-Fi Calling on my device?",
    answer:
      "To activate Airtel Wi-Fi Calling, ensure that your device supports the feature and is connected to a Wi-Fi network. Go to your device settings, enable Wi-Fi Calling, and select Airtel as your preferred network provider. Once activated, you can make and receive calls over Wi-Fi using your Airtel number.",
  },
  {
    question: "What should I do if I forget my Airtel Payments Bank PIN?",
    answer:
      "If you forget your Airtel Payments Bank PIN, you can reset it through the Airtel Thanks app or website. Navigate to the 'Payments Bank' section, select the option to reset your PIN, and follow the instructions. You may need to provide additional verification details for security purposes.",
  },
  {
    question: "What should I do if I lose my Airtel SIM card?",
    answer:
      "If you lose your Airtel SIM card, you should immediately contact Airtel customer care to block the SIM and request a replacement. You may need to visit the nearest Airtel store with valid identification documents to get a new SIM card with the same mobile number.",
  },
  {
    question: "How do I activate international roaming on my Airtel number?",
    answer:
      "To activate international roaming on your Airtel number, you can use the Airtel Thanks app, visit the Airtel website, or contact Airtel customer care. You may need to submit some documents and pay a nominal fee to activate international roaming services.",
  },
  {
    question: "How do I check my Airtel prepaid balance and validity?",
    answer:
      "To check your Airtel prepaid balance and validity, you can dial *121# from your Airtel mobile number. You will receive an SMS containing details of your account balance, validity, data balance, and any active plans.",
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white shadow-lg rounded-lg mb-4 transform transition-transform ${
        isHovered ? "scale-105 shadow-blue-200" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className="w-full text-left py-4 px-6 flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <span className="text-lg font-medium">{question}</span>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`px-6 pb-4 ${isOpen ? "block" : "hidden"}`}
        style={{
          maxHeight: isOpen ? "150px" : "0",
          overflow: "hidden",
          transition: "max-height 0.5s ease",
        }}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow max-w-4xl w-full mx-auto mt-10 p-6">
        <h2 className="text-2xl font-bold pb-4 mb-4">
          Frequently Asked Questions
        </h2>
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      <footer className="max-w-4xl w-full mx-auto mt-4 p-6 text-center">
        <p className="text-lg">
          You can generate a{" "}
          <Link to="/new-ticket" className="text-red-500 font-semibold">
            Ticket
          </Link>{" "}
          for your query or view your{" "}
          <Link to="/tickets" className="text-red-500 font-semibold">
            Previous Tickets
          </Link>{" "}
          here .
        </p>
        <p className="text-lg text-gray-700">
          If query not resolved,{" "}
          <Link to="/new-ticket" className="text-red-500 font-semibold">
            Chat
          </Link>{" "}
          with us .
        </p>
      </footer>
    </div>
  );
};

export default Faq;
