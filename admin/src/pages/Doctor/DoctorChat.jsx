// import React from 'react'
// import { useParams } from 'react-router-dom'
// import { useContext } from 'react'
// import Chat from '../../../../frontend/src/components/Chat'
// // import { AppContext } from '../../../context/AppContext'
// import { AppContext } from '../../context/AppContext'
// // import { DoctorContext } from '../../../context/DoctorContext'
// import { DoctorContext } from '../../context/DoctorContext'

// const DoctorChat = () => {
//   const { appointmentId } = useParams()
//   const { backendUrl } = useContext(AppContext)
//   const { dToken, doctorData } = useContext(DoctorContext)
//   const userId = '' // doctor-side chat uses patient's userId for message senderId; Chat will display senderId passed

//   return (
//     <div className='p-6'>
//       <h2 className='text-lg font-medium mb-4'>Chat with Patient</h2>
//       <Chat backendUrl={backendUrl} token={dToken} appointmentId={appointmentId} userId={userId} onClose={() => {}} />
//     </div>
//   )
// }

// export default DoctorChat



import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import Chat from '../../../../frontend/src/components/Chat'
import { AppContext } from '../../context/AppContext'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorChat = () => {
    const { appointmentId } = useParams()
    const { backendUrl } = useContext(AppContext)
    const { dToken, profileData, getProfileData } = useContext(DoctorContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        const ensureProfile = async () => {
            try {
                if (!profileData) {
                    await getProfileData()
                }
            } catch (err) {
                console.error('Error loading doctor profile', err)
            } finally {
                if (mounted) setLoading(false)
            }
        }
        ensureProfile()
        return () => { mounted = false }
    }, [])

    const userId = profileData?._id || ''
    const userName = profileData?.name || profileData?.fullName || 'Doctor'

    const navigate = useNavigate()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-gray-500">Loading chat...</div>
            </div>
        )
    }

    return (

        <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
                            ← Back
                        </button>
                        <div>
                            <div className="text-lg font-semibold text-gray-800">Chat with Patient</div>
                            <div className="text-xs text-gray-500">Appointment: <span className="font-medium text-indigo-600">{appointmentId}</span></div>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">Doctor: <span className="font-medium text-gray-800">{userName}</span></div>
                </div>

                {/* Chat area */}
                <div className="p-6">
                    <Chat
                        backendUrl={backendUrl}
                        token={dToken}
                        appointmentId={appointmentId}
                        userId={userId}
                        userName={userName}
                        onClose={() => navigate(-1)}
                    />
                </div>
            </div>
        </div>

    )
}

export default DoctorChat

// import React, { useEffect, useState, useContext } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import Chat from '../../../../frontend/src/components/Chat'
// import { AppContext } from '../../context/AppContext'
// import { DoctorContext } from '../../context/DoctorContext'

// const DoctorChat = () => {
//   const { appointmentId } = useParams()
//   const { backendUrl } = useContext(AppContext)
//   const { dToken, profileData, getProfileData } = useContext(DoctorContext)
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!profileData) await getProfileData()
//       setLoading(false)
//     }
//     fetchData()
//   }, [])

//   const userId = profileData ? profileData._id : ''
//   const userName = profileData ? profileData.name : ''

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-500 text-sm">
//         Loading chat...
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen w-full flex flex-col bg-[linear-gradient(180deg,#f9fafb,white)]">
//       {/* Header */}
//       <div className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition"
//           >
//             ← Back
//           </button>
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">Chat with Patient</h2>
//             <p className="text-xs text-gray-500">
//               Appointment:{' '}
//               <span className="font-medium text-indigo-600 break-all">{appointmentId}</span>
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
//             {userName ? userName.charAt(0).toUpperCase() : 'D'}
//           </div>
//           <span className="text-sm text-gray-700 font-medium">{userName || 'Doctor'}</span>
//         </div>
//       </div>

//       {/* Chat Area - full height */}
//       <div className="flex-1 w-full p-4 sm:p-8">
//         <div className="h-full w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
//           <Chat
//             backendUrl={backendUrl}
//             token={dToken}
//             appointmentId={appointmentId}
//             userId={userId}
//             userName={userName}
//             onClose={() => navigate(-1)}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DoctorChat
