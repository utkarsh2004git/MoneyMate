import React, { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util";
import CustomLineChart from "./CustomLineChart";



const IncomeOverview = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions || []);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div>
        <h5 className="text-lg font-semibold">Income Overview</h5>

        <p className="text-xs text-gray-400 mt-1">
          Track your earnings over time and analyze your income trends.
        </p>
      </div>

      <div className="mt-6 h-[320px]">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;