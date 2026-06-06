import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  useUser();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModel, setOpenAddCategoryModel] = useState(false);
  const [openEditCategoryModel, setOpenEditCategoryModel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (res.status === 200) {
        // console.log("categories"+res.data);
        setCategoryData(res.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again.", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    // console.log("Category added succesfully.",category);
    const { name, type, icon } = category;

    if (!name.trim()) {
      toast.error("Category Name is required");
      return;
    }
    try {
      setLoading(true);
      const res = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name,
        type,
        icon,
      });
      console.log(res);

      if (res.status === 201) {
        toast.success("Category added successfully");
        setOpenAddCategoryModel(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Error adding category: ", error.message);
      toast.error(error.response?.data?.message || "Failed to add Category");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (categoryToEdit) => {
    // console.log(category);
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModel(true);
  };
  const handleUpdateCategory = async(updatedCategory) => {
    // console.log("Updating category",updatedCategory);
    const {id,name,type,icon} = updatedCategory;
    if(!name.trim()){
      toast.error("Category Name is required.");
      return;
    }
    if(!name.trim()){
      toast.error("Category id is missing for update.");
      return;
    }

    try {
      const res = await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id),{name,type,icon});
      console.log(res);
      if(res.status===200){
        setOpenEditCategoryModel(false);
        setSelectedCategory(null);
        fetchCategoryDetails();
        toast.success("Category updated succesfully")
      }
      
    } catch (error) {
      console.error("Failed updating category: ",error?.response.data?.message || "Failed to update Category")
      toast.error(error?.response.data?.message || "Failed to update Category")
    }

  };

  return (
    <div>
      <Dashboard activeMenu={"Category"}>
        <div className="my-5 mx-auto">
          {/* Add category button */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">All Categories</h2>
            <button
              onClick={() => setOpenAddCategoryModel(true)}
              className="rounded-md font-semibold cursor-pointer bg-green-200 text-green-800 duration-200  p-2 flex items-center gap-1"
            >
              <Plus size={15} />
              Add Category
            </button>
          </div>

          {/* Category list */}
          <CategoryList
            categories={categoryData}
            onEditCategory={handleEditCategory}
          />

          {/* Adding category modal */}
          <Modal
            title={"Add Category"}
            isOpen={openAddCategoryModel}
            onClose={() => setOpenAddCategoryModel(false)}
          >
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </Modal>

          {/* Updating category model */}
          <Modal
            title={"Update Category"}
            isOpen={openEditCategoryModel}
            onClose={() => {
              setOpenEditCategoryModel(false);
              setSelectedCategory(null);
            }}
          >
            <AddCategoryForm
              initialCategoryData={selectedCategory}
              onAddCategory={handleUpdateCategory}
              isEditing={true}
            />
          </Modal>
        </div>
      </Dashboard>
    </div>
  );
};

export default Category;
