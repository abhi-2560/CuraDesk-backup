import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  // store senderId as string to tolerate clients that send empty or non-objectid ids
  senderId: { type: String, required: true },
  senderName: { type: String },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema)
export default Message
