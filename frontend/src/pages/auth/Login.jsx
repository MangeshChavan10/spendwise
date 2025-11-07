import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../../api/axios"
import toast from "react-hot-toast"

const Login = () => {
  const navigate = useNavigate()
  const [isFocused, setFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  async function handleLogin() {
    try {
      const res = await api.post("/user/login", { email, password })
      console.log("Login Success:", res.data)
      toast.success("Login successfull!")

      localStorage.setItem("token", res.data.token)
      navigate("/dashboard")
    } catch (err) {
      console.error("Login Error:", err)
      if (err.response) {
        alert(err.response.data.msg || "Login failed!")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    }
  }

  return (
    <div className='bg-neutral-800 h-screen w-full text-white'>
      <div className='flex fixed shadow-2xl shadow-blue-500  inset-0 items-center justify-center'>
        <div className='shadow-2xl shadow-blue-500 h-100 w-70 p-6 rounded'>
          <h2 className='text-center text-2xl mb-4'>Log In</h2>

          <div>
            <input
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(e) => setEmail(e.target.value)}
              className={`block border-2 mt-5 w-full bg-neutral-900 py-3 pl-2 text-sm placeholder-neutral-500 outline-none ${isFocused ? "border-blue-500 shadow-lg" : "border-neutral-700"}`}
              type="email"
              placeholder='Enter your Email'
            />

            <input
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e)=>e.key === "Enter" && handleLogin()}
              className={`border-2 outline-none w-full bg-neutral-900 py-3 pl-2 text-sm placeholder-neutral-500 mt-5 ${passwordFocused ? "border-blue-500 shadow-lg" : "border-neutral-700"}`}
              type="password"
              placeholder='Enter your Password'
            />
          </div>

          <div className='mt-10 flex justify-center'>
            <button
              onClick={handleLogin}
              className="relative bg-linear-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 flex items-center gap-2"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-700"></div>
              <span className="relative z-10">Login</span>
            </button>
          </div>

          <div className='flex gap-2 mt-7'>
            <h3>New User?</h3>
            <h3 onClick={()=>{navigate("/registerUser")}} className='cursor-pointer text-blue-500'>Sign Up</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
