import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import InputField from "../components/InputField.jsx";
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast"
import {LoaderCircle} from "lucide-react"

const Signup = () => {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setError(null);

    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter valid email.");
      return;
    }

    // signup api call
    try {
        setLoading(true);
        console.log("Signup data prepared for backend:", { fullName, email, password });

        const response = await axiosConfig.post(API_ENDPOINTS.REGISTER,{
            fullName,
            email,
            password
        })
        console.log(response);
        

        if(response.status === 201){
            toast.success("Profile created succesfully.")
            toast.success("Profile activation email sent to registered email.")
        }

      
      // navigate("/login");
    } catch (err) {
        console.log("Error response:", err.response?.data);

        setError(
            err.response?.data?.message ||
            "An error occurred during signup."
        );
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img
        src={assets.bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />
      
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Create an Account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Start tracking your spending by joining with us.
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
            
            {/* Reusable Input Fields */}
            <InputField
              label="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="John Doe"
              required
            />

            <InputField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              className={`w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mt-2 cursor-pointer flex items-center justify-center gap-2 ${loading?'opacity-60 cursor-not-allowed ':''}`}
              disabled={loading}
            >
              {loading?(
                    <>
                    Signing Up...
                    <LoaderCircle className="animate-spin w-5 h-5" />
                    </>
                ):(
                    "Sign Up"
                )
              }
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <button 
              onClick={() => navigate("/login")}
              className="text-blue-600 font-medium hover:underline focus:outline-none cursor-pointer"
            >
              Log in
            </button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;