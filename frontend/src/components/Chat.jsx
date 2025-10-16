import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

// Polished, full-page chat component used by patient and doctor pages
const Chat = ({ backendUrl, token, appointmentId, userId, userName, onClose }) => {
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const messagesRef = useRef(null)

  const naviagate = useNavigate()

  useEffect(() => {
    if (!appointmentId) return
    const url = backendUrl.replace(/\/$/, '')
    const auth = token ? { token } : undefined
    const s = io(url, { transports: ['websocket', 'polling'], auth })
    setSocket(s)

    s.on('connect', () => {
      s.emit('joinRoom', { appointmentId, userId })
    })

    s.on('chatHistory', (history) => {
      setMessages(history || [])
    })

    s.on('chatMessage', (msg) => {
      setMessages((prev) => [...prev, msg])
    })

    return () => {
      s.disconnect()
    }
  }, [appointmentId])

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages])

  const sendMessage = () => {
    if (!input.trim() || !socket) return
    const payload = { appointmentId, senderId: userId, senderName: userName, message: input }
    socket.emit('chatMessage', payload)
    setInput('')
  }

  return (
    
      <div className="w-full max-w-7xl mx-auto my-8 flex-1 px-4">
        <div className="h-[80vh] bg-white rounded-2xl shadow-lg overflow-hidden flex">
          {/* Left column */}
          <aside className="w-80 bg-indigo-50 p-6 hidden md:block">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">{userName ? userName.charAt(0).toUpperCase() : 'D'}</div>
              <div>
                <div className="text-sm font-semibold text-gray-800">{userName || 'Doctor'}</div>
                <div className="text-xs text-gray-500">Appointment</div>
                <div className="text-xs text-indigo-600 font-medium truncate">{appointmentId}</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">Conversation details</div>
            <div className="mt-4 text-xs text-gray-500">Messages are tied to this appointment. Only the patient and doctor can participate.</div>
          </aside>

          {/* Main chat */}
          <section className="flex-1 flex flex-col">
            <header className="px-6 py-4 border-b flex items-center justify-between bg-white">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">{userName ? userName.charAt(0).toUpperCase() : 'D'}</div>
                <div>
                  <div className="text-lg font-semibold text-gray-800">{userName || 'Doctor'}</div>
                  <div className="text-xs text-gray-500">Appointment: <span className="text-indigo-600 font-medium">{appointmentId}</span></div>
                </div>
              </div>
              
            </header>

            <div ref={messagesRef} className="flex-1 overflow-auto p-6 bg-[linear-gradient(180deg,#f8fafc,white)]">
              <div className="mx-auto max-w-3xl flex flex-col gap-4">
                {messages.length === 0 && <div className="text-center text-sm text-gray-400 mt-6">No messages yet — say hello 👋</div>}

                {messages.map((m, i) => {
                  const isMe = String(m.senderId) === String(userId)
                  return (
                    <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      {!isMe && (
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700 mr-3">{(m.senderName || String(m.senderId) || '?').charAt(0).toUpperCase()}</div>
                      )}
                      <div className={`max-w-[80%] px-4 py-3 rounded-2xl shadow ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                        <div className="text-sm whitespace-pre-wrap">{m.message}</div>
                        <div className={`text-xs mt-2 ${isMe ? 'text-indigo-100' : 'text-gray-400'} text-right`}>{m.timestamp ? new Date(m.timestamp).toLocaleString() : ''}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="px-6 py-4 border-t bg-white">
              <div className="max-w-3xl mx-auto flex items-center gap-3">
                <button className="p-2 rounded-full bg-gray-100 text-gray-600" title="Attach">📎</button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
                  className="flex-1 border rounded-full px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Type your message..."
                />
                <button onClick={sendMessage} className="px-4 py-2 bg-indigo-600 text-white rounded-full shadow">Send</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    
  )
}

export default Chat
