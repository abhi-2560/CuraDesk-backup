// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { NavLink } from 'react-router-dom'
// import { DoctorContext } from '../context/DoctorContext'
// import { AdminContext } from '../context/AdminContext'

// const Sidebar = () => {

//   const { dToken } = useContext(DoctorContext)
//   const { aToken } = useContext(AdminContext)

//   return (
//     <div className='min-h-screen bg-white border-r'>
//       {aToken && <ul className='text-[#515151] mt-5'>

//         <NavLink to={'/admin-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600' : ''}`}>
//           <img className='min-w-5' src={assets.home_icon} alt='' />
//           <p className='hidden md:block'>Dashboard</p>
//         </NavLink>
//         <NavLink to={'/all-appointments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600' : ''}`}>
//           <img className='min-w-5' src={assets.appointment_icon} alt='' />
//           <p className='hidden md:block'>Appointments</p>
//         </NavLink>
//         <NavLink to={'/add-doctor'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600' : ''}`}>
//           <img className='min-w-5' src={assets.add_icon} alt='' />
//           <p className='hidden md:block'>Add Doctor</p>
//         </NavLink>
//         <NavLink to={'/doctor-list'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600' : ''}`}>
//           <img className='min-w-5' src={assets.people_icon} alt='' />
//           <p className='hidden md:block'>Doctors List</p>
//         </NavLink>
//       </ul>}

//       {dToken && <ul className='text-[#515151] mt-5'>
//         <NavLink to={'/doctor-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600' : ''}`}>
//           <img className='min-w-5' src={assets.home_icon} alt='' />
//           <p className='hidden md:block'>Dashboard</p>
//         </NavLink>
//         <NavLink to={'/doctor-appointments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600' : ''}`}>
//           <img className='min-w-5' src={assets.appointment_icon} alt='' />
//           <p className='hidden md:block'>Appointments</p>
//         </NavLink>
//         <NavLink to={'/doctor-profile'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600' : ''}`}>
//           <img className='min-w-5' src={assets.people_icon} alt='' />
//           <p className='hidden md:block'>Profile</p>
//         </NavLink>
//       </ul>}
//     </div>
//   )
// }

// export default Sidebar


// ---------- Perfecttt


// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { NavLink } from 'react-router-dom'
// import { DoctorContext } from '../context/DoctorContext'
// import { AdminContext } from '../context/AdminContext'

// const Sidebar = () => {

//   const { dToken } = useContext(DoctorContext)
//   const { aToken } = useContext(AdminContext)

//   return (
//     <div className='min-h-screen bg-white border-r'>
//       {aToken && <ul className='text-[#515151] mt-5'>

//         <NavLink to={'/admin-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
//           <img className='min-w-5' src={assets.home_icon} alt='' />
//           <p className='hidden md:block'>Dashboard</p>
//         </NavLink>
//         <NavLink to={'/all-appointments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
//           <img className='min-w-5' src={assets.appointment_icon} alt='' />
//           <p className='hidden md:block'>Appointments</p>
//         </NavLink>
//         <NavLink to={'/add-doctor'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
//           <img className='min-w-5' src={assets.add_icon} alt='' />
//           <p className='hidden md:block'>Add Doctor</p>
//         </NavLink>
//         <NavLink to={'/doctor-list'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
//           <img className='min-w-5' src={assets.people_icon} alt='' />
//           <p className='hidden md:block'>Doctors List</p>
//         </NavLink>
//       </ul>}

//       {dToken && <ul className='text-[#515151] mt-5'>
//         <NavLink to={'/doctor-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
//           <img className='min-w-5' src={assets.home_icon} alt='' />
//           <p className='hidden md:block'>Dashboard</p>
//         </NavLink>
//         <NavLink to={'/doctor-appointments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
//           <img className='min-w-5' src={assets.appointment_icon} alt='' />
//           <p className='hidden md:block'>Appointments</p>
//         </NavLink>
//         <NavLink to={'/doctor-profile'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
//           <img className='min-w-5' src={assets.people_icon} alt='' />
//           <p className='hidden md:block'>Profile</p>
//         </NavLink>
//       </ul>}
//     </div>
//   )
// }

// export default Sidebar



import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const sidebarStyle = {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e5e7eb',
    paddingTop: '20px',
    fontFamily: 'Segoe UI, sans-serif',
  }

  const navItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 24px',
    minWidth: '240px',
    cursor: 'pointer',
    backgroundColor: isActive ? '#F2F3FF' : 'transparent',
    borderRight: isActive ? '4px solid #6366f1' : '4px solid transparent',
    transition: 'background 0.2s ease, border 0.2s ease',
    color: '#515151',
    fontWeight: isActive ? '600' : '500',
  })

  const iconStyle = {
    width: '20px',
    minWidth: '20px',
    height: '20px',
    objectFit: 'contain',
  }

  const labelStyle = {
    display: 'none',
    fontSize: '15px',
  }

  const labelMdStyle = {
    display: 'block',
  }

  const renderNavItem = (to, icon, label) => (
    <NavLink to={to}>
      {({ isActive }) => (
        <li style={navItemStyle(isActive)}>
          <img src={icon} alt="" style={iconStyle} />
          <span style={{ ...labelStyle, ...labelMdStyle }}>{label}</span>
        </li>
      )}
    </NavLink>
  )

  return (
    <div style={sidebarStyle}>
      <ul style={{ listStyle: 'none', marginTop: '20px', paddingLeft: '0' }}>
        {aToken && (
          <>
            {renderNavItem('/admin-dashboard', assets.home_icon, 'Dashboard')}
            {renderNavItem('/all-appointments', assets.appointment_icon, 'Appointments')}
            {renderNavItem('/add-doctor', assets.add_icon, 'Add Doctor')}
            {renderNavItem('/doctor-list', assets.people_icon, 'Doctors List')}
          </>
        )}
        {dToken && (
          <>
            {renderNavItem('/doctor-dashboard', assets.home_icon, 'Dashboard')}
            {renderNavItem('/doctor-appointments', assets.appointment_icon, 'Appointments')}
            {renderNavItem('/doctor-profile', assets.people_icon, 'Profile')}
          </>
        )}
      </ul>
    </div>
  )
}

export default Sidebar