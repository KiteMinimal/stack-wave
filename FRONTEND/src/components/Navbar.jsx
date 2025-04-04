import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-8 border-t-2 border-orange-500 border-b p-1 bg-white shadow-md">
      <div className="w-36 h-12 flex items-center">
        <img src="logo.png" alt="StackWave Logo" />
      </div>
      <nav className="flex items-center gap-8">
        {["About", "Product", "OverflowAI"].map((item) => (
          <h4 key={item}>{item}</h4>
        ))}
        <input
          className="border border-black rounded-md p-2 h-10 w-96 ml-12"
          type="text"
          placeholder="Search"
        />
      </nav>
      <div className="flex items-center gap-4 ml-auto mr-3">
        <button
          onClick={() => navigate("/login")}
          className="text-blue-600 border border-blue-600 rounded-md h-10 w-20 hover:bg-blue-600 hover:text-white  transition duration-200"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-600 text-white rounded-md h-10 w-20 hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border-[1px] transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
