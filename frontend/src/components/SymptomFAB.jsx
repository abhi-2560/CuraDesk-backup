import React from 'react'
import { useNavigate } from 'react-router-dom'

const SymptomFAB = () => {
  const navigate = useNavigate()
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => navigate('/symptom-checker')}
        aria-label="Symptom checker"
        className="fab group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-2xl transform-gpu hover:scale-105 focus:outline-none"
      >
        
        <span className="sr-only">Open symptom checker</span>
        <div className="absolute -inset-1 blur-xl opacity-30 group-hover:opacity-80 transition-opacity duration-300 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400" />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V9H3v10a2 2 0 002 2z" />
        </svg>

        {/* tooltip */}
        <div className="absolute right-full mr-3 hidden group-hover:flex items-center whitespace-nowrap bg-white text-indigo-700 px-3 py-2 rounded-md shadow-md text-sm font-medium">
          Symptom Checker
          <span className="ml-2 text-xs text-gray-400">AI triage</span>
        </div>

        {/* ripple */}
        <span className="fab-ripple absolute inset-0 rounded-full opacity-0 group-hover:opacity-100" aria-hidden />
      </button>
    </div>
  )
}

export default SymptomFAB
