import React from 'react';
import { Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full  bg-white bg-opacity-90 backdrop-blur-md fixed top-0 z-50 border-b border-slate-200">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Area */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="sm:p-1.5  rounded-lg">
            <img src={assets.logo} alt="logo" className="h-6  w-6 sm:h-10 sm:w-10" />
          </div>
          <span className="text-sm sm:text-xl font-bold select-none text-slate-800">MoneyMate</span>
        </div>

        {/* Navigation / Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="text-sm font-medium cursor-pointer bg-blue-200/40 justify-center items-center rounded-md gap-2 py-1 px-2 sm:py-2  sm:px-3 hover:text-blue-900 duration-200 hover:bg-blue-200/60 text-blue-800"
          >
            Log In
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="text-sm font-medium cursor-pointer hover:shadow-blue-600 bg-blue-600 text-white  py-1 px-2  sm:px-3 sm:py-2 rounded-md  hover:bg-blue-700 transition-colors shadow-sm"
          >
            Get Started
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;