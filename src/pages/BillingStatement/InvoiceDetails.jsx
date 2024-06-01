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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded shadow">
            <p className="font-semibold text-gray-700">Full Name:</p>
            <p className="text-gray-600">{invoiceData?.fullName}</p>
            <p className="font-semibold text-gray-700 mt-4">Address:</p>
            <p className="text-gray-600">{invoiceData?.address}</p>
          </div>
          <div className="p-4 border rounded shadow">
            <p className="font-semibold text-gray-700">Billing Period:</p>
            <p className="text-gray-600">{invoiceData?.startDate} to {invoiceData?.endDate}</p>
            <p className="font-semibold text-gray-700 mt-4">Bill Amount:</p>
            <p className="text-gray-900 font-bold">₹{invoiceData?.billAmount.toFixed(2)}</p>
            <p className="font-semibold text-gray-700 mt-4">Payment Due Date:</p>
            <p className="text-gray-600">{invoiceData?.paymentDueDate}</p>
          </div>
          <div className="p-4 border rounded shadow">
            <p className="font-semibold text-gray-700">Plan Benefits:</p>
            <p className="text-gray-600">{invoiceData?.planBenefits}</p>
          </div>
          <div className="p-4 border rounded shadow">
            <p className="font-semibold text-gray-700">Tax and Total Amount:</p>
            <p className="text-gray-600">Monthly Rentals: ₹{monthlyRentals.toFixed(2)}</p>
            <p className="text-gray-600">Tax (18%): ₹{tax.toFixed(2)}</p>
            <p className="font-bold text-gray-900">Total Amount: ₹{invoiceData?.billAmount.toFixed(2)}</p>
          </div>
          <div className="col-span-1 md:col-span-2 p-4 border rounded shadow">
            <div className="bg-blue-600 text-white p-2 rounded-t">
              <p className="font-semibold">Tariff Details</p>
            </div>
            <div className="p-2">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercas">
                  <tr>
                    <th scope="col" className="px-6 py-3">Call rates</th>
                    <th scope="col" className="px-6 py-3">Local(₹)</th>
                    <th scope="col" className="px-6 py-3">STD(₹)</th>
                    <th scope="col" className="px-6 py-3">SMS rates</th>
                    <th scope="col" className="px-6 py-3">Local(₹)</th>
                    <th scope="col" className="px-6 py-3">National(₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4">to asaap mobile</td>
                    <td className="px-6 py-4">0/min</td>
                    <td className="px-6 py-4">0/min</td>
                    <td className="px-6 py-4">local/national</td>
                    <td className="px-6 py-4">1/msg</td>
                    <td className="px-6 py-4">1.5/msg</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-6 py-4">to other mobile</td>
                    <td className="px-6 py-4">0/min</td>
                    <td className="px-6 py-4">0/min</td>
                    <td className="px-6 py-4">national roaming</td>
                    <td className="px-6 py-4">0.25/msg</td>
                    <td className="px-6 py-4">0.38/msg</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4">to landline</td>
                    <td className="px-6 py-4">0/min</td>
                    <td className="px-6 py-4">0/min</td>
                    <td className="px-6 py-4">international</td>
                    <td className="px-6 py-4">5/msg</td>
                    <td className="px-6 py-4">5/msg</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-6 py-4">to asaap cug</td>
                    <td className="px-6 py-4">0/min</td>
                    <td className="px-6 py-4">0/min</td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4">video call</td>
                    <td className="px-6 py-4">0.05/sec</td>
                    <td className="px-6 py-4">0.05/sec</td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4" colSpan="6">
                      For Roaming and ISD tariff details, visit http://localhost:3000 <br />
                      reduced rates@0.5p/10kb(50p/mb) are applicable for 3g/4g packs <br />
                      Data conversion : 1MB = 1,024KB ; 1GB=1,024MB/1,048,576KB
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <PDFDownloadLink
          document={<InvoicePdf invoiceData={invoiceData} />}
          fileName={`invoice-${invoiceData?.invoiceId}.pdf`}
          className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download as PDF")}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default InvoiceDetails;
