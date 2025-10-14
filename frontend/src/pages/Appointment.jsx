// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import { assets } from '../assets/assets'
// import { toast } from 'react-toastify'
// import axios from 'axios'
// import RelatedDoctors from '../components/RelatedDoctors'

// const Appointment = () => {

//   const { docId } = useParams()
//   const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
//   const daysOfWeek = ['SUN', 'MON', 'Tue', 'WED', 'THU', 'FRI', 'SAT']

//   const navigate = useNavigate()

//   const [docInfo, setDocInfo] = useState(null)
//   const [docSlots, setDocSlots] = useState([])
//   const [slotIndex, setSlotIndex] = useState(0)
//   const [slotTime, setSlotTime] = useState('')

//   const fetchDocInfo = async () => {
//     const docInfo = doctors.find(doc => doc._id == docId)
//     setDocInfo(docInfo)
//   }

//   const getAvailableSlots = async () => {
//     setDocSlots([]);

//     let today = new Date();

//     for (let i = 0; i < 7; i++) {
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);

//       let endTime = new Date(currentDate);
//       endTime.setHours(21, 0, 0, 0);

//       if (i === 0) {
//         currentDate.setHours(today.getHours() > 10 ? today.getHours() + 1 : 10);
//         currentDate.setMinutes(today.getMinutes() > 30 ? 30 : 0);
//       } else {
//         currentDate.setHours(10, 0);
//       }

//       let timeSlots = [];

//       while (currentDate < endTime) {
//         const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//         let day = currentDate.getDate();
//         let month = currentDate.getMonth() + 1;
//         let year = currentDate.getFullYear();
//         const slotDate = `${day}_${month}_${year}`;

//         const isSlotAvailable = !(docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime));

//         if (isSlotAvailable) {
//           timeSlots.push({
//             dateTime: new Date(currentDate),
//             time: formattedTime,
//           });
//         }

//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }

//       if (timeSlots.length > 0) {
//         setDocSlots((prev) => [...prev, timeSlots]);
//       }
//     }
//   };

//   const bookAppointment = async () => {
//     if (!token) {
//       toast.warn('Login to book an appointment');
//       return navigate('/login');
//     }

//     try {
//       const date = docSlots[slotIndex][0].dateTime;
//       let day = date.getDate();
//       let month = date.getMonth() + 1;
//       let year = date.getFullYear();

//       const slotDate = `${day}_${month}_${year}`;

//       const { data } = await axios.post(
//         `${backendUrl}/api/user/book-appointment`,
//         { docId, slotDate, slotTime },
//         { headers: { utoken: token } }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         getDoctorsData();
//         navigate('/my-appointments');
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };


//   useEffect(() => {
//     fetchDocInfo()
//   }, [doctors, docId])

//   useEffect(() => {
//     getAvailableSlots()
//   }, [docInfo])

//   useEffect(() => {
//     console.log('Doc Slots:', docSlots);
//     console.log('Selected Slot:', slotTime);
//   }, [docSlots, slotTime]);

//   return docInfo && (
//     <div>
//       <div className='flex flex-col sm:flex-row gap-4'>
//         <div>
//           <img className='bg-blue-600 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
//         </div>

//         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
//           <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
//             {docInfo.name}
//             <img className='w-5' src={assets.verified_icon} alt="" />
//           </p>
//           <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//             <p>{docInfo.degree} - {docInfo.speciality}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
//           </div>

//           <div>
//             <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
//             <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
//           </div>
//           <p className='text-gray-500 font-medium mt-4'>
//             Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
//           </p>
//         </div>
//       </div>

//       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
//         <p>Booking Slots</p>
//         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//           {
//             docSlots.length && docSlots.map((item, index) => (
//               <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-600 text-white' : 'border border-gray-200'}`} key={index}>
//                 <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
//                 <p>{item[0] && item[0].dateTime.getDate()}</p>
//               </div>
//             ))
//           }
//         </div>

//         <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
//           {
//             docSlots.length && docSlots[slotIndex].map((item, index) => (
//               <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-600 text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
//                 {item.time.toLowerCase()}
//               </p>
//             ))
//           }
//         </div>
//         <button onClick={bookAppointment} className='bg-blue-600 text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
//       </div>
//       <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

//     </div>
//   )
// }

// export default Appointment 




// default correct code

// import React, { useContext, useState,useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext' // important
// import { assets } from '../assets/assets'

// const Appointment = () => {
//     const { docID } = useParams() // always check spelling -> docID vs docId : DocID is used
//     const { doctors } = useContext(AppContext)


//     const [docInfo, setDocInfo] = useState(null)

//     const fetchDocInfo = async () => {
//         const docInfo = doctors.find(doc => doc._id === docID) // aisa doctor jiski doc._id is eq to docID -> store in docInfo
//         setDocInfo(docInfo)
//         console.log(docInfo)
//     }

//     useEffect(() => {
//       fetchDocInfo()
//     }, [doctors,docID])


//     return (

//         <div>

//             {/* doc details */}
//             <div>
//                 <div>
//                     <img src="" alt="" />
//                 </div>

//                 <div>
//                     {/* doc info : name,deg,exp */}
//                     <p>
//                     {docInfo.name} 
//                     <img src={assets.verified_icon} alt="" />
//                     </p>
//                 </div>
//             </div>


//         </div>


//     )
// }

// export default Appointment






// chatgpt code

// ==============================================================

// logically corrected code 












































// import React, { useContext, useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import { assets } from '../assets/assets';
// import { CiDark } from 'react-icons/ci';
// import RelatedDoctors from '../components/RelatedDoctors';

// const Appointment = () => {
//   const { docID } = useParams();
//   const { doctors, currencysymbol } = useContext(AppContext);


//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setdocSlots] = useState([])
//   const [slotIndex, setslotIndex] = useState(0)
//   const [slotTime, setslotTime] = useState('')


//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

//   const fetchDocInfo = () => {
//     if (!doctors || doctors.length === 0) return;
//     const found = doctors.find(doc => doc._id === docID);
//     setDocInfo(found || null);

//   };


//   const getAvailableSlots = async () => {
//     setdocSlots([])

//     const today = new Date();

//     //current date
//     for (let i = 0; i < 7; i++) {
//       // getting date with index
//       let currentDate = new Date(today)
//       currentDate.setDate(today.getDate() + i)

//       // setting end time of date with index
//       let endTime = new Date()
//       endTime.setDate(today.getDate() + i)
//       endTime.setHours(21, 0, 0, 0) // 3 zeros for hrs, min, sec

//       //setting hrs

//       // IMPORTANT LOGIC
//       // if (today.getDate() === currentDate.getDate()) {
//       //   currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
//       //   currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
//       // } else {
//       //   currentDate.setHours(10)
//       //   currentDate.setMinutes(0)
//       // }


//       // chatgpt code for above code replacement
//       if (today.toDateString() === currentDate.toDateString()) {
//         // Set to now
//         currentDate = new Date();

//         // Round to next 30-minute slot
//         const minutes = currentDate.getMinutes();
//         if (minutes < 30) {
//           currentDate.setMinutes(30);
//         } else {
//           currentDate.setHours(currentDate.getHours() + 1);
//           currentDate.setMinutes(0);
//         }

//         // Ensure it's not earlier than 10:30 AM
//         const minStart = new Date(today);
//         minStart.setHours(10, 30, 0, 0);
//         if (currentDate < minStart) {
//           currentDate = minStart;
//         }
//       } else {
//         currentDate.setHours(10, 30, 0, 0);
//       }



//       let timeSlots = []

//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

//         // add slot to array
//         timeSlots.push({
//           datetime: new Date(currentDate),
//           time: formattedTime
//         })

//         // Increment current time by 30 min
//         currentDate.setMinutes(currentDate.getMinutes() + 30)
//       }

//       setdocSlots(prev => ([...prev, timeSlots]))


//     }
//   }




//   useEffect(() => {
//     fetchDocInfo();
//   }, [doctors, docID]);


//   useEffect(() => {
//     getAvailableSlots()
//   }, [docInfo])

//   useEffect(() => {
//     console.log(docSlots)

//   }, [docSlots])


//   if (!docInfo) {
//     return (
//       <div className="p-6 text-center text-gray-500">
//         Loading doctor details...
//       </div>
//     );
//   }

//   return (

//     <div className="w-full px-4">
//       <div className="w-full max-w-5xl mx-auto rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row transition duration-300 hover:shadow-2xl">

//         {/* Left: Doctor Image */}
//         <div className="flex items-end justify-center w-full md:w-1/3 bg-blue-400 rounded-t-3xl md:rounded-t-none md:rounded-l-3xl">
//           <img
//             src={docInfo.image}
//             alt={docInfo.name}
//             className="h-full object-cover"
//           />
//         </div>

//         {/* Right: Doctor Info */}
//         <div className="flex-1 p-4 sm:p-6 md:p-10 bg-blue-200">
//           {/* Name + Verified */}
//           <div className="flex items-center gap-2 mb-2">
//             <h2 className="text-3xl font-bold text-gray-800">{docInfo.name}</h2>
//             <img
//               src={assets.verified_icon}
//               alt="Verified badge"
//               aria-label="Verified badge"
//               className="w-5 h-5"
//             />
//           </div>

//           {/* Degree & Speciality */}
//           <p className="text-gray-600 text-base mb-1">
//             {docInfo.degree} - <span className="text-blue-600">{docInfo.speciality}</span>
//           </p>

//           {/* Experience Badge */}
//           <div className="mt-2 inline-block bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1 rounded-full shadow-sm">
//             {docInfo.experience || 'N/A'} of Experience
//           </div>

//           {/* About Section */}
//           <div className="mt-6">
//             <div className="flex items-center gap-1 text-gray-800 font-semibold text-base mb-2">
//               <span>About</span>
//               <img
//                 src={assets.info_icon}
//                 alt="Info icon"
//                 aria-label="About info"
//                 className="w-4 h-4"
//               />
//             </div>
//             <p className="text-gray-700 text-base leading-6 tracking-normal">
//               {docInfo.about}
//             </p>
//           </div>

//           {/* Appointment Fee */}
//           <div className="mt-6 ">
//             <p className="text-xl font-bold text-black">
//               Appointment fee : <span>{currencysymbol}{docInfo.fees}</span>
//               {/* currency symbol is defined in AppContext */}
//             </p>
//           </div>
//         </div>
//       </div>


//       {/* BOOKING SLOTS */}
//       {/* ----- Booking Slots ----- */}
//       <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
//         <p>Booking slots</p>
//         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//           {
//             docSlots.length && docSlots.map((item, index) => (
//               <div onClick={() => setslotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-600 text-white' : 'border border-gray-200'}`} key={index}>
//                 <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//                 <p>{item[0] && item[0].datetime.getDate()}</p>
//               </div>
//             ))
//           }
//         </div>
//         <div className='flex items-center gap-3 w-full overflow-x-auto whitespace-nowrap scrollbar-visible mt-4'>

//           {docSlots.length && docSlots[slotIndex].map((item, index) => (
//             <p onClick={() => setslotTime(slotTime === item.time ? null : item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-600 text-white' : 'text-gray-600 border border-gray-600'}`} key={index}> {item.time.toLowerCase()}</p>
//           ))}
//         </div>

//         <button className='bg-blue-600 text-white text-sm font-weight-light px-14 py-3 rounded-full my-6'>BOOK AN APPOINTMENT</button>

//       </div>


//       {/* RELATED DOCTORS */}

//       <RelatedDoctors docId={docID} speciality={docInfo.speciality} />
//     </div>


//   );
// };

// export default Appointment;










//================================================

// styled code 


// import React, { useContext, useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import { assets } from '../assets/assets';
// import { CiDark } from 'react-icons/ci';
// import RelatedDoctors from '../components/RelatedDoctors';

// const Appointment = () => {
//   const { docID } = useParams();
//   const { doctors, currencysymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);

//   const navigate = useNavigate();

//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setdocSlots] = useState([])
//   const [slotIndex, setslotIndex] = useState(0)
//   const [slotTime, setslotTime] = useState('')


//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

//   const fetchDocInfo = () => {
//     if (!doctors || doctors.length === 0) return;
//     const found = doctors.find(doc => doc._id === docID);
//     setDocInfo(found || null);

//   };


//   const getAvailableSlots = async () => {
//     setdocSlots([])

//     const today = new Date();

//     //current date
//     for (let i = 0; i < 7; i++) {
//       // getting date with index
//       let currentDate = new Date(today)
//       currentDate.setDate(today.getDate() + i)

//       // setting end time of date with index
//       let endTime = new Date()
//       endTime.setDate(today.getDate() + i)
//       endTime.setHours(21, 0, 0, 0) // 3 zeros for hrs, min, sec

//       //setting hrs

//       // IMPORTANT LOGIC
//       // if (today.getDate() === currentDate.getDate()) {
//       //   currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
//       //   currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
//       // } else {
//       //   currentDate.setHours(10)
//       //   currentDate.setMinutes(0)
//       // }


//       // chatgpt code for above code replacement
//       if (today.toDateString() === currentDate.toDateString()) {
//         // Set to now
//         currentDate = new Date();

//         // Round to next 30-minute slot
//         const minutes = currentDate.getMinutes();
//         if (minutes < 30) {
//           currentDate.setMinutes(30);
//         } else {
//           currentDate.setHours(currentDate.getHours() + 1);
//           currentDate.setMinutes(0);
//         }

//         // Ensure it's not earlier than 10:30 AM
//         const minStart = new Date(today);
//         minStart.setHours(10, 30, 0, 0);
//         if (currentDate < minStart) {
//           currentDate = minStart;
//         }
//       } else {
//         currentDate.setHours(10, 30, 0, 0);
//       }



//       let timeSlots = []

//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

//         // add slot to array
//         timeSlots.push({
//           datetime: new Date(currentDate),
//           time: formattedTime
//         })

//         // Increment current time by 30 min
//         currentDate.setMinutes(currentDate.getMinutes() + 30)
//       }

//       setdocSlots(prev => ([...prev, timeSlots]))


//     }
//   }

//   const bookAppointment = async () => {

//     if (!token) {
//       toast.warn('Login to book appointment')
//       return navigate('/login')
//     }

//     const date = docSlots[slotIndex][0].datetime

//     let day = date.getDate()
//     let month = date.getMonth() + 1
//     let year = date.getFullYear()

//     const slotDate = day + "_" + month + "_" + year

//     try {

//       const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docID, slotDate, slotTime }, { headers: { token } })
//       if (data.success) {
//         toast.success(data.message)
//         getDoctorsData()
//         navigate('/my-appointments')
//       } else {
//         toast.error(data.message)
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }

//   }


//   useEffect(() => {
//     fetchDocInfo();
//   }, [doctors, docID]);


//   useEffect(() => {
//     getAvailableSlots()
//   }, [docInfo])

//   useEffect(() => {
//     console.log(docSlots)

//   }, [docSlots])


//   if (!docInfo) {
//     return (
//       <div className="p-6 text-center text-gray-500">
//         Loading doctor details...
//       </div>
//     );
//   }

//   return (
//     <div className="w-full px-4">
//       {/* Doctor Info Card */}
//       <div className="max-w-5xl mx-auto mt-8 flex flex-col md:flex-row overflow-hidden rounded-3xl shadow-xl border border-gray-100">
//         {/* Image */}
//         <div className="md:w-1/3 bg-blue-400 flex justify-center items-end p-0">
//           <img
//             src={docInfo.image}
//             alt={docInfo.name}
//             className="h-full w-full object-cover object-bottom rounded-t-3xl md:rounded-t-none md:rounded-l-3xl"
//           />
//         </div>


//         {/* Info */}
//         <div className="flex-1 bg-blue-200 p-6 md:p-10">
//           {/* Name and Verified Badge */}
//           <div className="flex items-center gap-2 mb-2">
//             <h2 className="text-3xl font-bold text-gray-800">{docInfo.name}</h2>
//             <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" />
//           </div>

//           {/* Specialization */}
//           <p className="text-gray-600 text-base mb-1">
//             {docInfo.degree} - <span className="text-blue-600">{docInfo.speciality}</span>
//           </p>

//           {/* Experience */}
//           <div className="mt-3 inline-block bg-blue-100 text-blue-700 text-sm px-4 py-1 rounded-full shadow-sm">
//             {docInfo.experience || 'N/A'} of Experience
//           </div>

//           {/* About */}
//           <div className="mt-6">
//             <div className="flex items-center gap-1 text-gray-800 font-semibold text-base mb-2">
//               <span>About</span>
//               <img src={assets.info_icon} alt="info" className="w-4 h-4" />
//             </div>
//             <p className="text-gray-700 leading-relaxed">
//               {docInfo.about}
//             </p>
//           </div>

//           {/* Fees */}
//           <div className="mt-6 text-lg font-bold text-black">
//             Appointment fee : <span>{currencysymbol}{docInfo.fees}</span>
//           </div>
//         </div>
//       </div>

//       {/* Booking Slots */}
//       <div className="max-w-5xl mx-auto mt-8 px-2">
//         <p className="text-gray-700 text-base font-medium mb-4">Booking slots</p>

//         {/* Day Selector */}
//         <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
//           {docSlots.length > 0 && docSlots.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => setslotIndex(index)}
//               className={`text-center px-4 py-3 min-w-[64px] rounded-full cursor-pointer text-sm font-medium
//             ${slotIndex === index ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'}
//           `}
//             >
//               <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//               <p>{item[0] && item[0].datetime.getDate()}</p>
//             </div>
//           ))}
//         </div>

//         {/* Time Slots */}
//         <div className="flex flex-wrap md:flex-nowrap gap-2 overflow-x-auto no-scrollbar mt-4">
//           {docSlots.length > 0 && docSlots[slotIndex]?.map((item, index) => (
//             <p
//               key={index}
//               onClick={() => setslotTime(slotTime === item.time ? null : item.time)}
//               className={`px-5 py-2 rounded-full text-sm cursor-pointer border transition
//             ${slotTime === item.time
//                   ? 'bg-blue-600 text-white'
//                   : 'text-gray-600 border-gray-400 hover:bg-gray-100'}
//           `}
//             >
//               {item.time.toLowerCase()}
//             </p>
//           ))}
//         </div>

//         {/* Book Button */}
//         <button onClick={bookAppointment} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition">
//           BOOK AN APPOINTMENT
//         </button>
//       </div>
//       {/* RELATED DOCTORS */}

//       <RelatedDoctors docId={docID} speciality={docInfo.speciality} />

//     </div>

//   );
// };

// export default Appointment;















// // backup return func
//  <div className="p-6">
//       {/* Doctor details section */}
//       <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
//         <div className="w-40 h-40 rounded-full overflow-hidden">
//           <img src={docInfo.image} alt={docInfo.name} className="w-full h-full object-cover" />
//         </div>

//         <div className="flex-1">
//           <p className="text-2xl font-semibold flex items-center gap-2">
//             {docInfo.name}
//             <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" />
//           </p>
//           <p className="text-gray-600 mt-1">{docInfo.degree} - {docInfo.speciality}</p>
//           <button className="text-sm text-gray-500 mt-1">Experience: {docInfo.experience || 'N/A'} </button>
//         </div>
//         <div>
//             <p>
//                 About <img src={assets.info_icon} alt="" />
//                 <p>{docInfo.about}</p>
//             </p>
//         </div>
//       </div>
//     </div>


// another backup

// {/* <div className="w-full max-w-5xl mx-auto p-4" >
//   <div className="w-full max-w-5xl  rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">

//     {/* Left: Doctor Image */}
//     <div className="flex items-end justify-center w-1/4 bg-blue-400 rounded-l-xl">
//       <img
//         src={docInfo.image}
//         alt={docInfo.name}
//         className="h-full max-h-[400px] object-contain"
//       />
//     </div>

//     {/* Right: Doctor Info */}
//     <div className="flex-1 p-6 md:p-10 bg-blue-200">
//       {/* Name + Verified */}
//       <div className="flex items-center gap-2 mb-2">
//         <h2 className="text-3xl font-bold text-gray-800">{docInfo.name}</h2>
//         <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" />
//       </div>

//       {/* Degree & Speciality */}
//       <p className="text-gray-600 text-base mb-1">
//         {docInfo.degree} - <span className="text-blue-600">{docInfo.speciality}</span>
//       </p>

//       {/* Experience Badge */}
//       <div className="mt-2 inline-block bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1 rounded-full shadow-sm">
//         {docInfo.experience || 'N/A'} of Experience
//       </div>

//       {/* About Section */}
//       <div className="mt-6">
//         <div className="flex items-center gap-1 text-gray-800 font-semibold text-base mb-2">
//           <span>About</span>
//           <img src={assets.info_icon} alt="Info" className="w-4 h-4" />
//         </div>
//         <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
//           {docInfo.about}
//         </p>
//       </div>

//       {/* Appointment Fee */}
//       <div className="mt-6">
//         <p className="text-sm text-gray-600">
//           Appointment fee:&nbsp;
//           <span className="text-lg font-semibold text-gray-800">${docInfo.fee || 50}</span>
//         </p>
//       </div>
//     </div>
//   </div>
// </div> */}




// repo code


import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {

        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];


            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {

                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))

        }

    }

    const bookAppointment = async () => {

        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctorsData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div>

            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-blue-600 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
                </div>

                <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

                    {/* ----- Doc Info : name, degree, experience ----- */}

                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="" /></p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>

                    <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{currencySymbol}{docInfo.fees}</span> </p>
                </div>
            </div>

            {/* Booking slots */}
            <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
                <p >Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-600 text-white' : 'border border-[#DDDDDD]'}`}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-600 text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}>{item.time.toLowerCase()}</p>
                    ))}
                </div>

                <button onClick={bookAppointment} className='bg-blue-600 text-white text-sm font-light px-20 py-3 rounded-full my-6'>Book an appointment</button>
            </div>

            {/* Listing Releated Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null
}

export default Appointment


// refer 12.55 to hide booked slots











// vvvvvvvvvvvvvvvvvvvvvvvvvvv   Anur  code 

// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import RelatedDoctors from "../components/RelatedDoctors";
// import { toast } from "react-toastify";
// import axios from "axios";

// const Appointments = () => {
//   const { docId } = useParams();
//   const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
//     useContext(AppContext);

//   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//   const navigate = useNavigate();
//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState("");
//   const fetchDocInfo = async () => {
//     const docInfo = doctors.find((doc) => doc._id === docId);
//     setDocInfo(docInfo);
//   };

//   const getAvailableSlots = async () => {
//     if (!docInfo) return;
//     setDocSlots([]);
//     //getting current date
//     let today = new Date();
//     for (let i = 0; i < 7; i++) {
//       //getting date with index
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);
//       //setting end time of the date
//       let endTime = new Date();
//       endTime.setDate(today.getDate() + i);
//       endTime.setHours(21, 0, 0, 0);
//       //setting hours
//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(
//           currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
//         );
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
//       } else {
//         currentDate.setHours(10);
//         currentDate.setMinutes(0);
//       }

//       let timeSlots = [];
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//         let day = currentDate.getDate();
//         let month = currentDate.getMonth() + 1;
//         let year = currentDate.getFullYear();
//         const slotDate = day + "_" + month + "_" + year;
//         const slotTime = formattedTime;

//         const isSlotAvailable =
//           docInfo.slots_booked[slotDate] &&
//           docInfo.slots_booked[slotDate].includes(slotTime)
//             ? false
//             : true;

//         if (isSlotAvailable) {
//           //add slot to array
//           timeSlots.push({
//             datetime: new Date(currentDate),
//             time: formattedTime,
//           });
//         }

//         //increment current time by 30 minutes
//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }
//       setDocSlots((prev) => [...prev, timeSlots]);
//     }
//   };

//   const bookAppointment = async () => {
//     if (!token) {
//       toast.warn("Login to book Appointment");
//       return navigate("/login");
//     }
//     try {
//       const date = docSlots[slotIndex][0].datetime;
//       let day = date.getDate();
//       let month = date.getMonth() + 1;
//       let year = date.getFullYear();
//       const slotDate = day + "_" + month + "_" + year;
//       const { data } = await axios.post(
//         backendUrl + "/api/user/book-appointment",
//         { docId, slotDate, slotTime },
//         { headers: { token } }
//       );

//       if (data.success) {
//         console.log("data aaya ki nhi", data);
//         toast.success(data.message);
//         getDoctorsData();
//         navigate("/my-appointment");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };
//   useEffect(() => {
//     fetchDocInfo();
//   }, [doctors, docId]);

//   useEffect(() => {
//     getAvailableSlots();
//   }, [docInfo]);

//   useEffect(() => {
//     console.log(docSlots);
//   }, [docSlots]);

//   return (
//     docInfo && (
//       <div>
//         {/*----------doctor details----*/}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div>
//             <img
//               className="bg-primary w-full sm:max-w-72 rounded-lg"
//               src={docInfo.image}
//               alt=""
//             />
//           </div>
//           <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//             {/*----doctors info name deg and exp---*/}
//             <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
//               {docInfo.name}
//               <img className="w-5" src={assets.verified_icon} alt="" />
//             </p>
//             <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
//               <p>
//                 {docInfo.degree} - {docInfo.speciality}
//               </p>
//               <button className="py-0.5 px-2 border text-xs rounded-full">
//                 {docInfo.experience}
//               </button>
//             </div>

//             {/*-----doctor about---*/}
//             <div>
//               <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
//                 About <img src={assets.info_icon} alt="" />
//               </p>
//               <p className="text-sm text-gray-500 max-w-[700px] mt-1">
//                 {docInfo.about}
//               </p>
//             </div>
//             <p className="text-gray-500 font-medium mt-4">
//               Appointment fee:{" "}
//               <span className="text-gray-600">
//                 {currencySymbol}
//                 {docInfo.fees}
//               </span>
//             </p>
//           </div>
//         </div>

//         {/*-------booking slots*/}
//         <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700">
//           <p>Booking Slots</p>
//           <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
//             {docSlots.length &&
//               docSlots.map((item, index) => (
//                 <div
//                   onClick={() => setSlotIndex(index)}
//                   className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
//                     slotIndex === index
//                       ? "bg-blue-500 text-white"
//                       : "border border-gray-200"
//                   }`}
//                   key={index}
//                 >
//                   <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//                   <p>{item[0] && item[0].datetime.getDate()}</p>
//                 </div>
//               ))}
//           </div>
//           <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
//             {docSlots.length &&
//               docSlots[slotIndex].map((item, index) => (
//                 <p
//                   onClick={() => setSlotTime(item.time)}
//                   className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
//                     item.time === slotTime
//                       ? "bg-blue-500 text-white"
//                       : "text-gray-400 border border-gray-300"
//                   }`}
//                   key={index}
//                 >
//                   {item.time.toLowerCase()}
//                 </p>
//               ))}
//           </div>
//           <button
//             onClick={bookAppointment}
//             className="bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-6"
//           >
//             Book an Appointment
//           </button>
//         </div>

//         {/*----listing related doctors---*/}
//         <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
//       </div>
//     )
//   );
// };

// export default Appointments;