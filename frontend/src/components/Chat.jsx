import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

// Modern, full-page chat component used by patient and doctor pages
const Chat = ({ backendUrl, token, appointmentId, userId, userName, onClose }) => {
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const messagesRef = useRef(null)

  useEffect(() => {
    if (!appointmentId) return
    const url = backendUrl.replace(/\/$/, '')
    const s = io(url, { transports: ['websocket', 'polling'] })
    setSocket(s)

    s.on('connect', () => {
      s.emit('joinRoom', { appointmentId, userId })
    })

    s.on('chatHistory', (history) => {
      // history is an array of { senderId, senderName, message, timestamp }
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
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if (!input.trim() || !socket) return
    const payload = { appointmentId, senderId: userId, senderName: userName, message: input }
    socket.emit('chatMessage', payload)
    setInput('')
  }

  return (
    <div className="flex flex-col h-[80vh] max-h-[80vh] bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold shadow-sm">{userName ? userName.charAt(0).toUpperCase() : 'D'}</div>
          <div>
            <div className="text-sm font-semibold text-gray-800">Chat</div>
            <div className="text-xs text-gray-500">Appointment ID: {appointmentId}</div>
          </div>
        </div>
        <div>
          {onClose && <button onClick={onClose} className="text-sm text-gray-600 px-3 py-1 rounded hover:bg-gray-100">Close</button>}
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesRef} className="p-4 overflow-auto flex-1 bg-gray-50">
        <div className="flex flex-col gap-3">
          {messages.length === 0 && <div className="text-center text-sm text-gray-400 mt-6">No messages yet. Say hello 👋</div>}
          {messages.map((m, i) => {
            const isMe = String(m.senderId) === String(userId)
            return (
              <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] px-4 py-2 rounded-lg shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                  {!isMe && <div className="text-xs text-gray-400 mb-1">{m.senderName || m.senderId}</div>}
                  <div className="whitespace-pre-wrap">{m.message}</div>
                  <div className="text-xs text-gray-300 mt-1 text-right">{m.timestamp ? new Date(m.timestamp).toLocaleTimeString() : ''}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Input area */}
      <div className="px-4 py-3 border-t bg-white">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
            className="flex-1 border rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-200"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="px-4 py-2 bg-indigo-600 text-white rounded-full shadow">Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chat
