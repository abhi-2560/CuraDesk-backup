// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../context/AppContext'
// import { useNavigate } from 'react-router-dom'

// const RelatedDoctors = ({ speciality, docId }) => {

//       const navigate = useNavigate()
//       const { doctors } = useContext(AppContext)
//       const [relDoc, setRelDoc] = useState([])

//       useEffect(() => {
//             if (doctors?.length > 0 && speciality) {
//                   const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
//                   setRelDoc(doctorsData)
//             }
//       }, [doctors, speciality, docId])

//       return (
//             <div className='flex flex-col items-center gap-4 my-16 text-gray-900 sm:mx-10'>
//                   <h1 className='text-3xl font-medium'>Related Doctors</h1>
//                   <p className='sm:w-1/3 text-center text-sm'>
//                         Simply browse through our extensive list of trusted doctors.
//                   </p>

//                   {/* Horizontal scroll container */}
//                   <div className='w-full overflow-x-auto'>
//                         <div className='flex gap-6 px-3 sm:px-0 justify-center min-w-fit'>
//                               {
//                                     relDoc.slice(0, 5).map((item) => (
//                                           <div
//                                                 key={item._id}
//                                                 onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
//                                                 className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 w-[250px] shrink-0'
//                                           >
//                                                 <img className='bg-blue-50 w-full h-56 object-cover' src={item.image} alt="" />
//                                                 <div className='p-4'>
//                                                       <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
//                                                       <p className='text-gray-600 text-sm'>{item.speciality}</p>
//                                                 </div>
//                                           </div>
//                                     ))
//                               }
                              
//                         </div>
//                   </div>

//                   <button
//                         onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
//                         className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'
//                   >
//                         more
//                   </button>
//             </div>
//       )

// }

// export default RelatedDoctors


// repo code


// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// const RelatedDoctors = ({ speciality, docId }) => {

//     const navigate = useNavigate()
//     const { doctors } = useContext(AppContext)

//     const [relDoc, setRelDoc] = useState([])

//     useEffect(() => {
//         if (doctors.length > 0 && speciality) {
//             const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
//             setRelDoc(doctorsData)
//         }
//     }, [doctors, speciality, docId])

//     return (
//         <div className='flex flex-col items-center gap-4 my-16 text-[#262626]'>
//             <h1 className='text-3xl font-medium'>Related Doctors</h1>
//             <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
//             <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
//                 {relDoc.map((item, index) => (
//                     <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
//                         <img className='bg-[#EAEFFF]' src={item.image} alt="" />
//                         <div className='p-4'>
//                             <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
//                                 <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
//                             </div>
//                             <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
//                             <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             {/* <button className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'>more</button> */}
//         </div>
//     )
// }

// export default RelatedDoctors




// correct gent. code

import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors?.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 sm:mx-10'>
            <h1 className='text-3xl font-medium'>Related Doctors</h1>
            <p className='sm:w-1/3 text-center text-sm'>
                Simply browse through our extensive list of trusted doctors.
            </p>

            {/* Horizontal scroll container */}
            <div className='w-full overflow-x-auto'>
                <div className='flex gap-6 px-3 sm:px-0 justify-center min-w-fit'>
                    {
                        relDoc.slice(0, 5).map((item) => (
                            <div
                                key={item._id}
                                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                                className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 w-[250px] shrink-0'
                            >
                                <img className='bg-blue-50 w-full h-56 object-cover' src={item.image} alt="" />
                                <div className='p-4'>

                                    {/* Availability Indicator */}
                                    <div className={`flex items-center gap-2 text-sm mb-2 ${item.available ? 'text-green-500' : 'text-red-600'}`}>
                                        <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-600'}`}></span>
                                        <span>{item.available ? 'Available' : 'Not Available'}</span>
                                    </div>

                                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <button
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                className='bg-green-300 text-gray-600 px-12 py-3 rounded-full mt-10'
            >
                more
            </button>
        </div>
    )
}

export default RelatedDoctors
