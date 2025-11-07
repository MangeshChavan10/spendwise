import React from 'react';
import { ArrowRight, Menu, Bell, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function handleLogout(){
    localStorage.removeItem("token");
    navigate("/login")
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-20 flex justify-between items-center px-8 z-50 backdrop-blur-xl bg-neutral-900/80 border-b border-neutral-800/50">
      

      <div className="flex groupcursor-pointer items-center gap-3">
        <div className="w-10  h-10 bg-linear-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
          <span className="text-white font-bold text-xl">🤑</span>
        </div>
        <span className="text-white cursor-pointer group-hover:scale-105   font-bold text-xl">SpendWise</span>
      </div>

      <div className="flex items-center gap-4">


        {token ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/me")}
              className="flex active:scale-90 transition-active duration-200 cursor-pointer items-center gap-2 bg-neutral-800 text-white py-2 px-5 rounded-xl hover:bg-neutral-700 transition-all"
            >
              <User className="w-4 h-4" />
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="flex active:scale-90 transition-active duration-200 cursor-pointer items-center gap-2 bg-neutral-800 text-white py-2 px-4 rounded-xl hover:bg-neutral-700 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/registerUser")}
            className="group relative bg-linear-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold cursor-pointer overflow-hidden transition-all duration-300  hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        )}

        <button className="p-2 rounded-lg hover:bg-neutral-800 transition-colors sm:hidden">
          <Menu className="w-5 h-5 text-neutral-400" />
        </button>
      </div>

    </div>
  );
};

export default NavBar;