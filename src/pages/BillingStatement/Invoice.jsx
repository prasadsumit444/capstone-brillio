import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(5); // Number of invoices per page
  const [visibleStartPage, setVisibleStartPage] = useState(1); // Track the starting page of the visible range
  const pagesPerSet = 5; // Number of pages per set
  const navigate = useNavigate();
  const userId = 1; // Replace with dynamic user ID if needed

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:8102/transaction/invoice/userid/${userId}`);
      // Sort invoices by startDate in descending order
      const sortedInvoices = result.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      setInvoices(sortedInvoices);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const convertToIST = (timestamp) => {
    if (!timestamp) return "";

    const utcDate = new Date(timestamp);
    const istDate = toZonedTime(utcDate, "Asia/Kolkata");

    const formattedDate = format(istDate, "yyyy-MM-dd");
    return formattedDate;
  };

  // Get current invoices
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(invoices.length / invoicesPerPage);

  // Change visible start page and current page
  const nextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      if (newPage > visibleStartPage + pagesPerSet - 1) {
        setVisibleStartPage(visibleStartPage + 1);
      }
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      if (newPage < visibleStartPage) {
        setVisibleStartPage(visibleStartPage - 1);
      }
    }
  };

  // Display pagination buttons
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const endPage = Math.min(visibleStartPage + pagesPerSet - 1, totalPages);

    if (currentPage > 1) {
      pageNumbers.push(
        <button
          key="prev"
          className="mx-1 px-3 py-1 rounded-md border"
          onClick={prevPage}
        >
          Previous
        </button>
      );
    }

    for (let i = visibleStartPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`mx-1 px-3 py-1 rounded-md border ${currentPage === i ? 'bg-blue-600 text-white' : ''}`}
          onClick={() => paginate(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      pageNumbers.push(
        <button
          key="next"
          className="mx-1 px-3 py-1 rounded-md border"
          onClick={nextPage}
        >
          Next
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex min-h-screen bg-white justify-center items-center">
      <div className="flex flex-col flex-grow p-4 max-w-4xl">
        <main className="bg-white rounded-lg p-6 mt-1 w-full">
          <h1 className="text-2xl font-bold mb-4">Invoices</h1>
          <div className="space-y-4">
            {currentInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="bg-gray-100 p-4 rounded-md cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg hover:shadow-blue-100"
                onClick={() => navigate(`/invoice/${invoice.invoiceId}`)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">Date: {convertToIST(invoice.startDate)}</h3>
                    <p>Amount: ₹{invoice.billAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <nav>
              <div className="flex">
                {renderPageNumbers()}
              </div>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Invoices;
