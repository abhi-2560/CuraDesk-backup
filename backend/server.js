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
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'; // TO GET MONGODB.JS FILE FROM CONFIG FOLDER
import connectCloudinary from './config/cloudinary.js'; // TO GET cloudinary.JS FILE FROM CONFIG FOLDER
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';


// app config 
const app = express()
const port = process.env.PORT || 4000

connectDB() // TO CONNECT MONGODB.JS FROM CONFIG
connectCloudinary() // TO CONNECT CLOUDINARY.JS FROM CONFIG


//middleware
app.use(express.json())
app.use(cors())

// for deployement
// app.use(cors({
//   origin: ["https://cura-desk-client.vercel.app"],
//   credentials: true,
// }));


// api endpoints
app.use('/api/admin', adminRouter)
// localhost:4000/api/admin/add-doctor

app.use('/api/doctor',doctorRouter)

app.use('/api/user',userRouter)


//api endpoints
app.get('/', (req,res)=>{
    res.send('API WORKING')
})



app.listen(port ,()=>{
    console.log("SERVER STARTED AT PORT " ,port)
})