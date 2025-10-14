// import React, { useContext, useEffect, useState } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import { AppContext } from '../../context/AppContext'
// import { toast } from 'react-toastify'
// import axios from 'axios'

// const DoctorProfile = () => {

//     const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
//     const { currency, backendUrl } = useContext(AppContext)
//     const [isEdit, setIsEdit] = useState(false)

//     const updateProfile = async () => {

//         try {

//             const updateData = {
//                 address: profileData.address,
//                 fees: profileData.fees,
//                 about: profileData.about,
//                 available: profileData.available
//             }

//             const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

//             if (data.success) {
//                 toast.success(data.message)
//                 setIsEdit(false)
//                 getProfileData()
//             } else {
//                 toast.error(data.message)
//             }

//             setIsEdit(false)

//         } catch (error) {
//             toast.error(error.message)
//             console.log(error)
//         }

//     }

//     useEffect(() => {
//         if (dToken) {
//             getProfileData()
//         }
//     }, [dToken])

//     return profileData && (
//         <div>
//             <div className='flex flex-col gap-4 m-5'>
//                 <div>
//                     <img className='bg-blue-600/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
//                 </div>

//                 <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-blue-200'>

//                     {/* ----- Doc Info : name, degree, experience ----- */}

//                     <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
//                     <div className='flex items-center gap-2 mt-1 text-gray-600'>
//                         <p>{profileData.degree} - {profileData.speciality}</p>
//                         <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
//                     </div>

//                     {/* ----- Doc About ----- */}
//                     <div>
//                         <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About :</p>
//                         <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
//                             {
//                                 isEdit
//                                     ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} type='text' className='w-full outline-blue-600 p-2' rows={8} value={profileData.about} />
//                                     : profileData.about
//                             }
//                         </p>
//                     </div>

//                     <p className='text-gray-600 font-medium mt-4'>
//                         Appointment fee: <span className='text-gray-800'>{currency} {isEdit ? <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
//                     </p>

//                     <div className='flex gap-2 py-2'>
//                         <p>Address:</p>
//                         <p className='text-sm'>
//                             {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
//                             <br />
//                             {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
//                         </p>
//                     </div>

//                     <div className='flex gap-1 pt-2'>
//                         <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
//                         <label htmlFor="">Available</label>
//                     </div>

//                     {
//                         isEdit
//                             ? <button onClick={updateProfile} className='px-4 py-1 border border-blue-600 text-sm rounded-full mt-5 hover:bg-blue-600 hover:text-white transition-all'>Save</button>
//                             : <button onClick={() => setIsEdit(prev => !prev)} className='px-4 py-1 border border-blue-600 text-sm rounded-full mt-5 hover:bg-blue-600 hover:text-white transition-all'>Edit</button>
//                     }

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DoctorProfile



import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(
                backendUrl + '/api/doctor/update-profile',
                updateData,
                { headers: { dToken } }
            )

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-8">
                <div className="flex-shrink-0 w-full sm:w-64">
                    <img
                        className="rounded-xl shadow-md object-cover w-full h-auto border bg-blue-500 border-gray-300"
                        src={profileData.image}
                        alt={profileData.name}
                    />
                </div>

                <div className="flex-1 bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-2">{profileData.name}</h1>
                    <div className="text-gray-600 text-sm mb-4">
                        <span>{profileData.degree} - {profileData.speciality}</span>
                        <span className="ml-3 inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                            {profileData.experience}
                        </span>
                    </div>

                    {/* About Section */}
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-1">About:</p>
                        {isEdit ? (
                            <textarea
                                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                                rows={6}
                                className="w-full border border-gray-300 p-3 rounded-md text-sm outline-blue-500 focus:ring-2 focus:ring-blue-200"
                                value={profileData.about}
                            />
                        ) : (
                            <p className="text-sm text-gray-700 leading-relaxed">{profileData.about}</p>
                        )}
                    </div>

                    {/* Fee */}
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700">
                            Appointment Fee:
                            <span className="text-gray-900 ml-1">
                                {currency}{' '}
                                {isEdit ? (
                                    <input
                                        type="number"
                                        className="border ml-2 border-gray-300 rounded px-2 py-1 text-sm w-24 outline-blue-500"
                                        onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                                        value={profileData.fees}
                                    />
                                ) : (
                                    profileData.fees
                                )}
                            </span>
                        </p>
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-1">Address:</p>
                        <div className="text-sm text-gray-700 space-y-1">
                            {isEdit ? (
                                <>
                                    <input
                                        type="text"
                                        onChange={(e) => setProfileData(prev => ({
                                            ...prev,
                                            address: { ...prev.address, line1: e.target.value }
                                        }))}
                                        value={profileData.address.line1}
                                        className="w-full border border-gray-300 p-2 rounded-md outline-blue-500"
                                    />
                                    <input
                                        type="text"
                                        onChange={(e) => setProfileData(prev => ({
                                            ...prev,
                                            address: { ...prev.address, line2: e.target.value }
                                        }))}
                                        value={profileData.address.line2}
                                        className="w-full border border-gray-300 p-2 rounded-md outline-blue-500"
                                    />
                                </>
                            ) : (
                                <>
                                    <p>{profileData.address.line1}</p>
                                    <p>{profileData.address.line2}</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                            onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                            checked={profileData.available}
                        />
                        <label className="text-sm text-gray-700">Available</label>
                    </div>

                    {/* Buttons */}
                    <div className="pt-2">
                        {isEdit ? (
                            <button
                                onClick={updateProfile}
                                className="px-6 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-all"
                            >
                                Save Changes
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEdit(true)}
                                className="px-6 py-2 border border-blue-600 text-blue-600 text-sm rounded-full hover:bg-blue-600 hover:text-white transition-all"
                            >
                                Edit Profile 
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile
