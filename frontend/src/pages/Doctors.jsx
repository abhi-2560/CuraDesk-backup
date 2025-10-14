import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

import { useState } from 'react'


const Doctors = () => {

  const { speciality } = useParams()

  const { doctors } = useContext(AppContext)

  const [filterDoc, setFilterDoc] = useState([])

  const [showFilter, setshowFilter] = useState(false)

  const navigate = useNavigate()

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])


  return (

    <div>
      <p className='text-2xl w-full text-center  text-gray-800'>Browse through the specialist doctors</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setshowFilter(prev => !prev)} className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-blue-700 text-white' : ""}`}>Filter</button>
        <div className={` flex-col gap-4 text-sm text-gray-700 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => { speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-300 text-black border-gray-700" : ""}`}>General physician</p>
          <p onClick={() => { speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-300 text-black border-gray-700" : ""}`}>Gynecologist</p>
          <p onClick={() => { speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-300 text-black border-gray-700" : ""}`}>Dermatologist</p>
          <p onClick={() => { speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-300 text-black border-gray-700" : ""}`}>Pediatricians</p>
          <p onClick={() => { speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-300 text-black border-gray-700" : ""}`}>Neurologist</p>
          <p onClick={() => { speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-300 text-black border-gray-700" : ""}`}>Gastroenterologist</p>
        </div>

        <div className='w-full grid gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]'>
          {
            filterDoc.map((item) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)}
                key={item._id}
                className='w-[200px] border border-blue-200 rounded-xl cursor-pointer overflow-hidden hover:translate-y-[-10px] transition-all duration-500'>
                <img className='bg-blue-50 w-full h-40 object-cover' src={item.image} alt="" />
                <div className='p-4'>
                  {/* <div className='flex items-center gap-2 text-sm text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                    <p>Available</p>
                  </div> */}

                  <div className={`flex items-center gap-2 text-sm mb-2 ${item.available ? 'text-green-500' : 'text-red-600'}`}>
                    <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-600'}`}></span>
                    <span>{item.available ? 'Available' : 'Not Available'}</span>
                  </div>

                  <p className='text-lg font-medium text-gray-900'>{item.name}</p>
                  <p className='text-sm text-gray-600'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>

  )
}

export default Doctors  