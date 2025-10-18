import React from 'react'
import { assets } from '../assets/assets'

const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
        </svg>
      ),
      title: 'AI Symptom Checker',
      description: 'Get instant medical specialty recommendations powered by Google Gemini AI. Describe your symptoms and receive intelligent guidance.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
        </svg>
      ),
      title: 'Real-time Chat',
      description: 'Connect instantly with healthcare professionals through our secure, real-time messaging system with persistent chat history.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
        </svg>
      ),
      title: 'Smart Scheduling',
      description: 'Book appointments with verified doctors instantly. View real-time availability and manage your healthcare schedule effortlessly.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' />
        </svg>
      ),
      title: 'Secure Payments',
      description: 'Pay safely with integrated Razorpay and Stripe payment gateways. Your financial information is always protected.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
        </svg>
      ),
      title: 'Verified Doctors',
      description: 'Access a network of certified healthcare professionals across multiple specialties, all verified and experienced.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: (
        <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
        </svg>
      ),
      title: 'Seamless Bookings',
      description: 'Book appointments with verified doctors instantly. View real-time availability and manage your healthcare schedule effortlessly.',
      color: 'from-teal-500 to-blue-500'
    }
  ]

  return (
    <div className='py-1'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4'>
            <span className='w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
            Why Choose CuraDesk
          </div>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Revolutionary Healthcare Features
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Experience the future of healthcare with cutting-edge technology, 
            AI-powered diagnostics, and seamless patient-doctor interactions.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <div 
              key={index}
              className='group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2'
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className='text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300'>
                {feature.title}
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl'></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className='text-center py-10 mt-16'>
          <div className='inline-flex items-center space-x-4 bg-black  rounded-2xl px-8 py-6 shadow-lg'>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
              <span className='text-sm font-medium text-white'>Live Support Available</span>
            </div>
            <div className='w-px h-6 bg-gray-300'></div>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-blue-500 rounded-full animate-pulse'></div>
              <span className='text-sm font-medium text-white'>AI-Powered Diagnostics</span>
            </div>
            <div className='w-px h-6 bg-gray-300'></div>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-purple-500 rounded-full animate-pulse'></div>
              <span className='text-sm font-medium text-white'>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
