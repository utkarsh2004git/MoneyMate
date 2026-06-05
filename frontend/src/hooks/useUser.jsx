import { useContext, useEffect } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";


const useUser = () => {
    const {user,setUser,clearUser} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            return;
        }
        let isMounted = true;
        const fetchUserInfo = async ()=>{
            try {
                const res = await axiosConfig.get(API_ENDPOINTS.GET_USER_PROFILE);
                if(isMounted && res.data){
                    setUser(res.data);
                }
            } catch (error) {
                console.log("Failed to fetch user info.");
                if(isMounted){
                    clearUser();
                    navigate("/login");
                }
            }
        }
        fetchUserInfo();
        return ()=>{
            isMounted = false
        }
    })
}

export default useUser
