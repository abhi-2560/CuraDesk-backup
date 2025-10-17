import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

// Modern doctor-side chat component with sleek UI and smooth interactions
const Chat = ({ backendUrl, token, appointmentId, userId, userName, onClose }) => {
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesRef = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (!appointmentId) return
    const url = backendUrl.replace(/\/$/, '')
    const auth = token ? { dtoken: token } : undefined
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

    s.on('typing', ({ senderId }) => {
      if (String(senderId) !== String(userId)) {
        setIsTyping(true)
        setTimeout(() => setIsTyping(false), 1500)
      }
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

  const handleTyping = (value) => {
    setInput(value)
    if (!socket) return
    socket.emit('typing', { appointmentId, senderId: userId })
  }

  const formatTime = (ts) => {
    if (!ts) return ''
    const d = new Date(ts)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-[70vh] w-full mx-auto py-6 px-4">
      <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden h-[80vh] flex">
        {/* Sidebar */}
        <aside className="w-80 bg-white p-6 hidden lg:block border-r">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">{userName ? userName.charAt(0).toUpperCase() : 'D'}</div>
            <div>
              <div className="text-sm font-semibold text-gray-800">{userName || 'Doctor'}</div>
              <div className="text-xs text-gray-500">Appointment</div>
              <div className="text-xs text-indigo-600 font-medium break-all">{appointmentId}</div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600">Conversation</div>
          <div className="mt-3 text-xs text-gray-500">All messages are encrypted in transit. Only the patient & doctor on this appointment can join.</div>

          <div className="mt-6 border-t pt-4">
            <div className="text-xs text-gray-500">Quick actions</div>
            <div className="mt-3 flex flex-col gap-2">
              <button onClick={() => navigator.clipboard?.writeText(appointmentId)} className="text-left px-3 py-2 rounded-md hover:bg-gray-100">Copy appointment ID</button>
              <button onClick={() => onClose && onClose()} className="text-left px-3 py-2 rounded-md hover:bg-gray-100">Close chat</button>
            </div>
          </div>
        </aside>

        {/* Chat area */}
        <section className="flex-1 flex flex-col">
          <header className="px-6 py-4 border-b bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">←</button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">{userName ? userName.charAt(0).toUpperCase() : 'D'}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{userName || 'Doctor'}</div>
                  <div className="text-xs text-gray-500">Patient conversation • <span className="text-indigo-600">{appointmentId}</span></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-3 py-1 rounded-md bg-white border text-sm text-gray-700">Details</button>
            </div>
          </header>

          <div ref={messagesRef} className="flex-1 overflow-auto p-6 bg-[linear-gradient(180deg,#f7f7fb,white)]">
            <div className="mx-auto max-w-3xl flex flex-col gap-4">
              {messages.length === 0 && <div className="text-center text-sm text-gray-400 mt-6">No messages yet — start the conversation</div>}

              {messages.map((m, i) => {
                const isMe = String(m.senderId) === String(userId)
                const initial = (m.senderName && String(m.senderName).charAt(0)) || (m.senderId ? String(m.senderId).charAt(0) : '?')
                const bubbleClass = isMe ? 'self-end text-right' : 'self-start text-left'

                // Shared light bubble for visibility
                const bubbleStyle = { backgroundColor: '#000000', color: '#ffffff', boxShadow: '0 6px 18px rgba(15,23,42,0.06)' }

                return (
                  <div key={i} className={`flex items-end gap-3 ${bubbleClass} animate-[fadeIn_200ms_ease]`}>
                    {!isMe && (
                      <div className="w-9 h-9 rounded-full bg-white border flex items-center justify-center text-sm text-gray-700 shadow-sm">{String(initial).toUpperCase()}</div>
                    )}

                    <div style={bubbleStyle} className={`px-4 py-3 rounded-2xl max-w-[78%] ${isMe ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                      <div className="text-sm leading-6">{m.message}</div>
                      <div className="mt-2 text-xs text-gray text-right ">{formatTime(m.timestamp)}</div>
                    </div>

                    {isMe && (
                      <div className="w-9 h-9 rounded-full bg-white border flex items-center justify-center text-sm text-gray-700 shadow-sm">{String(initial).toUpperCase()}</div>
                    )}
                  </div>
                )
              })}

              {isTyping && (
                <div className="text-sm text-gray-500">Patient is typing…</div>
              )}
            </div>
          </div>

          <div className="px-6 py-4 border-t bg-white">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <button title="Attach" className="p-2 rounded-full bg-white border text-gray-600 hover:shadow">＋</button>
              <input
                value={input}
                onChange={(e) => handleTyping(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
                className="flex-1 border rounded-full px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="Type a message to your patient..."
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



// import React, { useEffect, useRef, useState } from 'react'
// import io from 'socket.io-client'
// import { useNavigate } from 'react-router-dom'

// // Doctor-side chat component: a light-themed variant to ensure visibility
// const Chat = ({ backendUrl, token, appointmentId, userId, userName, onClose }) => {
//   const [socket, setSocket] = useState(null)
//   const [messages, setMessages] = useState([])
//   const [input, setInput] = useState('')
//   const messagesRef = useRef(null)

//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!appointmentId) return
//     const url = backendUrl.replace(/\/$/, '')
//     const auth = token ? { dtoken: token } : undefined
//     const s = io(url, { transports: ['websocket', 'polling'], auth })
//     setSocket(s)

//     s.on('connect', () => {
//       s.emit('joinRoom', { appointmentId, userId })
//     })

//     s.on('chatHistory', (history) => {
//       setMessages(history || [])
//     })

//     s.on('chatMessage', (msg) => {
//       setMessages((prev) => [...prev, msg])
//     })

//     return () => {
//       s.disconnect()
//     }
//   }, [appointmentId])

//   useEffect(() => {
//     if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
//   }, [messages])

//   const sendMessage = () => {
//     if (!input.trim() || !socket) return
//     const payload = { appointmentId, senderId: userId, senderName: userName, message: input }
//     socket.emit('chatMessage', payload)
//     setInput('')
//   }

//   return (
//     <div className="w-full max-w-7xl mx-auto my-8 flex-1 px-4">
//       <div className="h-[80vh] bg-white rounded-2xl shadow-lg overflow-hidden flex">
//         {/* Left column */}
//         <aside className="w-80 bg-white p-6 hidden md:block border-r">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 font-semibold">{userName ? userName.charAt(0).toUpperCase() : 'D'}</div>
//             <div>
//               <div className="text-sm font-semibold text-gray-800">{userName || 'Doctor'}</div>
//               <div className="text-xs text-gray-500">Appointment</div>
//               <div className="text-xs text-indigo-600 font-medium truncate">{appointmentId}</div>
//             </div>
//           </div>
//           <div className="text-sm text-gray-600">Conversation details</div>
//           <div className="mt-4 text-xs text-gray-500">Messages are tied to this appointment. Only the patient and doctor can participate.</div>
//         </aside>

//         {/* Main chat */}
//         <section className="flex-1 flex flex-col">
//           <header className="px-6 py-4 border-b flex items-center justify-between bg-white">
//             <div className="flex items-center gap-4">
//               <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">{userName ? userName.charAt(0).toUpperCase() : 'D'}</div>
//               <div>
//                 <div className="text-lg font-semibold text-gray-800">{userName || 'Doctor'}</div>
//                 <div className="text-xs text-gray-500">Appointment: <span className="text-indigo-600 font-medium">{appointmentId}</span></div>
//               </div>
//             </div>
//           </header>

//           <div ref={messagesRef} className="flex-1 overflow-auto p-6 bg-gradient-to-b from-gray-50 to-white">
//             <div className="mx-auto max-w-3xl flex flex-col gap-4">
//               {messages.length === 0 && <div className="text-center text-sm text-gray-400 mt-6">No messages yet — say hello</div>}

//               {messages.map((m, i) => {
//                 const isMe = String(m.senderId) === String(userId)
//                 const initial = (m.senderName && String(m.senderName).charAt(0)) || (m.senderId ? String(m.senderId).charAt(0) : '?')
//                 // Force light bubble for doctor side so all messages are readable
//                 const bubbleStyle = { backgroundColor: '#f3f4f6', color: '#111827' }
//                 const timeStyle = { color: '#6b7280' }

//                 return (
//                   <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
//                     {!isMe && (
//                       <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700 mr-3">{String(initial).toUpperCase()}</div>
//                     )}
//                     <div className={`max-w-[80%] px-4 py-3 rounded-2xl shadow ${isMe ? 'rounded-br-none' : 'rounded-bl-none'}`} style={bubbleStyle}>
//                       <div className="text-sm whitespace-pre-wrap">{m.message}</div>
//                       <div className="text-xs mt-2 text-right" style={timeStyle}>{m.timestamp ? new Date(m.timestamp).toLocaleString() : ''}</div>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>

//           <div className="px-6 py-4 border-t bg-white">
//             <div className="max-w-3xl mx-auto flex items-center gap-3">
//               <button className="p-2 rounded-full bg-gray-100 text-gray-700" title="Attach">Upload</button>
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
//                 className="flex-1 border rounded-full px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
//                 placeholder="Type your message..."
//               />
//               <button onClick={sendMessage} className="px-4 py-2 bg-indigo-600 text-white rounded-full shadow">Send</button>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   )
// }

// export default Chat
//  