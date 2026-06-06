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

const Income = () => {
  useUser();
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      // console.log(res);
      if (res.status === 200) {
        setIncomeData(res.data);
      }
    } catch (error) {
      console.error(
        "Failed fetching incomes: ",
        error.response?.data?.message || "Failed to fetch Incomes",
      );
      toast.error(error.response?.data?.message || "Failed to fetch Incomes");
    }
  };

  // fetch categories for income
  const fetchIncomeCategories = async () => {
    try {
      const res = await axiosConfig.get(
        API_ENDPOINTS.GET_CATEGORY_BY_TYPE("income"),
      );
      // console.log(res);
      if (res.status === 200) {
        setCategories(res.data);
      }
    } catch (error) {
      console.log(error);

      console.error(
        "Failed fetching income categories: ",
        error.response?.data?.message || "Failed to fetch Income categories",
      );
      toast.error(
        error.response?.data?.message || "Failed to fetch Income categories",
      );
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  // save income details

  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;
    console.log("Add income", income);

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
      const res = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });
      if (res.status === 201) {
        fetchIncomeDetails();
        fetchIncomeCategories();
        setOpenAddIncomeModal(false);
        toast.success("Income added succesfully");
      }
    } catch (error) {
      // console.log(error);

      console.error(
        "Failed adding income: ",
        error.response?.data?.message || "Failed to add income",
      );
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  // delete income details
  const deleteIncome = async (id) => {
    console.log("DELETE");

    try {
      const res = await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted succesfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Failed deleting income: ",
        error.response?.data?.message || "Failed to delete income",
      );
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      // FIX 1: Add responseType: 'blob' so Axios knows it's a binary file, not JSON
      const res = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {
        responseType: "blob",
      });

      let filename = "income_details.xlsx";

      // Create a Blob from the response data
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);

      // FIX 2: Actually trigger the download by clicking the link!
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Download income details successful");
    } catch (error) {
      console.error(
        "Failed downloading income: ",
        error.response?.data?.message || "Failed to download income",
      );
      toast.error(error.response?.data?.message || "Failed to download income");
    }
  };

  
  const handleEmailIncomeDetails = async () => {
    console.log("Email income details");
  };

  return (
    <div>
      <Dashboard activeMenu={"Income"}>
        <div className="my-5 mx-auto grid-cols-1 gap-6 ">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">All Incomes</h2>
            <button
              onClick={() => setOpenAddIncomeModal(true)}
              className="hover:bg-blue-600 cursor-pointer rounded-md bg-blue-500 text-white duration-200  p-2 flex items-center gap-1"
            >
              <Plus size={15} />
              Add Income
            </button>
          </div>

          {/* Income Overview  */}

          <IncomeOverview transactions={incomeData} />

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
            onEmail={handleEmailIncomeDetails}
          />
        </div>
        {/* Add income modal   */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title={"Add Income"}
        >
          <AddIncomeForm
            onAddIncome={handleAddIncome}
            categories={categories}
          />
        </Modal>

        {/* Delete income modal   */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title={"Delete Income"}
        >
          <DeleteAlert
            content={"Are you sure want to delete this income details?"}
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </Dashboard>
    </div>
  );
};

export default Income;
