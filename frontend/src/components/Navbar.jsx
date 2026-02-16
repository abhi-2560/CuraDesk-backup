// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';
// import SymptomFAB from './SymptomFAB';


// const Navbar = () => {

//   const navigate = useNavigate();
//   const [showMenu, setshowMenu] = useState(false)
//   const { token, setToken, userData } = useContext(AppContext)

//   const logout = () => {
//     localStorage.removeItem('token')
//     setToken(false)
//     navigate('/login')
//   }

//   return (

//     <div className='flex items-centre justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
//       <img onClick={() => { navigate('/') }} className='w-45 cursor pointer ' src={assets.logo} alt="" />
//       <ul className='hidden md:flex items-start gap-5 font-medium'>
//         <NavLink to='/'>
//           <li className='py-1 px-2 text-lg'>HOME</li>
//           <hr className='border-none outline-none h-0.5 bg-blue-800 w-auto m-auto hidden' />
//         </NavLink>
//         <NavLink to='/doctors'>
//           <li className='py-1 px-2 text-lg'>ALL DOCTORS</li>
//           <hr className='border-none outline-none h-0.5 bg-blue-800 w-auto m-auto hidden' />
//         </NavLink>
//         <NavLink to='/about'>
//           <li className='py-1 px-2 text-lg'>ABOUT</li>
//           <hr className='border-none outline-none h-0.5 bg-blue-800 w-auto m-auto hidden' />
//         </NavLink>
//         <NavLink to='contact'>
//           <li className='py-1 px-2 text-lg'>CONTACT</li>
//           <hr className='border-none outline-none h-0.5 bg-blue-800 w-auto m-auto hidden' />
//         </NavLink>
//         <NavLink to="symptom-checker">

//           <li className=" text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-red-500 py-1 px-2 text-lg">
//             AI SYMPTOM ANALYZER
//           </li>
//           <hr className="border-none outline-none h-0.5 bg-blue-800 w-auto m-auto hidden" />
//         </NavLink>
//       </ul>


//       {/* important logic for create account using token and added css*/}

//       <div className='flex items-center gap-4'>
//         {
//           // check if only token to be written or token && userData
//           token
//             ? <div className='flex items-center gap-2 cursor-pointer group relative'>
//               <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
//               <img className='w-2.5' src={assets.dropdown_icon} alt="" />
//               <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
//                 <div className='min-w-48 bg-violet-100 rounded-xl flex flex-col gap-4 p-4'>
//                   <p onClick={() => navigate('my-profile')} className='hover:text-violet-500 cursor-pointer'>My Profile</p>
//                   <p onClick={() => navigate('my-appointments')} className='hover:text-violet-500 cursor-pointer'>My Appointments</p>
//                   <p onClick={logout} className='hover:text-violet-500 cursor-pointer'>Logout</p>
//                 </div>
//               </div>
//             </div>
//             : <button onClick={() => navigate('/login')} className='bg-blue-600 text-white px-8 py-3 rounded-full font-light hidden md:block'>CREATE ACCOUNT</button>
//         }
//         <img onClick={() => setshowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
//         {/* phone menu  */}
//         <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
//           <div>
//             <img src={assets.logo} alt="" />
//             <img onClick={() => setshowMenu(false)} src={assets.cross_icon} alt="" />
//           </div>

//           <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
//             <NavLink onClick={() => setshowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
//             <NavLink onClick={() => setshowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
//             <NavLink onClick={() => setshowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
//             <NavLink onClick={() => setshowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>

//           </ul>



//         </div>
//       </div>
//     </div>

//   )
// }

// export default Navbar



import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token, setToken } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm h-[72px] flex items-center">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6">
        {/* --- Logo only (no text) --- */}
        <img
          src={assets.logo}
          alt="CuraDesk Logo"
          onClick={() => navigate("/")}
          className="w-40 cursor-pointer select-none"
        />

        {/* --- Desktop Nav Links --- */}
        <nav className="hidden md:flex items-center gap-10 font-extrabold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-all text-[16px] ${isActive ? "text-blue-600 underline" : "text-gray-700 hover:text-black"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              `transition-all text-[16px] ${isActive ? "text-blue-600 underline" : "text-gray-700 hover:text-black"
              }`
            }
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition-all text-[16px] ${isActive ? "text-blue-600 underline" : "text-gray-700 hover:text-black"
              }`
            }
          >
            About

          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition-all text-[16px] ${isActive ? "text-blue-600 underline" : "text-gray-700 hover:text-black"
              }`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/Infochat"
            className={({ isActive }) =>
              `transition-all text-[16px] ${isActive ? "text-blue-600 underline" : "text-gray-700 hover:text-black"
              }`
            }
          >
            Chat with doctor
          </NavLink>
          <NavLink to="/symptom-checker"
            className={({ isActive }) =>
              `transition-all text-[16px] ${isActive ? "text-blue-600 underline" : ""
              }`
            }
          >
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-red-500 bg-clip-text text-transparent font-semibold hover:opacity-80">
              AI Symptom Analyzer
            </span>
          </NavLink>
        </nav>

        {/* --- Right Section --- */}
        <div className="flex items-center gap-5 relative">
          {token ? (
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <img
                src={assets.profile_pic}
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
      </div>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {showMenu && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden flex flex-col bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200 px-6 py-4 space-y-3"
          >
            <NavLink
              to="/"
              onClick={() => setShowMenu(false)}
              className="text-gray-700 hover:text-blue-600 text-base font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="/doctors"
              onClick={() => setShowMenu(false)}
              className="text-gray-700 hover:text-blue-600 text-base font-medium "
            >
              All Doctors
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setShowMenu(false)}
              className="text-gray-700 hover:text-blue-600 text-base font-medium"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setShowMenu(false)}
              className="text-gray-700 hover:text-blue-600 text-base font-medium"
            >
              Contact
            </NavLink>
            <NavLink
              to="/symptom-checker"
              onClick={() => setShowMenu(false)}
              className="bg-gradient-to-r from-violet-600 to-red-500 bg-clip-text text-transparent text-base font-semibold"
            >
              AI Symptom Analyzer
            </NavLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
