import React from 'react'
import {ChartArea, Folder, LayoutDashboard, MessageSquare, Wallet} from 'lucide-react';
import { Link,NavLink, useNavigate } from 'react-router-dom';

const Left = () => {

  const navigate = useNavigate();
  return (
    <div className='h-screen'>

        <div className='p-10 mt-30'>

        <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block py-3 px-4 ${isActive ? "bg-linear-to-r from-blue-700 to-blue-600 hover:scale-102 rounded" : ""}`
            }
        >
                <div className='flex w-fit cursor-pointer gap-5 text-xl text-white'>
                    <LayoutDashboard color='white' size={24} />
                    <h3>Dashboard</h3>
                </div>
          </NavLink>

        <NavLink
            to="/chart"
            className={({ isActive }) =>
              `block w-fit py-3 px-4 pr-15  mt-5 ${ isActive ? "bg-neutral-700" : "" }`
            }
        >
                <div className='flex cursor-pointer gap-5 text-xl text-white'>
                  <ChartArea color='white' size={24} />
                  <h3>Chart</h3>
              </div>
        </NavLink>


          <div>
            <div onClick={()=>{navigate("/feedback")}} className='flex w-fit gap-5 cursor-pointer items-center text-l mt-100 text-white'>
              <MessageSquare color="white" size={20} />
              <h3>Give Feedback</h3>
            </div>
          </div>
          

        </div>
    </div>
  )
}

export default Left
