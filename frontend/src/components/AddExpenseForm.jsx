import React, { useEffect, useState } from "react";
import EmojiPickerPopUp from "./EmojiPickerPopUp";
import InputField from "./InputField";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm = ({ onAddExpense, categories }) => {
  // console.log(categories)
  const [loading, setLoading] = useState(false);
  const [expense, setExpense] = useState({
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

  const handleAddExpense = async () => {
    setLoading(true);
    try {
      await onAddExpense(expense);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, val) => {
    setExpense({ ...expense, [key]: val });
  };

  useEffect(()=>{
    if(categories.length>0 && !expense.categoryId){
      setExpense((prev)=>({...prev, categoryId:categories[0].id}))
    }
  },[categories,expense.categoryId]);

  return (
    <div>
      <EmojiPickerPopUp
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <InputField
        label="expense Source"
        type="text"
        name="type"
        value={expense.name}
        onChange={({ target }) => handleChange("name", target.value)}
        placeholder="e.g., Salary, Rent, Bonus"
        required
      />

      <InputField
        label="Category"
        name="categoryId"
        type="text"
        value={expense.categoryId}
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
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        placeholder="e.g., 500.00"
        required
      />
      <InputField
        label="Date"
        type="date"
        name="date"
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        required
      />

      <div className="flex justify-end mt-6">
        <button
          className={` p-2 px-3 hover:bg-blue-600 cursor-pointer rounded-md bg-blue-500 duration-200 text-white`}
          onClick={handleAddExpense}
          disabled={loading}
        >
          {loading ? (
            <>
              Adding...
              <LoaderCircle className=" h-4 w-4 animate-spin" />
            </>
          ) : (
            <>Add Expense</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
