import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePdf from "./InvoicePdf";
 
const InvoiceDetails = () => {
  const { invoiceId } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(`http://localhost:8102/transaction/invoice/${invoiceId}`);
        setInvoiceData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
 
    fetchInvoiceData();
  }, [invoiceId]);
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  // Calculate tax and monthly rentals
  const tax = invoiceData.billAmount * 0.18;
  const monthlyRentals = invoiceData.billAmount - tax;
 
  return (
    <div className="p-8 font-sans max-w-4xl mx-auto bg-white shadow-md">
      <div className="border-b-2 pb-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">MOBILE SERVICES</h1>
            <p className="text-gray-600">Original Copy for Recipient - Tax Invoice</p>
          </div>
          <div className="text-right">
            <p className="text-gray-900 font-semibold">Invoice ID: {invoiceData?.invoiceId}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-700 text-sm w-full md:w-1/2">
            <p>Full Name: {invoiceData?.fullName}</p>
            <p>Address: {invoiceData?.address}</p>
          </div>
          <div className="text-gray-700 text-sm w-full md:w-1/2 mt-6 md:mt-0 ml-12">
            <div className="flex flex-col justify-end">
              <p>Billing Period: {invoiceData?.startDate} to {invoiceData?.endDate}</p>
              <p className="font-bold">Bill Amount: ₹{invoiceData?.billAmount.toFixed(2)}</p>
              <p className="font-semibold">Payment Due Date: {invoiceData?.paymentDueDate}</p>
            </div>
          </div>
        </div>
        <div className="text-gray-700 text-sm mt-6">
          <p className="font-semibold">Plan Benefits:</p>
          <p>{invoiceData?.planBenefits}</p>
        </div>
        <div className="text-gray-700 text-sm mt-6">
          <p className="font-semibold">Tax and Total Amount:</p>
          <p>Monthly Rentals: ₹{monthlyRentals.toFixed(2)}</p>
          <p>Tax (18%): ₹{tax.toFixed(2)}</p>
          <p className="font-bold">Total Amount: ₹{invoiceData?.billAmount.toFixed(2)}</p>
        </div>
      </div>
 
      <PDFDownloadLink
        document={<InvoicePdf invoiceData={invoiceData} />}
        fileName={`invoice-${invoiceData?.invoiceId}.pdf`}
        className="mt-8 bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
      >
        {({ loading }) => (loading? "Generating PDF..." : "Download as PDF")}
      </PDFDownloadLink>
    </div>
  );
};
 
export default InvoiceDetails;
 