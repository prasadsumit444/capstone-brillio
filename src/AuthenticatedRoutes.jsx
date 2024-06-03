import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import TicketGeneration from "./pages/Support/TicketGeneration";
import TicketStatus from "./pages/Support/TicketStatus";
import TicketDetails from "./pages/Support/TicketDetails";
import Invoice from "./pages/BillingStatement/Invoice";
import TransactionDetails from "./pages/BillingStatement/TransactionDetails";
import DataUsage from "./pages/DataUsage/DataUsage.jsx";
import Setting from "./pages/Settings/Setting.jsx";
import InvoiceDetails from "./pages/BillingStatement/InvoiceDetails";
import PaymentPage from "./pages/Payment/PaymentPage";
import Invoices from "./pages/BillingStatement/Invoice";
import { useAuth } from "./pages/Auth/AuthGuard.jsx";

export default function AuthenticatedRoutes() {
  const location = useLocation();
  const auth = useAuth();
  if (!auth.userId) {
    return (
      <Navigate to="/login" state={{ path: location.pathname }}></Navigate>
    );
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/new-ticket" element={<TicketGeneration />} />
      <Route path="/tickets" element={<TicketStatus />} />
      <Route path="/tickets/:ticketId" element={<TicketDetails />} />
      <Route path="/invoice" element={<Invoice></Invoice>}></Route>
      <Route
        path="/transaction"
        element={<TransactionDetails></TransactionDetails>}
      />
      <Route path="/payment-page" element={<PaymentPage />} />
      <Route path="/datausage" element={<DataUsage />}></Route>
      <Route path="/settings" element={<Setting />} />
      <Route path="/invoice" element={<Invoices></Invoices>}></Route>
      <Route
        path="/invoice/:invoiceId"
        element={<InvoiceDetails></InvoiceDetails>}
      />
    </Routes>
  );
}
