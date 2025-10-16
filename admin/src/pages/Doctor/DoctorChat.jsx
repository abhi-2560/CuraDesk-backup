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
import { useParams } from 'react-router-dom'
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading chat...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Chat with Patient</h2>
        <Chat
          backendUrl={backendUrl}
          token={dToken}
          appointmentId={appointmentId}
          userId={userId}
          userName={userName}
          onClose={() => {}}
        />
      </div>
    </div>
  )
}

export default DoctorChat
