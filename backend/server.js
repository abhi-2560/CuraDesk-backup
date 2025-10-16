/*

// THIS IS THE BASIC BOILERPLATE CODE FOR THE EXPRESS APP

import express from 'express';
import cors from 'cors'
import 'dotenv/config'


// app config 
const app = express()
const port = process.env.PORT || 4000


//middleware
app.use(express.json())
app.use(cors())


//api endpoints
app.get('/', (req,res)=>{
    res.send('API WORKING')
})

app.listen(port ,()=>{
    console.log("SERVER STARTED AT PORT " ,port)
})

-----------------------------------------

*/

/*

import express from 'express';
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'; // TO GET MONGODB.JS FILE FROM CONFIG FOLDER
import connectCloudinary from './config/cloudinary.js'; // TO GET cloudinary.JS FILE FROM CONFIG FOLDER


// app config 
const app = express()
const port = process.env.PORT || 4000

connectDB() // TO CONNECT MONGODB.JS FROM CONFIG
connectCloudinary() // TO CONNECT CLOUDINARY.JS FROM CONFIG


//middleware
app.use(express.json())
app.use(cors())


//api endpoints
app.get('/', (req,res)=>{
    res.send('API WORKING')
})

app.listen(port ,()=>{
    console.log("SERVER STARTED AT PORT " ,port)
})

*/


//after creating api endpoints for controllers/adminController.js using routes/adminRoutes.js


import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import Message from './models/messageModel.js';
// (no socket auth here) 

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Socket.io setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Change to your frontend URL in production
        methods: ['GET', 'POST'],
    },
});

// Store active chats (in-memory for now)
let activeChats = {};

io.on('connection', (socket) => {
    // Join room for appointment
    socket.on('joinRoom', async ({ appointmentId, userId }) => {
        try {
            socket.join(appointmentId);
            // Optionally track users in room
            if (!activeChats[appointmentId]) activeChats[appointmentId] = [];
            if (!activeChats[appointmentId].includes(userId)) {
                activeChats[appointmentId].push(userId);
            }

            // Load last 200 messages for this appointment and send to the joining socket
            try {
                const history = await Message.find({ appointmentId }).sort({ timestamp: 1 }).limit(200).lean();
                socket.emit('chatHistory', history.map(h => ({ senderId: h.senderId, senderName: h.senderName, message: h.message, timestamp: h.timestamp })))
            } catch (err) {
                console.log('Error loading chat history', err)
            }
        } catch (err) {
            console.log('joinRoom error', err)
        }
    });

    // Handle chat message
    socket.on('chatMessage', async ({ appointmentId, senderId, message, senderName }) => {
        try {
            const payload = {
                senderId,
                senderName,
                message,
                timestamp: new Date(),
            }

            // Persist message
            try {
                const msg = new Message({ appointmentId, senderId, senderName, message, timestamp: payload.timestamp })
                await msg.save()
            } catch (err) {
                console.log('Error saving message', err)
            }

            // Broadcast to room
            io.to(appointmentId).emit('chatMessage', payload)
        } catch (err) {
            console.log('chatMessage handler error', err)
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        // Optionally clean up activeChats
    });
});

server.listen(port, () => {
    console.log('SERVER & SOCKET.IO STARTED AT PORT', port);
});