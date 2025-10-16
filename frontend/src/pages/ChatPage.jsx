import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Chat from '../components/Chat'

const ChatPage = () => {
  const { appointmentId } = useParams()
  const { backendUrl, token, userData } = useContext(AppContext)
  const userId = userData ? userData._id : ''
  const userName = userData ? userData.name : ''

  return (
    <div className='mx-4 sm:mx-[10%] mt-6'>
      <div className='max-w-3xl mx-auto'>
        <Chat backendUrl={backendUrl} token={token} appointmentId={appointmentId} userId={userId} userName={userName} onClose={() => {}} />
      </div>
    </div>
  )
}

export default ChatPage
