import React from 'react';
import { Wallet} from 'lucide-react';
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { assets } from '../assets/assets';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand / Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-white">MoneyMate</span>
          </div>
          <p className="text-sm text-slate-400">
            &copy; {currentYear} MoneyMate. All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5">
          <a 
            href="https://github.com/utkarsh2004git" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 flex gap-1 border hover:bg-gray-300/20 rounded p-1 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            {/* <Github className="w-6 h-6" /> */}
            <FaGithubSquare className="w-6 h-6"/>
            <span>GitHub</span>
          </a>
          <a 
            href="https://linkedin.com/in/utkarsh-shahare" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 flex gap-1 border hover:bg-gray-300/20 rounded p-1 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-6 h-6"/>
            <span>LinkedIn</span>
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;