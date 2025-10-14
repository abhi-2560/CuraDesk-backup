import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true }, // This means doc name is mandotory to create a new doctor
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, required: true },
    fees: { type: Number, default: true },
    address: { type: Object, required: true },
    date: { type: Number, required: true }, // when doctor was added in db
    slots_booked: { type: Object, default: {} } // default:{} means whenever any doctor is added, slots_booked will be an empty object
}, { minimize: false })

// {minimize:false} means we can use empty object as default value

// const doctorModel = mongoose.model('doctor',doctorSchema)
// this means when project will start, this will execute and it will create a new model multiple times

    const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema)

/*

mongoose.models.doctor -> if doctormodel is available. if yes, we'll use that model
if not :-
it will create a new model using -> mongoose.model('doctor',doctorSchema)

*/


export default doctorModel
