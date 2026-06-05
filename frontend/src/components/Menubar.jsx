import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X } from "lucide-react";
import { assets } from "../assets/assets";
import Sidebar from "./Sidebar";

const Menubar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef(null);
  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowDropDown(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setShowDropDown(false);
      }
    };
    if (showDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropDown]);

  return (
    <div>
      <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-2xl-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
        {/* Left side menu button and title */}
        <div className="flex items-center gap-5 ">
          <button
            onClick={() => setOpenSideMenu(!openSideMenu)}
            className="cursor-pointer block lg:hidden text-black hover:bg-color-gray-100 p-1 rounded transition-colors"
          >
            {openSideMenu ? <X /> : <Menu />}
          </button>
          <div className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className="h-10 w-10" />
            <span className="text-lg font-medium text-balance truncate select-none">
              MoneyMate
            </span>
          </div>
        </div>

        {/* Right side - profile pic  */}
        <div className="relative" ref={dropDownRef}>
          <button
            onClick={() => setShowDropDown(!showDropDown)}
            className="flex cursor-pointer items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
          >
            <User className="text-blue-500 " />
          </button>

          {/* dropdown */}

          {showDropDown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-100 ">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0 ">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {user.fullName}
                    </p>
                    <p className="text-xs  text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* dropdown options  */}
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="cursor-pointer flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 transition-colors duration-150 "
                >
                  <LogOut className="w-4 h-4 text-gray-500" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile side menu  */}
        {openSideMenu && (
          <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-18.25">
            <Sidebar activeMenu={activeMenu} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Menubar;
