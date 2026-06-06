import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import InfoCard from "../components/InfoCard";
import { Coins, Wallet, WalletCards } from "lucide-react";
import { addThousandsSeparator } from "../util/util";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { toast } from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";

const Home = () => {
  useUser();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      // console.log(res.data);
      setDashboardData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <Dashboard activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<WalletCards />}
            color="bg-blue-500"
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
          />

          <InfoCard
            icon={<Wallet />}
            color="bg-green-500"
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncomes || 0)}
          />

          <InfoCard
            icon={<Coins />}
            color="bg-red-500"
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
          />
        </div>

        <div className="grid dgrid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Recent Transactions */}
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onMore={() => navigate("/income")}
          />
          {/* Finance Overview Chart */}
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance}
            totalIncomes={dashboardData?.totalIncomes}
            totalExpenses={dashboardData?.totalExpenses}
          />
          {/* Expense Transactions */}
          <Transactions
            title={"Recent Expenses"}
            transactions={dashboardData?.recent5Expenses || []}
            onMore={() => navigate("/expense")}
            type={"expense"}
          />
          {/* Income Transactions */}
          <Transactions
            title={"Recent Incomes"}
            transactions={dashboardData?.recent5Incomes || []}
            onMore={() => navigate("/income")}
            type={"income"}
          />
        </div>
      </div>
    </Dashboard>
  );
};

export default Home;
