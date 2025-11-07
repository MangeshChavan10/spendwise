import { useState } from 'react'
import './App.css'
import HomePage from './pages/public/HomePage'
import {Routes,Route} from 'react-router-dom';
import DashBoard from './pages/public/DashBoard';
import FeedBack from './pages/public/FeedBack';
import Subscription from './pages/public/Subscription';
import Categories from './pages/public/Categories';
import Left from './pages/public/Left';
import Chart from './pages/public/Chart';
import MainLayout from './pages/public/MainLayout';
import AddTransaction from './pages/public/AddTransaction';
import Login from './pages/auth/Login';
import RegisterUser from './pages/auth/RegisterUser';
import { Toaster } from "react-hot-toast";
import Profile from './pages/public/Profile';
import NotFound from './pages/public/NotFound';
import AddSubscription from './pages/public/AddSubscription';

function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path={"/"} element={<MainLayout/>}>
          
          <Route path={"/dashboard"} element={<DashBoard/>}/>
          <Route path={"/subscription"} element={<Subscription/>}/>
          <Route path={"/categories"} element={<Categories/>}/>
          <Route path={"/chart"} element={<Chart/>}/>
          <Route path={"/addTransaction"} element={<AddTransaction/>}/>
          <Route path={"/addSubscription"} element={<AddSubscription/>}/>
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/registerUser" element={<RegisterUser/>} />
          <Route path="/me" element={<Profile/>}/>
          <Route path="/feedback" element={<FeedBack/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
  </div>
  )
}

export default App
