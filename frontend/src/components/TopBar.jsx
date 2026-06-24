import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <header className="fixed top-0 inset-x-0 transition-all duration-300 backdrop-blur-sm bg-gray-500/70 px-6 mx-5 rounded-full backdrop:backdrop-blur-5xl mt-5 z-100">
      <div className="flex items-center justify-between h-16">
        <div className="">
          <div className="flex items-center cursor-pointer gap-2">
            <img src="/tmp.png" alt="Logo" className="w-20 h-15" />
          </div>
        </div>

        {/* User avatar */}
        <div className="">
          <Link
            to={"/signup"}
            className="bg-blue-500 rounded-full text-white text-sm font-medium p-2 transition-all duration-600 cursor-pointer hover:bg-blue-600"
          >
            Sign Up
            <RiLogoutCircleRFill className="inline-block ml-1" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
