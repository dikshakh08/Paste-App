import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 text-white bg-blue-950 p-2 mb-7 items-center justify-center'>
         <NavLink className={({ isActive }) =>
         isActive
       
      ? "text-blue-500 font-bold"
      : "text-white"
  }
         to="/"  >
            Home
         </NavLink>
         <NavLink className={({ isActive }) =>
          isActive
      ? "text-blue-500 font-bold"
      : "text-white"
  }
         to="/pastes" >
           Pastes
         </NavLink>
    </div>
  )
}

export default Navbar