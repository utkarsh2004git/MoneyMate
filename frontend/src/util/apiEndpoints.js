export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const CLOUDINARY_CLOUD_NAME=import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY=import.meta.env.VITE_CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET=import.meta.env.VITE_CLOUDINARY_API_SECRET;

export const API_ENDPOINTS = {
    LOGIN : "/login",
    REGISTER : "/register",
    GET_USER_PROFILE : "/profile",
    GET_ALL_CATEGORIES : "/categories",
    ADD_CATEGORY : "/categories",
    GET_CATEGORY_BY_TYPE : (type)=>`/categories/${type}`,
    UPDATE_CATEGORY : (categoryId)=>`/categories/${categoryId}`,
    GET_ALL_INCOMES : "/incomes",
    ADD_INCOME : `/incomes`,
    DELETE_INCOME : (incomeId)=>`/incomes/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD :`/excel/download/income`,
    EMAIL_INCOME :`/email/income-excel`,
    UPLOAD_IMAGE:`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    
}