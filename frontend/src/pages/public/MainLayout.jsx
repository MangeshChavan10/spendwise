import React from 'react'
import Left from './Left'
import { Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar'

const MainLayout = () => {
  return (
    <div className='relative flex bg-neutral-900'>
        <Left/>

        <div>
            <NavBar/>

        <div className=' mt-20 h-[80vh] w-[130vh]'>
            <Outlet/>
        </div>

        </div>
        
        
     </div>
  )
}

export default MainLayout
