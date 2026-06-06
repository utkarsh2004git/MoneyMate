import { Download, Key, LoaderCircle, Mail } from "lucide-react";
import React, { useState } from "react";
import TransactionalInfoCard from "./TransactionalInfoCard";
import moment from "moment";
const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [emailLoading, setEmailLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const handleEmail = async () => {
    setEmailLoading(true);
    try {
      await onEmail();
    } finally {
      setEmailLoading(false);
    }
  };
  const handleDownload = async () => {
    setDownloadLoading(true);
    try {
      await onDownload();
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <div className="bg-white  p-4">
      <div className="flex w-full  items-center justify-between">
        <h5 className="text-lg font-semibold">Expense Sources</h5>
        <div className="flex items-center justify-end gap-2">
          <button
            disabled={emailLoading}
            onClick={handleEmail}
            className="flex  cursor-pointer hover:bg-blue-200/40 justify-center items-center rounded-md gap-2 p-1 px-2 bg-gray-200/40 hover:text-blue-800"
          >
            <Mail size={15} className="text-base" />
            {emailLoading ? (
              <>
                <span className="hidden sm:block ">Emailing...</span>
                <LoaderCircle className="h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                <span className="hidden sm:block ">Email</span>
              </>
            )}
          </button>
          <button
            disabled={downloadLoading}
            onClick={handleDownload}
            className="flex cursor-pointer hover:bg-green-200/40  justify-center items-center rounded-md gap-2 p-1 px-2 bg-gray-200/40 hover:text-green-800"
          >
            <Download size={15} className="text-base " />
            {downloadLoading ? (
              <>
                <span className="hidden sm:block ">Downloading...</span>
                <LoaderCircle className="h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                <span className="hidden sm:block ">Download</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Display the incomes  */}
        {transactions?.map((expense) => (
          <TransactionalInfoCard
            key={expense.id}
            title={expense.name}
            date={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            icon={expense.icon}
            type={"expense"}
            onDelete={() => onDelete(expense.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
