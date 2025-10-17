// refresh data for contact-me at footer



import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Doctor from './pages/Doctors';
import Login from './pages/Login'
import About from './pages/About'
import Contacts from './pages/Contacts'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import ChatPage from './pages/ChatPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Appointment from './pages/Appointment'
import SymptomChecker from './pages/SymptomChecker'
import SymptomFAB from './components/SymptomFAB'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctor />} />
        <Route path='/doctors/:speciality' element={<Doctor />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contacts />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/chat/:appointmentId' element={<ChatPage />} />
        <Route path='/symptom-checker' element={<SymptomChecker />} />
        <Route path='/appointment/:docId' element={<Appointment />} />

      </Routes>
      <Footer />
      <SymptomFAB />
    </div>
  )
}

export default App