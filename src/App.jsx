import Navbar from "./Components/Navbar";
import React, { useRef } from 'react';

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Recharge from "./pages/Recharge/Recharge";
import Prepaid from "./pages/Recharge/Prepaid";
import Postpaid from "./pages/Recharge/Postpaid";
import Faq from "./pages/Support/Faq";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import PaymentPage from "./pages/Payment/PaymentPage";
import ChatBot from "./pages/Support/ChatBot";
import Invoices from "./pages/BillingStatement/Invoice";
import TransactionDetails from "./pages/BillingStatement/TransactionDetails";
import SupportPage from "./pages/Support/SupportPage";
import HomePage from "./pages/HomePage/Homepage";
import InvoiceDetails from "./pages/BillingStatement/InvoiceDetails";
import { NotificationProvider } from "./pages/NotificationContext";


function App() {
  return (
    <div>
      <NotificationProvider>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/homepage" replace={true} />}
          />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/prepaid" element={<Prepaid />} />
          <Route path="/postpaid" element={<Postpaid />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/payment-page" element={<PaymentPage />} />
          <Route path="/support" element={<SupportPage />} />

          <Route path="/*" element={<AuthenticatedRoutes />} />
          <Route path="/invoice" element={<Invoices></Invoices>}></Route>
          <Route path="/transactiondetails" element={<TransactionDetails></TransactionDetails>} />
          <Route path="/invoice/:invoiceId" element={<InvoiceDetails></InvoiceDetails>} />

        </Routes>
      </BrowserRouter>
      <ChatBot></ChatBot>
      </NotificationProvider>
    </div>
  );
}

export default App;
