import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const HeroSection = () => {
  const navigate = useNavigate()
  const { token } = useContext(AppContext)

  return (
    <div className='relative overflow-hidden'>
      {/* Subtle Background Pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f1f5f9" fill-opacity="0.4"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>
      
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-10'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Left Content */}
          <div className='space-y-10'>
            {/* Badge */}
            <div className='inline-flex items-center px-4 py-2 rounded-full bg-blue-100/80 backdrop-blur-sm text-blue-700 text-sm font-medium border border-blue-200/50'>
              <div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
              AI-Powered Healthcare Platform
            </div>
            
            {/* Main Heading */}
            <div className='space-y-6'>
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight'>
                Your Health,{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'>
                  Our Priority
                </span>
              </h1>
              
              <p className='text-xl text-slate-600 leading-relaxed max-w-2xl font-light'>
                Experience the future of healthcare with AI-powered symptom analysis, 
                real-time doctor consultations, and seamless appointment booking. 
                Your wellness journey starts here.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4'>
              {!token ? (
                <button 
                  onClick={() => navigate('/login')}
                  className='group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl'
                >
                  Get Started Today
                  <svg className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                  </svg>
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/doctors')}
                  className='group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl'
                >
                  Browse Doctors
                  <svg className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                  </svg>
                </button>
              )}
              
              <button 
                onClick={() => navigate('/symptom-checker')}
                className='group inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300'
              >
                <svg className='mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                </svg>
                Try Symptom Checker
              </button>
            </div>

            {/* Trust Indicators */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-8'>
              <div className='flex items-center space-x-3'>
                <div className='flex -space-x-2'>
                  <img className='w-10 h-10 rounded-full border-2 border-white shadow-sm' src={assets.group_profiles} alt='Patients' />
                  <div className='w-10 h-10 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-sm'>+</div>
                </div>
                <div>
                  <div className='text-lg font-semibold text-slate-900'>10,000+</div>
                  <div className='text-sm text-slate-600'>Happy Patients</div>
                </div>
              </div>
              
              <div className='flex items-center space-x-3'>
                <div className='flex text-yellow-400'>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className='w-5 h-5 fill-current' viewBox='0 0 20 20'>
                      <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                    </svg>
                  ))}
                </div>
                <div>
                  <div className='text-lg font-semibold text-slate-900'>4.9/5</div>
                  <div className='text-sm text-slate-600'>Average Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className='relative'>
            <div className='relative'>
              <img 
                src={assets.contact_image} 
                alt='Healthcare professionals' 
                className='w-full h-auto rounded-3xl shadow-2xl'
              />
              
              {/* Overlay gradient for depth */}
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-3xl'></div>
            </div>
            
            {/* Feature Cards - Static, Professional */}
            <div className='absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-6 z-20 border border-slate-200/50'>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center'>
                  <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                </div>
                <div>
                  <p className='text-base font-semibold text-slate-900'>AI Diagnosis</p>
                  <p className='text-sm text-slate-600'>Instant Analysis</p>
                </div>
              </div>
            </div>

            <div className='absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 z-20 border border-slate-200/50'>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center'>
                  <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                  </svg>
                </div>
                <div>
                  <p className='text-base font-semibold text-slate-900'>Live Chat</p>
                  <p className='text-sm text-slate-600'>24/7 Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
