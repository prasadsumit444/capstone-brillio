import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Arial, Helvetica, sans-serif",
  headerBgColor: "#2962ff",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#2962ff",
  botFontColor: "#fff",
  userBubbleColor: "",
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
        value: "Network Issues",
        label: "Network Issues",
        trigger: "internet-issues",
      },
      {
        value: "Billing Issues",
        label: "Billing Issues",
        trigger: "billing-issues",
      },
    ],
  },
  {
    id: "general-enquiries",
    options: [
      {
        value: "ASAAP Customer Care Timings",
        label: "ASAAP Customer Care Timings",
        trigger: "customer-care-timings",
      },
      {
        value: "ASAAP App Not Working on My Device",
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
      {
        value: "Change ASAAP Postpaid Plan",
        label: "Change ASAAP Postpaid Plan",
        trigger: "change-plan",
      },
    ],
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
  {
    id: "change-plan",
    message:
      "You can change your ASAAP postpaid plan by logging into the ASAAP Thanks app or website and selecting the 'Change Plan' option. Alternatively, you can visit the nearest ASAAP store for assistance with plan changes.",
    end: true,
  },

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
        value: "Reset ASAAP Payments Bank PIN",
        label: "Reset ASAAP Payments Bank PIN",
        trigger: "reset-bank-pin",
      },
      {
        value: "Balance Transfer",
        label: "Balance Transfer",
        trigger: "balance-transfer",
      },
    ],
  },
  {
    id: "balance-transfer",
    message:
      "Yes, ASAAP allows balance transfer between prepaid numbers using the 'ASAAP Me2U' service. You can dial *141# from your ASAAP number to transfer balance to another ASAAP number. Note that a nominal service charge may apply for each balance transfer.",
    end: true,
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
    id: "reset-bank-pin",
    message:
      "If you forget your ASAAP Payments Bank PIN, you can reset it through the ASAAP Thanks app or website. Navigate to the 'Payments Bank' section, select the option to reset your PIN, and follow the instructions. You may need to provide additional verification details for security purposes.",
    end: true,
  },
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
        value: "Network Coverage Issues",
        label: "Network Coverage Issues",
        trigger: "coverage-issues",
      },
      {
        value: "Network Issues with ASAAP Connection",
        label: "Network Issues with ASAAP Connection",
        trigger: "network-issues",
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
      "If you have no internet connection, try the following:\n1. Ensure that mobile data is turned on in your device settings.\n2. Restart your device.\n3. Check if you are in an area with good network coverage.\n4. If the problem persists, contact ASAAP customer care at 121. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "coverage-issues",
    message:
      "If you experience network coverage issues, try the following steps:\n1. Restart your device.\n2. Check if other ASAAP users in your area are facing the same issue.\n3. Ensure your device's software is up to date.\n4. If the issue persists, contact ASAAP customer care at 121. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "network-issues",
    message:
      "If you experience network issues with your ASAAP connection, you can try troubleshooting steps such as restarting your device, checking for network coverage in your area, and ensuring your SIM card is inserted correctly. If the issue persists, you can contact ASAAP customer care for further assistance.",
    end: true,
  },
  {
    id: "billing-issues",
    options: [
      { value: "View Bill", label: "View Bill", trigger: "view-bill" },
      { value: "Pay Bill", label: "Pay Bill", trigger: "pay-bill" },
      {
        value: "Bill Discrepancy",
        label: "Bill Discrepancy",
        trigger: "bill-discrepancy",
      },
      {
        value: "Download Bill",
        label: "Download Bill",
        trigger: "download-bill",
      },
    ],
  },
  {
    id: "view-bill",
    message:
      'To view your bill, log in to your ASAAP account and navigate to the "Invoice" section. Here you can see your current and past bills. Hope your query is resolved. Thanks for contacting ASAAP support!',
    end: true,
  },
  {
    id: "pay-bill",
    message:
      'To pay your bill, you can use the ASAAP app or visit the ASAAP website. Go to the "Transactions" section and  make a payment. Hope your query is resolved. Thanks for contacting ASAAP support!',
    end: true,
  },
  {
    id: "bill-discrepancy",
    message:
      "If you notice a discrepancy in your bill, please contact ASAAP customer care at 121 for assistance. Provide them with details of the discrepancy for a resolution. Hope your query is resolved. Thanks for contacting ASAAP support!",
    end: true,
  },
  {
    id: "download-bill",
    message:
      'To download your bill, log in to your ASAAP account, go to the "Invoice" section, and select the bill you want to download. There will be an option to download or print the bill. Hope your query is resolved. Thanks for contacting ASAAP support!',
    end: true,
  },
];

const App = () => {
  const [showChat, setShowChat] = useState(false);//A boolean state to toggle the visibility of the chatbot.
  // const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleChat = () => {//toggles the showChat state to show or hide the chatbot.
    setShowChat(!showChat);
  };

  // const toggleTheme = () => {
  //   setIsDarkTheme(!isDarkTheme);
  // };

  // const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <div className="App">
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <TfiHeadphoneAlt
          size="2em"
          className=" hover:text-blue-900  text-blue-600 dark:text-white"
        />
      </button>
      {showChat && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "90%",
            maxWidth: "350px",
            height: "60%",
            maxHeight: "400px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <ThemeProvider theme={theme}>
            <div style={{ height: "100%", overflowY: "scroll" }}>
              <ChatBot
                steps={steps}
                placeholder="" // Remove "Type here..." input field
                hideInput={true} // Hide input field to avoid user input for FAQ
              />
            </div>
          </ThemeProvider>
        </div>
      )}
    </div>
  );
};

export default App;
