import React, { useEffect, useState } from "react";
import EmojiPickerPopUp from "./EmojiPickerPopUp";
import InputField from "./InputField";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm = ({ onAddIncome, categories }) => {
  // console.log(categories)
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });
  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const handleAddIncome = async () => {
    setLoading(true);
    try {
      await onAddIncome(income);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, val) => {
    setIncome({ ...income, [key]: val });
  };

  useEffect(() => {
    if (categories.length > 0 && !income.categoryId) {
      setIncome((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, income.categoryId]);

  return (
    <div>
      <EmojiPickerPopUp
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <InputField
        label="Income Source"
        type="text"
        name="type"
        value={income.name}
        onChange={({ target }) => handleChange("name", target.value)}
        placeholder="e.g., Salary, Rent, Bonus"
        required
      />

      <InputField
        label="Category"
        name="categoryId"
        type="text"
        value={income.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        placeholder="e.g., Salary, Rent, Bonus"
        isSelect={true}
        options={categoryOptions}
        required
      />
      <InputField
        label="Amount"
        type="number"
        name="amount"
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        placeholder="e.g., 500.00"
        required
      />
      <InputField
        label="Date"
        type="date"
        name="date"
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        required
      />

      <div className="flex justify-end mt-6">
        <button
          className={` p-2 px-3 flex gap-2 justify-center items-center hover:bg-blue-600 cursor-pointer rounded-md bg-blue-500 duration-200 text-white`}
          onClick={handleAddIncome}
          disabled={loading}
        >
          {loading ? (
            <>

                <span>Adding...</span>
                <LoaderCircle className=" h-4 w-4 animate-spin" />

            </>
          ) : (
            <>Add Income</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
