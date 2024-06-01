import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const TransactionDetails = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleStartPage, setVisibleStartPage] = useState(1);
  const transactionsPerPage = 5; // Number of transactions per page
  const pagesPerSet = 5; // Number of pages per set

  const { transactionId } = useParams();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:8102/transaction/userid/1");
        const sortedTransactions = response.data.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
        setTransactions(sortedTransactions);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const convertToIST = (timestamp) => {
    if (!timestamp) return "";

    const utcDate = new Date(timestamp);
    const istDate = toZonedTime(utcDate, "Asia/Kolkata");

    const formattedDate = format(istDate, "yyyy-MM-dd");
    return formattedDate;
  };

  const convertToISTwithtime = (timestamp) => {
    if (!timestamp) return "";

    const utcDate = new Date(timestamp);
    const istDate = toZonedTime(utcDate, "Asia/Kolkata");

    const formattedDate = format(istDate, "yyyy-MM-dd HH:MM:SS");
    return formattedDate;
  };

  // Get current transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-white justify-center items-center">
      <div className="flex flex-col flex-grow p-4 max-w-4xl w-full">
        <main className="bg-white rounded-lg p-6 mt-1 w-full h-full"> {/* Reduced top margin */}
          <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>
          <div className="space-y-4">
            {currentTransactions.map((tx) => {
              const timestamp = convertToIST(tx.timeStamp);

              return (
                <div
                  key={tx.transactionId}
                  className="bg-gray-100 p-4 rounded-md cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg hover:shadow-blue-100"
                  onClick={() => setSelectedTransaction(tx)}
                >
                  <div className="flex justify-between items-center">
                    <span>
                      <div> <h3 className="text-lg font-bold">Date: {convertToIST(timestamp)}</h3>
                        <p>Paid Rs.{tx.planPrice}</p>
                        </div>
                    </span>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <nav>
              <div className="flex">
                {renderPageNumbers()}
              </div>
            </nav>
          </div>
          {selectedTransaction && (
            <div className="fixed inset-0 flex items-center justify-center z-10">
              <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md transform transition-transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500">
                <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
                <p>Details for Rs.{selectedTransaction.planPrice}</p>
                <ul>
                  <li>Status: {selectedTransaction.transactionStatus}</li>
                  <li>Purchase Mode: {selectedTransaction.paymentMode}</li>
                  <li>Transaction Date: {convertToISTwithtime(selectedTransaction.timeStamp)}</li>
                </ul>
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
                  onClick={() => setSelectedTransaction(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TransactionDetails;
