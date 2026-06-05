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
    UPLOAD_IMAGE:`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    
}