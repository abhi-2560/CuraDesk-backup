import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p className='font-bold text-5xl text-blue-800 '>CONTACT US</p>
      </div>

      <div className='my-10 flex flex-col  md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>Our Office</p>
          <p className='text-gray-500'>54098 Wills Station <br /> Suite 350, Washington, USA</p>
          <p className='text-gray-500'>Phone: +91 700-008-6963 <br /> Email: abhijeet.shukla5404@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at CuraDesk</p>
          <p className='text-gray-500'>Learn more about our team and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:text-white hover:bg-black transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact