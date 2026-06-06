import { Download, Key, Mail } from "lucide-react";
import React from "react";
import TransactionalInfoCard from "./TransactionalInfoCard";
import moment from "moment"
const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {

  return (
    <div className="bg-white  p-4">
      <div className="flex w-full  items-center justify-between">
        <h5 className="text-lg font-semibold">Income Sources</h5>
      <div className="flex items-center justify-end gap-2">
        <button onClick={onEmail} className="flex  cursor-pointer hover:bg-blue-200/40 justify-center items-center rounded-md gap-2 p-1 px-2 bg-gray-200/40 hover:text-blue-800">
          <Mail size={15} className="text-base" />
          <span className="hidden sm:block ">Email</span>
        </button>
        <button onClick={onDownload} className="flex cursor-pointer hover:bg-green-200/40  justify-center items-center rounded-md gap-2 p-1 px-2 bg-gray-200/40 hover:text-green-800">
          <Download size={15} className="text-base " />
          <span className="hidden sm:block ">Download</span>
        </button>
      </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Display the incomes  */}
        {transactions?.map((income)=>(
            <TransactionalInfoCard
            key={income.id}
            title={income.name}
            date={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            icon={income.icon}
            type={"income"}
            onDelete={()=>onDelete(income.id)}
            />
        ))

        }

      </div>
    </div>
  );
};

export default IncomeList;
