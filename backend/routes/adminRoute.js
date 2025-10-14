import express from "express";
import { addDoctor,allDoctors, loginAdmin, adminDashboard, appointmentCancel,appointmentsAdmin } from "../controllers/adminController.js";
import { changeAvailablity } from "../controllers/doctorController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router() // this is router instance
//using this, we can create multiple end-points



//WE USED MIDDLEWARE MULTER TO TRANSOFORM DATA INTO FORM DATA

// add-doctor endpoint

// adminRouter.post('/add-doctor', <MIDDLEWARE-NAME-and-INPUT>  ,addDoctor)
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)

adminRouter.get("/appointments", authAdmin, appointmentsAdmin)


adminRouter.post('/all-doctors', authAdmin ,allDoctors)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)   

adminRouter.get('/dashboard',authAdmin,adminDashboard)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)

export default adminRouter



// import express from 'express';
// import { loginAdmin, addDoctor, allDoctors } from '../controllers/adminController.js';
// // import { changeAvailablity } from '../controllers/doctorController.js';

// // import authAdmin from '../middleware/authAdmin.js';

// import authAdmin from '../middlewares/authAdmin.js';

// import upload from '../middlewares/multer.js';
// const adminRouter = express.Router();

// adminRouter.post("/login", loginAdmin)
// adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
// // adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
// // adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
// adminRouter.get("/all-doctors", authAdmin, allDoctors)
// // adminRouter.get("/dashboard", authAdmin, adminDashboard)

// export default adminRouter;