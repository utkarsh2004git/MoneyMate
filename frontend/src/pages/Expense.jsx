import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import toast, { ToastBar } from "react-hot-toast";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";
import ExpenseOverview from "../components/ExpenseOverview";
import ExpenseList from "../components/ExpenseList";

const Expense = () => {
  useUser();
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    if (loading) return;
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      // console.log(res);
      if (res.status === 200) {
        setExpenseData(res.data);
      }
    } catch (error) {
      console.error(
        "Failed fetching Expenses: ",
        error.response?.data?.message || "Failed to fetch Expenses",
      );
      toast.error(error.response?.data?.message || "Failed to fetch Expenses");
    }
  };

  // fetch categories for income
  const fetchExpenseCategories = async () => {
    try {
      const res = await axiosConfig.get(
        API_ENDPOINTS.GET_CATEGORY_BY_TYPE("expense"),
      );
      // console.log(res);
      if (res.status === 200) {
        setCategories(res.data);
      }
    } catch (error) {
      console.log(error);

      console.error(
        "Failed fetching Expense categories: ",
        error.response?.data?.message || "Failed to fetch Expense categories",
      );
      toast.error(
        error.response?.data?.message || "Failed to fetch Expense categories",
      );
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  // save income details

  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;
    console.log("Add expense", expense);

    // validation
    if (!name.trim()) {
      toast.error("Please enter name");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid");
      return;
    }
    if (!date) {
      toast.error("Please select date");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("Future date can't be selected");
      return;
    }
    if (!categoryId) {
      toast.error("Please select category");
      return;
    }

    try {
      const res = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      if (res.status === 201) {
        fetchExpenseDetails();
        fetchExpenseCategories();
        setOpenAddExpenseModal(false);
        toast.success("Income added succesfully");
      }
    } catch (error) {
      // console.log(error);

      console.error(
        "Failed adding expense: ",
        error.response?.data?.message || "Failed to add expense",
      );
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  };

  // delete expense details
  const deleteExpense = async (id) => {
    console.log("DELETE");

    try {
      const res = await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted succesfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Failed deleting expense: ",
        error.response?.data?.message || "Failed to delete expense",
      );
      toast.error(error.response?.data?.message || "Failed to delete expense");
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
        responseType: "blob",
      });

      let filename = "expense_details.xlsx";

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);

      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Download expense details successful");
    } catch (error) {
      console.error(
        "Failed downloading expense: ",
        error.response?.data?.message || "Failed to download expense",
      );
      toast.error(error.response?.data?.message || "Failed to download expense");
    }
  };

  const handleEmailExpenseDetails = async () => {
    // console.log("Email expense details");
    
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);

      toast.success("Expense details emailed successfully");
    } catch (error) {
      console.error(
        "Failed emailing expense: ",
        error.response?.data?.message || "Failed to email expense",
      );
      toast.error(error.response?.data?.message || "Failed to email expense");
    }
  };

  return (
    <div>
      <Dashboard activeMenu={"Expense"}>
        <div className="my-5 mx-auto grid-cols-1 gap-6 ">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">All Expenses</h2>
            <button
              onClick={() => setOpenAddExpenseModal(true)}
              className="hover:bg-blue-600 cursor-pointer rounded-md bg-blue-500 text-white duration-200  p-2 flex items-center gap-1"
            >
              <Plus size={15} />
              Add Expense
            </button>
          </div>

          {/* Expense Overview  */}

          <ExpenseOverview  transactions={expenseData} />

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
            isExpense={true}
          />
        </div>
        {/* Add expense modal   */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title={"Add Expense"}
        >
          <AddIncomeForm
            onAddIncome={handleAddExpense}
            categories={categories}
          />
        </Modal>

        {/* Delete expense modal   */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title={"Delete Expense"}
        >
          <DeleteAlert
            content={"Are you sure want to delete this expense details?"}
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </Dashboard>
    </div>
  );
};

export default Expense;
