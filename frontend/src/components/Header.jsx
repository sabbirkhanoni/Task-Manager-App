import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="flex items-center justify-between px-5 bg-[#4d6be2] border-b shrink-0 z-30">
      <div className="flex items-center gap-3">
        <div className="flex items-center cursor-pointer gap-2">
          <img src="/tmp.png" alt="Logo" className="w-20 h-15" />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* User avatar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="    bg-red-300 hover:bg-red-500 hover:text-white border border-red-500/30 hover:border-red-500/50
                           text-red-900 text-sm font-medium rounded-lg p-2 transition-all duration-600 cursor-pointer"
          >
            Sign out
            <RiLogoutCircleRFill className="inline-block ml-1" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;