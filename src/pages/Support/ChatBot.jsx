import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Arial, Helvetica, sans-serif",
  headerBgColor: "#240750",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#003285",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};
const steps = [
  {
    id: "1",
    message: "Welcome to ASAAP support! How can I help you today?",
    trigger: "issue-type",
  },
  {
    id: "issue-type",
    options: [
      {
        value: "General Enquiries",
        label: "General Enquiries",
        trigger: "general-enquiries",
      },
      {
        value: "Account Issues",
        label: "Account Issues",
        trigger: "account-issues",
      },
      {
        value: "Internet Issues",
        label: "Internet Issues",
        trigger: "internet-issues",
      },
      {
        value: "Billing Issues",
        label: "Billing Issues",
        trigger: "billing-issues",
      },
    ],
  },
  // General Enquiries
  {
    id: "general-enquiries",
    options: [
      {
        value: "Lost SIM Card",
        label: "Lost SIM Card",
        trigger: "lost-sim-card",
      },
      {
        value: " ASAAP Customer Care Timings",
        label: " ASAAP Customer Care Timings",
        trigger: "customer-care-timings",
      },
      {
        value: " ASAAP App Not Working on My Device",
        label: "ASAAP App Not Working on My Device",
        trigger: "app-not-working",
      },
      {
        value: "How to Activate DND",
        label: "How to Activate DND",
        trigger: "activate-dnd",
      },
      {
        value: "Nearest ASAAP Store",
        label: "Nearest ASAAP Store",
        trigger: "nearest-store",
      },
    ],
  },
  {
    id: "lost-sim-card",
    message:
      "If you have lost your SIM card, please visit the nearest ASAAP store with a valid ID proof to get a replacement. You can also call ASAAP customer care at 121 for assistance. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "customer-care-timings",
    message:
      "ASAAP customer care is available 24/7. You can reach them at 121. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "app-not-working",
    message:
      "If the ASAAP app is not working on your device, try restarting your phone, updating the app, or reinstalling it. If the problem persists, contact ASAAP customer care at 121. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "activate-dnd",
    message:
      "To activate DND on your number, send 'START 0' to 1909 via SMS or use the ASAAP app under the 'Services' section. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "nearest-store",
    message:
      "To find the nearest ASAAP store, use the store locator in the ASAAP app or visit the ASAAP website. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  // Account Issues
  {
    id: "account-issues",
    options: [
      {
        value: "Unable to Login to My Account",
        label: "Unable to Login to My Account",
        trigger: "unable-login",
      },
      {
        value: "Forgot Password",
        label: "Forgot Password",
        trigger: "forgot-password",
      },
      {
        value: "Update Contact Information",
        label: "Update Contact Information",
        trigger: "update-contact",
      },
      {
        value: "View Data Usage",
        label: "View Data Usage",
        trigger: "view-data",
      },
      { value: "Change Plan", label: "Change Plan", trigger: "change-plan" },
    ],
  },
  {
    id: "unable-login",
    message:
      "If you are unable to log in to your account, please ensure that you are using the correct login credentials. If you have forgotten your password, use the 'Forgot Password' option. For further assistance, contact ASAAP customer care at 121. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "forgot-password",
    message:
      "To reset your password, click on 'Forgot Password' on the login page of the ASAAP app. Enter your registered mobile number or email to receive a reset link. Follow the instructions in the email to reset your password. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "update-contact",
    message:
      "To update your contact information, log in to your ASAAP account, go to the 'Profile' section, and update your contact details. Save the changes once done. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "view-data",
    message:
      "To view your data usage, open the ASAAP app and navigate to the 'Usage' section. You will see detailed information about your data consumption. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "change-plan",
    message:
      "To change your plan, log in to your ASAAP account, go to the 'Plans' section, and select the plan you want to switch to. Follow the on-screen instructions to complete the process. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  // Internet Issues
  {
    id: "internet-issues",
    options: [
      {
        value: "Slow Internet Speed",
        label: "Slow Internet Speed",
        trigger: "slow-speed",
      },
      {
        value: "No Internet Connection",
        label: "No Internet Connection",
        trigger: "no-connection",
      },
      {
        value: "How to Check Data Balance",
        label: "How to Check Data Balance",
        trigger: "check-balance",
      },
      {
        value: "How to Recharge Data",
        label: "How to Recharge Data",
        trigger: "recharge-data",
      },
      {
        value: "Network Coverage Issues",
        label: "Network Coverage Issues",
        trigger: "coverage-issues",
      },
    ],
  },
  {
    id: "slow-speed",
    message:
      "To troubleshoot slow internet speed, try the following steps:\n1. Restart your device.\n2. Check your data balance to ensure you haven't exhausted your quota.\n3. Move to an area with better network coverage.\n4. If the issue persists, contact ASAAP customer care at 121. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "no-connection",
    message:
      "If you have no internet connection, try the following:\n1. Ensure that mobile data is turned on in your device settings.\n2. Restart your device.\n3. Check if you are in an area with good network coverage.\n4. If the issue persists, contact ASAAP customer care at 121. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "check-balance",
    message:
      "To check your data balance, open the ASAAP app and go to the 'Usage' section. Alternatively, you can dial *121# and follow the prompts. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "recharge-data",
    message:
      "To recharge your data, open the ASAAP app, go to the 'Recharge' section, and select the data pack you want to buy. Follow the on-screen instructions to complete the payment. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "coverage-issues",
    message:
      "If you are experiencing network coverage issues, please ensure that you are in an area with good ASAAP coverage. If the issue persists, report the problem through the ASAAP app or contact customer care at 121. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  // Billing Issues
  {
    id: "billing-issues",
    options: [
      {
        value: "Incorrect Bill Amount",
        label: "Incorrect Bill Amount",
        trigger: "incorrect-bill",
      },
      {
        value: "View Bill Details",
        label: "View Bill Details",
        trigger: "view-bill",
      },
      {
        value: "How to Pay My Bill",
        label: "How to Pay My Bill",
        trigger: "pay-bill",
      },
      {
        value: "Bill Payment History",
        label: "Bill Payment History",
        trigger: "payment-history",
      },
      {
        value: "Request Bill Adjustment",
        label: "Request Bill Adjustment",
        trigger: "bill-adjustment",
      },
    ],
  },
  {
    id: "incorrect-bill",
    message:
      "If you believe your bill amount is incorrect, please review the detailed bill in the ASAAP app under the 'Billing' section. If the issue remains, contact ASAAP customer care at 121 for further assistance. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "view-bill",
    message:
      "To view your bill details, open the ASAAP app and go to the 'Billing' section. You will find a detailed breakdown of your charges. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "pay-bill",
    message:
      "To pay your bill, open the ASAAP app, go to the 'Billing' section, and click on 'Pay Now.' Follow the on-screen instructions to complete the payment. You can also pay through the ASAAP website or by visiting an ASAAP store. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "payment-history",
    message:
      "To view your bill payment history, log in to your ASAAP account, navigate to the 'Billing' section, and select 'Payment History.' You will see a list of all your past payments. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "bill-adjustment",
    message:
      "If you need to request a bill adjustment, please contact ASAAP customer care at 121. Provide the necessary details and the reason for the adjustment request. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
];

const App = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="App">
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "",
          border: "none",
          cursor: "pointer",
        }}
      >
        <TfiHeadphoneAlt size="2em" />
      </button>
      {showChat && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "350px",
            height: "400px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <ThemeProvider theme={theme}>
            <div style={{ height: "100%", overflowY: "auto" }}>
              <ChatBot steps={steps} />
            </div>
          </ThemeProvider>
        </div>
      )}
    </div>
  );
};

export default App;
