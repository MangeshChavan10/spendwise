import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import api from "../../api/axios";
import toast from 'react-hot-toast';
const RegisterUser = () => {
  const navigate = useNavigate();
  const [isFocused,setFocused] = useState(false);
  const [passwordFocused,setPasswordFocused] = useState(false);
  const [confirmPasswordFocused,setConfirmPasswordFocused] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  
  async function handleRegister() {
    try{
      const res = await api.post("/user/signup",{email,password});
      toast.success("Registration successfull");
      navigate("/login")
    } catch (err) {
      console.error("Error:", err);
    const msg = err.response?.data?.msg || "Registration failed";
    toast.error(msg);
    }
  }

  return (
   <div className='bg-neutral-800 h-screen w-full text-white '>
      <div className='flex fixed inset-0 items-center justify-center'>
        <div className=' shadow-2xl shadow-blue-500 p-6 rounded'>
        <h2 className='text-center text-2xl'>Sign up now to <i>unlock</i> the best way to  <br /> track your money </h2>

        <div >
          <input 
          onFocus={()=>{setFocused(true)}} 
          onBlur={()=>{setFocused(false)}} 
          onChange={(e)=>setEmail(e.target.value)}
          className={`block border-2 mt-5 w-full bg-neutral-900 py-3 pl-2 text-sm placeholder-neutral-500 outline-none ${isFocused ? "border-blue-500 shadow-lg" : "border-neutral-700"}`}
          type="text border-2 " 
          placeholder='Enter your Email' />

           <input 
          onFocus={()=>{setPasswordFocused(true)}} 
          onBlur={()=>{setPasswordFocused(false)}} 
          onChange={(e)=>setPassword(e.target.value)}
          className={`border-2 outline-none w-full bg-neutral-900 py-3 pl-2 text-sm placeholder-neutral-500 mt-5 ${passwordFocused ? "border-blue-500 shadow-lg" : "border-neutral-700"}`}
          type="password" 
          placeholder='Enter your Password' />

           <input 
          onFocus={()=>{setConfirmPasswordFocused(true)}} 
          onBlur={()=>{setConfirmPasswordFocused(false)}} 
          onChange={(e)=>setConfirmPassword(e.target.value)}
          className={`border-2 outline-none w-full bg-neutral-900 py-3 pl-2 text-sm placeholder-neutral-500 mt-5 ${confirmPasswordFocused ? "border-blue-500 shadow-lg" : "border-neutral-700"}`}
          type="password" 
          placeholder='Confirm Password' />

        </div>

          <div onClick={handleRegister} className='mt-10 flex justify-center'>
            <button className=" relative bg-linear-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 flex items-center gap-2">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-700"></div>
                <span  className="relative z-10">Get Started</span>     
              </button>
          </div>

          <div className='flex mt-4 gap-1'>
         <h3 className='text-xl' >already a user?</h3>
        <h3 onClick={()=>{navigate("/login")}} className='text-xl cursor-pointer text-blue-500'>Login</h3>
      </div>
      </div>
      
      </div>
       
   </div>
  )
}

export default RegisterUser;
