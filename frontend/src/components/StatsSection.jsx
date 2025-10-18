import React from 'react'

const StatsSection = () => {
  const stats = [
    {
      number: '10,000+',
      label: 'Happy Patients',
      description: 'Patients served successfully',
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '500+',
      label: 'Expert Doctors',
      description: 'Verified healthcare professionals',
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
        </svg>
      ),
      color: 'from-green-500 to-emerald-500'
    },
    {
      number: '50,000+',
      label: 'AI Consultations',
      description: 'Symptom analyses completed',
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
        </svg>
      ),
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '99.9%',
      label: 'Uptime',
      description: 'Reliable service availability',
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
        </svg>
      ),
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className='py-20 mb-6 bg-black rounded-2xl relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
      
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-white mb-4'>
            Trusted by Thousands
          </h2>
          <p className='text-xl text-blue-100 max-w-3xl mx-auto'>
            Our platform has transformed healthcare delivery for patients and doctors worldwide
          </p>
        </div>

        {/* Stats Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {stats.map((stat, index) => (
            <div 
              key={index}
              className='group relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105'
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>

              {/* Number */}
              <div className='text-4xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300'>
                {stat.number}
              </div>

              {/* Label */}
              <div className='text-xl font-semibold text-white mb-2'>
                {stat.label}
              </div>

              {/* Description */}
              <div className='text-blue-100 text-sm'>
                {stat.description}
              </div>

              {/* Hover Effect */}
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className='text-center mt-16'>
          <div className='inline-flex items-center space-x-8 bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-6'>
            <div className='flex items-center space-x-3'>
              <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
              <span className='text-white font-medium'>24/7 Support</span>
            </div>
            <div className='w-px h-6 bg-white/30'></div>
            <div className='flex items-center space-x-3'>
              <div className='w-3 h-3 bg-blue-400 rounded-full animate-pulse'></div>
              <span className='text-white font-medium'>HIPAA Compliant</span>
            </div>
            <div className='w-px h-6 bg-white/30'></div>
            <div className='flex items-center space-x-3'>
              <div className='w-3 h-3 bg-purple-400 rounded-full animate-pulse'></div>
              <span className='text-white font-medium'>AI-Powered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsSection
