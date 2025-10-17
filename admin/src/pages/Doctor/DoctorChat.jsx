
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import Chat from '../../components/Chat'
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
                        bubbleColor="#f3f4f6"
                    />
                </div>
            </div>
        </div>

    )
}

export default DoctorChat


// import React, { useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { useContext, useState } from 'react'
// import Chat from '../../../../frontend/src/components/Chat'
// import { AppContext } from '../../context/AppContext'
// import { DoctorContext } from '../../context/DoctorContext'

// const DoctorChat = () => {
//     const { appointmentId } = useParams()
//     const { backendUrl } = useContext(AppContext)
//     const { dToken, profileData, getProfileData } = useContext(DoctorContext)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         let mounted = true
//         const ensureProfile = async () => {
//             try {
//                 if (!profileData) {
//                     await getProfileData()
//                 }
//             } catch (err) {
//                 console.error('Error loading doctor profile', err)
//             } finally {
//                 if (mounted) setLoading(false)
//             }
//         }
//         ensureProfile()
//         return () => { mounted = false }
//     }, [])

//     const userId = profileData?._id || ''
//     const userName = profileData?.name || profileData?.fullName || 'Doctor'

//     const navigate = useNavigate()

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-100">
//                 <div className="text-gray-500">Loading chat...</div>
//             </div>
//         )
//     }

//     return (
//         <div className='mx-4 sm:mx-[10%] mt-6'>
//             <div className='max-w-3xl mx-auto'>
//                 <div className="flex items-center gap-4">
//                     <button onClick={() => navigate(-1)} className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
//                         ← Back
//                     </button>
//                     <Chat
//                         backendUrl={backendUrl}
//                         token={dToken}
//                         appointmentId={appointmentId}
//                         userId={userId}
//                         userName={userName}
//                         onClose={() => navigate(-1)}
//                         bubbleColor="#f3f4f6"
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DoctorChat