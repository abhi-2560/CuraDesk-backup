
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import Chat from '../components/Chat'

// ChatWindow now uses Chat component
const ChatWindow = ({ appointmentId, doctorId, userId, onClose, backendUrl, token }) => {
    return (
        <Chat backendUrl={backendUrl} token={token} appointmentId={appointmentId} userId={userId} onClose={onClose} />
    )
}

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')
    const [showChat, setShowChat] = useState(false)
    const [chatInfo, setChatInfo] = useState(null)

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            if (data && data.appointments) setAppointments(data.appointments.reverse())
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) initPay(data.order)
            else toast.error(data.message)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) getUserAppointments()
    }, [token])

    return (
        <div>
            <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
            <div>
                {appointments.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
                        <div>
                            <img className='w-36 bg-[#EAEFFF]' src={item.docData.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-[#5E5E5E]'>
                            <p className='text-[#262626] text-base font-semibold'>{item.docData.name}</p>
                            <p>{item.docData.speciality}</p>
                            <p className='text-[#464646] font-medium mt-1'>Address:</p>
                            <p className=''>{item.docData.address.line1}</p>
                            <p className=''>{item.docData.address.line2}</p>
                            <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
                        </div>
                        <div />
                        <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && <button onClick={() => setPayment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentStripe(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="" /></button>}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentRazorpay(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="" /></button>}
                            {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-black bg-green-500'>Paid</button>}

                            {!item.cancelled && item.payment && !item.isCompleted && <button className="sm:min-w-48 py-2 px-6 border rounded-lg text-sm font-medium text-gray-700 bg-gray-50 border-gray-400 hover:bg-gray-200 transition-all duration-300">Appointment ID : {item._id}</button>}

                            {/* Chat button for paid, active appointments */}
                            {!item.cancelled && item.payment && !item.isCompleted && (
                                <button
                                    className="sm:min-w-48 py-2 border rounded-lg bg-black text-white hover:bg-white hover:text-black transition-all duration-300"
                                    onClick={() => navigate(`/chat/${item._id}`)}
                                >
                                    Chat with Doctor
                                </button>
                            )}
                        </div>
                        <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && <button onClick={() => setPayment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white hover:bg-black transition-all duration-300'>Pay Online</button>}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentStripe(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="" /></button>}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentRazorpay(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="" /></button>}
                            {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-black bg-green-500'>Paid</button>}


                                                        {!item.cancelled && item.payment && !item.isCompleted && (
                                                            <button
                                                                className="sm:min-w-48 py-2 border rounded text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-300"
                                                                onClick={() => navigate(`/chat/${item._id}`)}
                                                            >
                                                                Chat with Doctor
                                                            </button>
                                                        )}

                            {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-600'>Completed</button>}

                            {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
                            {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
                        </div>
                    </div>
                ))}
            </div>

            {showChat && chatInfo && (
                <ChatWindow appointmentId={chatInfo.appointmentId} doctorId={chatInfo.doctorId} userId={chatInfo.userId} onClose={() => setShowChat(false)} backendUrl={backendUrl} token={token} />
            )}

        </div>
    )
}

export default MyAppointments


//   const cancelAppointment = async (appointmentId) => {
//     try {
//       // console.log(appointmentId);
//       const { data } = await axios.post(
//         backendUrl + "/api/user/cancel-appointment",
//         { appointmentId },
//         { headers: { token } }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         getUserAppointments();
//         getDoctorsData();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.mesasage);
//     }
//   };
//   const initPay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Appointment Payment",
//       description: "Appointment Payment",
//       order_id: order.id,
//       receipt: order.receipt,
//       handler: async (response) => {
//         console.log(response);

//         try {
//           const { data } = await axios.post(
//             backendUrl + "/api/user/verifyRazorpay",
//             response,
//             { headers: { token } }
//           );
//           if (data.success) {
//             getUserAppointments();
//             navigate("/My-appointments");
//           }
//         } catch (error) {
//           console.log(error);
//           toast.error(error.message);
//         }
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };
//   const appointmentRazorpay = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/user/payment-razorpay",
//         { appointmentId },
//         { headers: { token } }
//       );
//       if (data.success) {
//         // console.log(data.order);
//         initPay(data.order);
//       }
//     } catch (error) {}
//   };

//   useEffect(() => {
//     if (token) {
//       getUserAppointments();
//     }
//   }, [token]);
//   return (
//     <div>
//       <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
//         My Appointments
//       </p>
//       <div>
//         {appointments.map((item, index) => (
//           <div
//             className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
//             key={index}
//           >
//             <div>
//               <img
//                 className="w-32 bg-indigo-50"
//                 src={item.docData.image}
//                 alt=""
//               />
//             </div>
//             <div className="flex-1 text-sm text-zinc-600">
//               <p className="text-neutral-800 font-semibold">
//                 {item.docData.name}
//               </p>
//               <p>{item.docData.speciality}</p>
//               <p className="text-zinc-700 font-meedium mt-1">Address:</p>
//               <p className="text-xs ">{item.docData.address.line1}</p>
//               <p>{item.docData.address.line2}</p>
//               <p className="text-xs mt-1">
//                 <span className="text-sm  text-neutral-700 font-medium">
//                   Date & Time:
//                 </span>
//                 {slotDateFormat(item.slotDate)}| {item.slotTime}
//               </p>
//             </div>
//             <div></div>
//             <div className="flex flex-col gap-2 justify-end">
//               {!item.cancelled && item.payment && (
//                 <button className="text-sm text-black bg-green-400 text-center sm:min-w-48 py-2 border rounded ">
//                   Payment Done
//                 </button>
//               )}
//               {!item.cancelled && !item.payment && (
//                 <button
//                   onClick={() => appointmentRazorpay(item._id)}
//                   className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-green-600 hover:text-white transition-all duration-300"
//                 >
//                   Pay Online
//                 </button>
//               )}
//               {!item.cancelled && (
//                 <button
//                   onClick={() => cancelAppointment(item._id)}
//                   className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300ms"
//                 >
//                   Cancel Appointment
//                 </button>
//               )}
//               {item.cancelled && (
//                 <button className="sm:min-2-48 py-2 border border-red-500 rounded text-red-500">
//                   Appointment cancelled
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyAppointments;





