import React from 'react'
import NavBar from '../../components/NavBar'
import FeedBack from './FeedBack';
import DashBoard from './DashBoard';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='h-screen w-full bg-linear-to-br from-neutral-900 to-neutral-800 text-white relative overflow-hidden'>

        <NavBar/>


        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-96 h-150 bg-blue-500 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-150 bg-purple-500 rounded-full blur-xl"></div>
        </div>

        <div className="flex font-dancing text-center absolute inset-0 items-center justify-center pt-16">
          <div className="space-y-10">
              <h3 className='text-5xl py-2 font-bold tracking-wide transform hover:scale-105 transition-transform duration-300'>
                No more fussy bills
              </h3>
              <h3 className='text-5xl py-2 font-bold tracking-wide bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300'>
                Spend Wisely
              </h3>
              <h3 className='text-5xl py-2 font-bold tracking-wide transform hover:scale-105 transition-transform duration-300'>
                Track it
              </h3>
              
            <button
            onClick={() => navigate("/registerUser")}
            className="group mx-auto relative bg-linear-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            <span className="relative text-xl z-10">Start Tracking</span>
          </button>
          </div>
        </div>

      <div className='absolute top-30 left-12 transform hover:scale-110 transition-transform duration-500'>
        <img className='h-80 drop-shadow-2xl' src="/home.png" alt="" />
      </div>

      <div className='absolute top-110 right-12 transform hover:scale-110 transition-transform duration-500'>
        <img className='h-80 drop-shadow-2xl' src="/home2.png" alt="" />
      </div>

      <div className='absolute top-50 right-120 transform hover:scale-110 transition-transform duration-500'>
        <span className='text-6xl'>💸</span>
      </div>

      <div className='absolute top-120 right-120 transform hover:scale-110 transition-transform duration-500'>
        <span className='text-6xl'>💰</span>
      </div>

      <div className='absolute top-130 left-100 transform hover:scale-110 transition-transform duration-500'>
        <span className='text-6xl'>🧾</span>
      </div>
      

    </div>
  )
}

export default HomePage