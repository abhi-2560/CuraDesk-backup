import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

// Patient-side chat: modern UI aligned with doctor-side styling
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
    <div className="min-h-screen w-full py-auto px-auto">
      <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden h-full w-full flex">
        {/* Sidebar */}
        <aside className="w-80 bg-white p-6 hidden lg:block border-r">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">{userName ? userName.charAt(0).toUpperCase() : 'U'}</div>
            <div>
              <div className="text-sm font-semibold text-gray-800">{userName || 'You'}</div>
              <div className="text-xs text-gray-500">Appointment</div>
              <div className="text-xs text-indigo-600 font-medium break-all">{appointmentId}</div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600">Conversation</div>
          <div className="mt-3 text-xs text-gray-500">Messages are private between you and the doctor for this appointment only.</div>

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
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">{userName ? userName.charAt(0).toUpperCase() : 'U'}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{userName || 'You'}</div>
                  <div className="text-xs text-gray-500">Chat with doctor • <span className="text-indigo-600">{appointmentId}</span></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-3 py-1 rounded-md bg-white border text-sm text-gray-700">Help</button>
            </div>
          </header>

          <div ref={messagesRef} className="flex-1 overflow-auto p-6 bg-[linear-gradient(180deg,#f7f7fb,white)]">
            <div className="w-full flex flex-col gap-4">
              {messages.length === 0 && <div className="text-center text-sm text-gray-400 mt-6">No messages yet — start the conversation</div>}

              {messages.map((m, i) => {
                const isMe = String(m.senderId) === String(userId)
                const initial = (m.senderName && String(m.senderName).charAt(0)) || (m.senderId ? String(m.senderId).charAt(0) : '?')
                const bubbleClass = isMe ? 'self-end text-right' : 'self-start text-left'

                // Use light bubble to match doctor UI; allow wrapping and prevent overflow
                const bubbleStyle = { backgroundColor: '#f3f4f6', color: '#0f172a', boxShadow: '0 6px 18px rgba(15,23,42,0.06)' }

                const outerClass = `flex items-end gap-3 ${bubbleClass} ${isMe ? 'mr-8' : 'ml-3'} animate-[fadeIn_200ms_ease]`

                return (
                  <div key={i} className={outerClass}>
                    {!isMe && (
                      <div className="w-9 h-9 rounded-full bg-white border flex items-center justify-center text-sm text-gray-700 shadow-sm">{String(initial).toUpperCase()}</div>
                    )}

                    <div style={bubbleStyle} className={`px-4 py-3 rounded-2xl max-w-[90%] break-words whitespace-pre-wrap ${isMe ? 'rounded-br-2xl' : 'rounded-bl-2xl'}`}>
                      <div className="text-sm leading-6">{m.message}</div>
                      <div className="mt-2 text-xs text-gray-500 text-right">{formatTime(m.timestamp)}</div>
                    </div>

                    {isMe && (
                      <div className="w-9 h-9 rounded-full bg-white border flex items-center justify-center text-sm text-gray-700 shadow-sm">{String(initial).toUpperCase()}</div>
                    )}
                  </div>
                )
              })}

              {isTyping && (
                <div className="text-sm text-gray-500">Doctor is typing…</div>
              )}
            </div>
          </div>

          <div className="px-6 py-4 border-t bg-white">
            <div className="w-full flex items-center gap-3 px-2 md:px-6">
              <button title="Attach" className="p-2 rounded-full bg-white border text-gray-600 hover:shadow">＋</button>
              <input
                value={input}
                onChange={(e) => handleTyping(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
                className="flex-1 border rounded-full px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="Type a message to your doctor..."
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
