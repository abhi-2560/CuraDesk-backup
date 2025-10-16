// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { DoctorContext } from '../../context/DoctorContext'
// import { AppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// // import Chat from '../../../frontend/src/components/Chat'
// import Chat from '../../../../frontend/src/components/Chat'

// const DoctorAppointments = () => {
//   const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
//   const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
//   const { backendUrl, token } = useContext(AppContext)
//   const [showChat, setShowChat] = useState(false)
//   const [chatInfo, setChatInfo] = useState(null)
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (dToken) {
//       getAppointments()
//     }
//   }, [dToken])

//   return (
//     <div className='w-full max-w-6xl m-5 '>

//       <p className='mb-3 text-lg font-medium'>All Appointments</p>

//       <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
//         <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>
//         {appointments.reverse().map((item, index) => (
//           <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
//             <p className='max-sm:hidden'>{index}</p>
//             <div className='flex items-center gap-2'>
//               <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
//             </div>
//             <div>
//               <p className='text-xs inline border border-blue-600 px-2 rounded-full'>
//                 {item.payment?'Online':'CASH'}
//               </p>
//             </div>
//             <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//             <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
//             <p>{currency}{item.amount}</p>
//             {item.cancelled
//               ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//               : item.isCompleted
//                 ? <p className='text-green-500 text-xs font-medium'>Completed</p>
//                 : <div className='flex'>
//                   <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//                   <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
//                   {/* Chat button for doctor to chat with patient of this appointment */}
//                   <button onClick={() => navigate(`/doctor-chat/${item._id}`)} className='ml-2 text-sm px-2 py-1 border rounded text-blue-600'>Chat</button>
//                 </div>
//             }
//           </div>
//         ))}

//         {showChat && chatInfo && (
//           <Chat backendUrl={backendUrl} token={dToken || token} appointmentId={chatInfo.appointmentId} userId={chatInfo.userId} onClose={() => setShowChat(false)} />
//         )}
//       </div>

//     </div>
//   )
// }

// export default DoctorAppointments










// -------------------------- Perfecttttt






// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { DoctorContext } from '../../context/DoctorContext'
// import { AppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// import Chat from '../../../../frontend/src/components/Chat'

// const DoctorAppointments = () => {
//   const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
//   const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
//   const { backendUrl, token } = useContext(AppContext)
//   const [showChat, setShowChat] = useState(false)
//   const [chatInfo, setChatInfo] = useState(null)
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (dToken) {
//       getAppointments()
//     }
//   }, [dToken])

//   return (
//     <div className="w-full max-w-6xl mx-auto my-5 p-6 bg-white rounded-lg shadow-lg">
//       <p className="mb-5 text-2xl font-semibold text-gray-700">All Appointments</p>

//       <div className="bg-white border rounded-xl shadow-md max-h-[80vh] overflow-y-auto">
//         <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-2 py-4 px-6 border-b bg-gray-100">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>

//         {appointments.reverse().map((item, index) => (
//           <div key={index} className={`flex items-center justify-between gap-3 py-3 px-6 border-b ${item.cancelled ? 'bg-red-100' : 'hover:bg-gray-50'} transition duration-200`}>
//             <p className="hidden sm:block">{index + 1}</p>

//             <div className="flex items-center gap-2">
//               <img src={item.userData.image} className="w-10 h-10 rounded-full object-cover" alt={item.userData.name} />
//               <p className="text-lg font-medium text-gray-800">{item.userData.name}</p>
//             </div>

//             <div>
//               <p className={`text-xs inline border px-2 rounded-full ${item.payment ? 'border-blue-600 text-blue-600' : 'border-green-600 text-green-600'}`}>
//                 {item.payment ? 'Online' : 'CASH'}
//               </p>
//             </div>

//             <p className="hidden sm:block">{calculateAge(item.userData.dob)}</p>

//             <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

//             <p className="font-medium text-gray-700">{currency}{item.amount}</p>

//             {item.cancelled ? (
//               <p className="text-red-400 text-xs font-medium">Cancelled</p>
//             ) : item.isCompleted ? (
//               <p className="text-green-500 text-xs font-medium">Completed</p>
//             ) : (
//               <div className="flex gap-3 items-center">
//                 <img
//                   onClick={() => cancelAppointment(item._id)}
//                   className="w-8 cursor-pointer hover:opacity-80"
//                   src={assets.cancel_icon}
//                   alt="Cancel"
//                 />
//                 <img
//                   onClick={() => completeAppointment(item._id)}
//                   className="w-8 cursor-pointer hover:opacity-80"
//                   src={assets.tick_icon}
//                   alt="Complete"
//                 />
//                 <button
//                   onClick={() => navigate(`/doctor-chat/${item._id}`)}
//                   className="ml-2 text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
//                 >
//                   Chat
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}

//         {showChat && chatInfo && (
//           <Chat
//             backendUrl={backendUrl}
//             token={dToken || token}
//             appointmentId={chatInfo.appointmentId}
//             userId={chatInfo.userId}
//             onClose={() => setShowChat(false)}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// export default DoctorAppointments


// --

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import Chat from '../../../../frontend/src/components/Chat'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const { backendUrl, token } = useContext(AppContext)
  const [showChat, setShowChat] = useState(false)
  const [chatInfo, setChatInfo] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '40px auto',
      padding: '32px',
      backgroundColor: '#fdfdfd',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
      fontFamily: 'Segoe UI, sans-serif',
    },
    title: {
      fontSize: '28px',
      fontWeight: '600',
      marginBottom: '24px',
      color: '#2c3e50',
    },
    table: {
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #e0e0e0',
      maxHeight: '80vh',
      overflowY: 'auto',
    },
    header: {
      display: 'grid',
      gridTemplateColumns: '40px 1.5fr 1fr 0.7fr 2fr 1fr 1.5fr',
      alignItems: 'center',
      padding: '16px',
      backgroundColor: '#f4f6f8',
      fontWeight: '500',
      color: '#555',
      borderBottom: '1px solid #ddd',
      fontSize: '14px',
    },
    row: (cancelled) => ({
      display: 'grid',
      gridTemplateColumns: '40px 1.5fr 1fr 0.7fr 2fr 1fr 1.5fr',
      alignItems: 'center',
      padding: '16px',
      borderBottom: '1px solid #eee',
      backgroundColor: cancelled ? '#fff0f0' : '#fff',
      transition: 'background 0.2s ease',
      fontSize: '15px',
    }),
    rowHover: {
      backgroundColor: '#f9fbfc',
    },
    patientInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    avatar: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      objectFit: 'cover',
      boxShadow: '0 0 4px rgba(0,0,0,0.1)',
    },
    name: {
      fontWeight: '500',
      color: '#34495e',
    },
    payment: (isOnline) => ({
      fontSize: '13px',
      padding: '4px 10px',
      borderRadius: '999px',
      border: `1px solid ${isOnline ? '#3498db' : '#27ae60'}`,
      color: isOnline ? '#3498db' : '#27ae60',
      backgroundColor: isOnline ? '#ecf6ff' : '#eafaf1',
      fontWeight: '500',
      textAlign: 'center',
      width: 'fit-content',
    }),
    text: {
      color: '#555',
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    icon: {
      width: '24px',
      cursor: 'pointer',
      transition: 'opacity 0.2s ease',
    },
    chatButton: {
      backgroundColor: '#3498db',
      color: '#fff',
      fontSize: '13px',
      padding: '6px 12px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background 0.2s ease',
    },
    chatButtonHover: {
      backgroundColor: '#2980b9',
    },
    status: (type) => ({
      fontSize: '13px',
      fontWeight: '600',
      color: type === 'cancelled' ? '#e74c3c' : '#2ecc71',
    }),
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>All Appointments</h2>

      <div style={styles.table}>
        <div style={styles.header}>
          <span>#</span>
          <span>Patient</span>
          <span>Payment</span>
          <span>Age</span>
          <span>Date & Time</span>
          <span>Fees</span>
          <span>Action</span>
        </div>

        {appointments.reverse().map((item, index) => (
          <div key={index} style={styles.row(item.cancelled)}>
            <span>{index + 1}</span>

            <div style={styles.patientInfo}>
              <img src={item.userData.image} alt={item.userData.name} style={styles.avatar} />
              <span style={styles.name}>{item.userData.name}</span>
            </div>

            <span style={styles.payment(item.payment)}>
              {item.payment ? 'Online' : 'CASH'}
            </span>

            <span style={styles.text}>{calculateAge(item.userData.dob)}</span>
            

            <span style={styles.text}>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </span>

            <span style={styles.text}>{currency}{item.amount}</span>

            <div style={styles.actions}>
              {item.cancelled ? (
                <span style={styles.status('cancelled')}>Cancelled</span>
              ) : item.isCompleted ? (
                <span style={styles.status('completed')}>Completed</span>
              ) : (
                <div className="flex gap-3 items-center">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-8 cursor-pointer hover:opacity-80"
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-8 cursor-pointer hover:opacity-80"
                    src={assets.tick_icon}
                    alt="Complete"
                  />
                  <button
                    onClick={() => navigate(`/doctor-chat/${item._id}`)}
                    className="ml-2 text-sm px-3 py-1 bg-black text-white rounded-md hover:bg-gray-700 transition duration-200 "
                  >
                    CHAT
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {showChat && chatInfo && (
          <Chat
            backendUrl={backendUrl}
            token={dToken || token}
            appointmentId={chatInfo.appointmentId}
            userId={chatInfo.userId}
            onClose={() => setShowChat(false)}
          />
        )}
      </div>
    </div>
  )
}

export default DoctorAppointments