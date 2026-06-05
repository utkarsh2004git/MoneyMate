import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import InputField from "../components/InputField.jsx";
import {LoaderCircle} from "lucide-react"
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setError(null);
    
    // Basic frontend validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter valid email.");
      return;
    }
    

    try {
      setLoading(true);
      console.log("Login credentials ready for backend:", { email, password });
      
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN,{
          email,
          password
      })
      // console.log(response);
      
      const {token, user} = response.data;
      if(token){
        localStorage.setItem("token",token);
        setUser(user);
        navigate("/dashboard");
      }

    } catch (err) {
        console.log(err);
        console.log("Error response:", err.response?.data);

        setError(
            err.response?.data?.message ||
            "An error occurred during login."
        );
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background image with blur to match Signup */}
      <img
        src={assets.bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />
      
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Log in to continue tracking your expenses.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Reusable Input Fields */}
            <InputField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <div>
              <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
              {/* Optional: Forgot Password Link */}
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  className="text-xs cursor-pointer text-blue-600 hover:underline focus:outline-none"
                  onClick={() => console.log("Navigate to Forgot Password")}
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-md">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mt-2 cursor-pointer flex items-center justify-center gap-2 ${loading?'opacity-60 cursor-not-allowed ':''}`}
              disabled={loading}
            >
              {loading?(
                    <>
                    Logging In...
                    <LoaderCircle className="animate-spin w-5 h-5" />
                    </>
                ):(
                    "Log In"
                )
              }
            </button>
          </form>

          {/* Navigation to Signup */}
          <p className="mt-6  text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <button 
              onClick={() => navigate("/signup")}
              className="text-blue-600 cursor-pointer font-medium hover:underline focus:outline-none"
            >
              Sign up
            </button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;