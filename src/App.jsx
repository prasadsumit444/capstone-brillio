import Navbar from "./Components/Navbar";
import React from "react";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Prepaid from "./pages/Recharge/Prepaid";
import Postpaid from "./pages/Recharge/Postpaid";
import Faq from "./pages/Support/Faq";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import ChatBot from "./pages/Support/ChatBot";
import SupportPage from "./pages/Support/SupportPage";
import HomePage from "./pages/HomePage/Homepage";
import { NotificationProvider } from "./pages/NotificationContext";
import { AuthGuard } from "./pages/Auth/AuthGuard";
import ThemeProvider from "./Components/ThemeContext";

function App() {
  
  return (
    <div>
      <AuthGuard>
        <BrowserRouter>
          <ThemeProvider>
            <NotificationProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/prepaid" element={<Prepaid />} />
                <Route path="/postpaid" element={<Postpaid />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/support" element={<SupportPage />} />
                
                <Route path="/*" element={<AuthenticatedRoutes />} />
              </Routes>
              
              <ChatBot />
            </NotificationProvider>
          </ThemeProvider>
        </BrowserRouter>
      </AuthGuard>
    </div>
  );
}

export default App;
