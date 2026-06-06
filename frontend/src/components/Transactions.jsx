import { ArrowRight } from "lucide-react";
import React from "react";
import TransactionalInfoCard from "./TransactionalInfoCard";
import moment from "moment";

const Transactions = ({ transactions, onMore, type, title }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{title}</h5>
        <button
          className="flex gap-2 justify-center items-center px-2 py-1 bg-blue-500 hover:bg-blue-600 duration-200 text-white rounded-md  cursor-pointer"
          onClick={onMore}
        >
          More <ArrowRight className="text-base" size={15} />
        </button>
      </div>
      <div className="mt-6">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <h1 className="text-lg font-semibold">No transactions yet</h1>
            <p className="mt-2 text-sm">
              Your recent transactions will appear here once you start adding
              them.
            </p>
          </div>
        ) : (
          <>
            {transactions.slice(0, 5).map((t) => (
              <TransactionalInfoCard
                key={t.id}
                title={t.name}
                icon={t.icon}
                date={moment(t.date).format("Do MMM YYYY")}
                amount={t.amount}
                type={type}
                hideDeleteBtn={true}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;
