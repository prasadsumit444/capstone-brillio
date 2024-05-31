import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import TicketGeneration from "./pages/Support/TicketGeneration";
import TicketStatus from "./pages/Support/TicketStatus";
import TicketDetails from "./pages/Support/TicketDetails";
import Invoice from "./pages/BillingStatement/Invoice";
import TransactionDetails from "./pages/BillingStatement/TransactionDetails";
import DataUsage from "./pages/DataUsage/DataUsage.jsx";
import Setting from "./pages/Settings/Setting.jsx";

export default function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/new-ticket" element={<TicketGeneration />} />
      <Route path="/tickets" element={<TicketStatus />} />
      <Route path="/tickets/:ticketId" element={<TicketDetails />} />
      <Route path="/invoice" element={<Invoice></Invoice>}></Route>
      <Route path="/transactiondetails" element={<TransactionDetails></TransactionDetails>} />
      <Route path="/datausage" element={<DataUsage/>}></Route>
      <Route path="/settings" element={<Setting/>} />
    </Routes>
  );
}
