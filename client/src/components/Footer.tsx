import React from "react";
import logo from "../../public/icon.svg";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0f0f0f] text-gray-300 py-6 flex flex-col items-center">
      {/* Logo and Name */}
      <div className="flex items-center space-x-2 mb-3">
        <img src={logo} alt="Etheryo logo" className="w-8 h-8" />
        <h1 className="text-white text-lg font-semibold">Etheryo</h1>
      </div>

      {/* Links */}
      <div className="flex space-x-6 text-sm mb-3">
        <a href="#about" className="hover:text-white">About</a>
        <a href="#market" className="hover:text-white">Market</a>
        <a href="#exchange" className="hover:text-white">Exchange</a>
        <a href="#contact" className="hover:text-white">Contact</a>
      </div>

      {/* Divider */}
      <div className="w-4/5 h-[1px] bg-gray-600 mb-3"></div>

      {/* Copyright */}
      <p className="text-xs text-gray-400">
        © {year} Etheryo. Built by <span className="text-white">Sumanth Shetty's Team</span>.
      </p>
    </footer>
  );
};

export default Footer;
