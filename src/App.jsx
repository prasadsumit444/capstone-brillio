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
import TransactionDetails from "./pages/BillingStatement/TransactionDetails";
import SupportPage from "./pages/Support/SupportPage";
import HomePage from "./pages/HomePage/Homepage";

import { NotificationProvider } from "./pages/NotificationContext";
import { AuthGuard } from "./pages/Auth/AuthGuard";


function App() {
  return (
    <div>
      <AuthGuard>
        <BrowserRouter>
          <NotificationProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/recharge" element={<Recharge />} />
              <Route path="/prepaid" element={<Prepaid />} />
              <Route path="/postpaid" element={<Postpaid />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/payment-page" element={<PaymentPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/*" element={<AuthenticatedRoutes />} />
            </Routes>
            <ChatBot />
          </NotificationProvider>
        </BrowserRouter>
      </AuthGuard>
    </div>
  );
}

export default App;