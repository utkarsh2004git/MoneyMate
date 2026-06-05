import { API_ENDPOINTS } from "./apiEndpoints";

const CLOUDINARY_UPLOAD_PRESET = "MoneyMate"

const uploadProfileImage = async (image)=>{
    const formData = new FormData();
    formData.append("file",image);
    formData.append("upload_preset",CLOUDINARY_UPLOAD_PRESET);

    try {
        const res = await fetch(API_ENDPOINTS.UPLOAD_IMAGE,{
            method:"POST",
            body:formData
        });
        if(!res.ok){
            const errData = await res.json();
            throw new Error(`Cloudinary upload failed: ${errData.error.message || res.statusText}`);
        }
        const data = await res.json();
        console.log("Image uploaded succesfully.",data);
        return data.secure_url;
        
    } catch (error) {
        console.error("Error uploading image",error);
        throw error;
    }

}

export default uploadProfileImage