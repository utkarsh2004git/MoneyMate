import React from "react";
import { addThousandsSeparator } from "../util/util";
import CustomPieChart from "./CustomPieChart";

const FinanceOverview = ({ totalBalance, totalIncomes, TotalExpenses }) => {
  const COLORS = ["#3B82F6", "#EF4444", "#22C55E"];
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: TotalExpenses },
    { name: "Total Incomes", amount: totalIncomes },
  ];
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>
      <CustomPieChart
        data={balanceData}
        label={"Total Balance"}
        totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
        colors={COLORS}
        showTextAnchor={true}
      />
    </div>
  );
};

export default FinanceOverview;
