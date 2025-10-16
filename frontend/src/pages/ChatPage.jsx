import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Chat from '../components/Chat'
import { useNavigate } from 'react-router-dom'

const ChatPage = () => {
    const { appointmentId } = useParams()
    const { backendUrl, token, userData } = useContext(AppContext)
    const userId = userData ? userData._id : ''
    const userName = userData ? userData.name : ''

    const navigate = useNavigate()

    return (
        <div className='mx-4 sm:mx-[10%] mt-6'>
            <div className='max-w-3xl mx-auto'>
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
                        ← Back
                    </button>
                    <Chat backendUrl={backendUrl} token={token} appointmentId={appointmentId} userId={userId} userName={userName} onClose={() => { }} />
                </div>
            </div>
        </div>
    )
}

export default ChatPage
