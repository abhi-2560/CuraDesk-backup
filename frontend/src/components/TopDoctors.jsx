// import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';

// const TopDoctors = () => {

//       // <div class="grid [grid-template-columns:repeat(auto-fill,_minmax(200px,_1fr))] gap-4">


//       const navigate = useNavigate();
//       const { doctors } = useContext(AppContext)
//       console.log("doctors data: ", doctors);

//       return (
//             <div className='flex flex-col items-center gap-4 my-16 text-gray-900 sm:mx-10'>

//                   <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
//                   <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
//                   <div className={`w-full grid [grid-template-columns:repeat(auto-fill,_minmax(200px,_1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0`}>
//                         {
//                               // 0,10 displays top 10 doc
//                               doctors.slice(0, 10).map((item) => (
//                                     <div key={item._id} onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
//                                           <img className='bg-blue-50' src={item.image} alt="" />
//                                           <div className='p-4'>
//                                                 <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-400'}`}>
//                                                       <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-400'} rounded-full`}></p>
//                                                       <p>{item.available ? 'Available' : 'Not Available'}</p>
//                                                 </div>

//                                                 <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
//                                                 <p className='text-gray-600 text-sm'>{item.speciality}</p>
//                                           </div>
//                                     </div>
//                               ))}
//                   </div>
//                   <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
//             </div>
//       )
// }

// export default TopDoctors

// // <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-400'} rounded-full`}></p>
// // <p>{item.available ? 'Available' : 'Not Available'}</p>

/*

import React from 'react';
import { doctors } from '../assets/assets';

const TopDoctors = () => {
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 sm:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
      <div className='w-full grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {doctors.slice(0, 10).map((item, index) => (
          <div className='border-blue-200 rounded-xl cursor-pointer overflow:hidden hover:translate-y-[-10px] transition-all duration-500'>
            <img className='bg-blue-50' src={item.image} alt="" />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
              </div>
              <p>{item.name}</p>
              <p>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button>more</button>
    </div>
  );
};

export default TopDoctors;

*/


/*
//correct code before more button customization


// chat gpt modified code to align top 10 doc in rows 

import React from 'react';
import { doctors } from '../assets/assets';



const TopDoctors = () => {
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 sm:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
      <div className='w-full flex flex-wrap justify-center gap-4 pt-5 px-3 sm:px-0'>
        {doctors.slice(0, 10).map((item) => (
          <div
            key={item._id}
            className='w-[200px] border border-blue-200 rounded-xl cursor-pointer overflow-hidden hover:translate-y-[-10px] transition-all duration-500'
          >
            <img className='bg-blue-50 w-full h-40 object-cover' src={item.image} alt="" />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-green-500'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                <p>Available</p>
              </div>
              <p className='text-lg font-medium text-gray-900'>{item.name}</p>
              <p className='text-sm text-gray-600'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  );
};

export default TopDoctors

*/



// BELOW CODE HAS ALMOST CORRECT LOGIC BUT REQUIRED SOME COSMETIC AND LOGICAL CHANGES, SO PREFER LAST CODE


// import React, { useContext } from 'react';
// // import { doctors } from '../assets/assets'; // after we created app context, we removed this import and used usecontext hook 'const {doctors} = useContext(AppContext)' to import doctors from assets
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';


// const TopDoctors = () => {

//   const navigate = useNavigate()
//   const { doctors } = useContext(AppContext)

//   return (
//     <div className='flex flex-col items-center gap-4 my-16 text-gray-900 sm:mx-10'>
//       <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
//       <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
//       <div className='w-full flex flex-wrap justify-center gap-4 pt-5 px-3 sm:px-0'>
//         {doctors.slice(0, 10).map((item) => (
//           <div onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
//             key={item._id}
//             className='w-[200px] border border-blue-200 rounded-xl cursor-pointer overflow-hidden hover:translate-y-[-10px] transition-all duration-500'
//           >
//             <img className='bg-blue-50 w-full h-40 object-cover' src={item.image} alt="" />
//             <div className='p-4'>
//               <div className='flex items-center gap-2 text-sm text-green-500'>
//                 <p className='w-2 h-2 bg-green-500 rounded-full'></p>
//                 <p>Available</p>
//               </div>
//               <p className='text-lg font-medium text-gray-900'>{item.name}</p>
//               <p className='text-sm text-gray-600'>{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)} } className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button> */}


//       <button
//         onClick={() => {
//           navigate('/doctors');
//           scrollTo(0, 0);
//         }}
//         className="bg-indigo-300 text-black px-8 py-3 rounded-full mt-10 border border-transparent hover:border-gray-800 transition"
//       >
//         more
//       </button>

//     </div>
//   );
// };

// export default TopDoctors


import React, { useContext } from 'react';
// import { doctors } from '../assets/assets'; // after we created app context, we removed this import and used usecontext hook 'const {doctors} = useContext(AppContext)' to import doctors from assets
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';


const TopDoctors = () => {

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 sm:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
      <div className='w-full flex flex-wrap justify-center gap-4 pt-5 px-3 sm:px-0'>
        {doctors.slice(0, 10).map((item) => (
          <div onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
            key={item._id}
            className='w-[200px] border border-blue-200 rounded-xl cursor-pointer overflow-hidden hover:translate-y-[-10px] transition-all duration-500'
          >
            <img className='bg-blue-50 w-full h-40 object-cover' src={item.image} alt="" />
            <div className='p-4'>
              <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-red-600'} `}>
                <p className={`w-2 h-2 rounded-full ${item.available? 'bg-green-500' : 'bg-red-600'}`}></p>
                <p>{item.available?'Available':'Not Available'}</p>
              </div>
              <p className='text-lg font-medium text-gray-900'>{item.name}</p>
              <p className='text-sm text-gray-600'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)} } className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button> */}


      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className="bg-indigo-300 text-black px-8 py-3 rounded-full mt-10 border border-transparent hover:border-gray-800 transition"
      >
        more
      </button>

    </div>
  );
};

export default TopDoctors
