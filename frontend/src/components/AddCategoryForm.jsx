import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import EmojiPickerPopUp from "./EmojiPickerPopUp";
import { LoaderCircle, LoaderCircleIcon } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });
  const categorytypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];


  useEffect(()=>{
    if (isEditing && initialCategoryData){
      setCategory(initialCategoryData);
    } else {
      setCategory({name:"",type:"income",icon:""})
    }
  },[isEditing,initialCategoryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
    // console.log(category);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onAddCategory(category);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 ">
      <EmojiPickerPopUp
        icon={category.icon}
        onSelect={(selectedIcon) =>
          setCategory((prev) => ({ ...prev, icon: selectedIcon }))
        }
      />

      <InputField
        label="Category Name"
        type="text"
        name="name"
        value={category.name}
        onChange={handleChange}
        placeholder="e.g., Salary, Rent, Bonus"
        required
      />

      <InputField
        label="Category Type"
        type="text"
        name="type"
        value={category.type}
        onChange={handleChange}
        placeholder="e.g., Salary, Rent, Bonus"
        isSelect={true}
        options={categorytypeOptions}
        required
      />
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={loading}
          className={` p-2 px-3  cursor-pointer rounded-md bg-green-500 text-white`}
          onClick={handleSubmit}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2 cursor-not-allowed">
              {isEditing?"Updating...":"Adding..."}
              <LoaderCircle className="h-4 w-4 animate-spin" />
            </span>
          ) : (
            <>
            {isEditing?"Update Category":"Add Category"}
            
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
