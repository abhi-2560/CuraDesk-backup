import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import {motion} from 'framer-motion'


const Navbar = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img onClick={() => navigate('/doctor-dashboard')} className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <div className="flex items-center gap-5 relative">
          {dToken || aToken ? (
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <img
                src={aToken?assets.admin_logo:assets.admin_logo}
                alt="profile"
                className="w-9 h-9 rounded-full border-2 border-blue-200 cursor-pointer"
              />
              
              {/* Dropdown */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 min-w-[180px] p-3 z-50"
                  >
                    <button
                      onClick={() => navigate("my-profile")}
                      className="w-full text-left px-3 py-2 font-medium text-black hover:text-blue-600 text-sm"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => navigate("my-appointments")}
                      className="w-full text-left px-3 py-2 font-medium text-black hover:text-blue-600 text-sm"
                    >
                      My Appointments
                    </button>
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 font-medium text-black hover:text-red-500 text-sm"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-md"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden focus:outline-none"
          >
            <img
              src={showMenu ? assets.cross_icon : assets.menu_icon}
              alt="menu"
              className="w-6"
            />
          </button>
        </div>

      {/* <button onClick={() => logout()} className='bg-blue-600 text-white text-sm px-10 py-2 rounded-full'>Logout</button> */}
    </div>
  )
}

export default Navbar