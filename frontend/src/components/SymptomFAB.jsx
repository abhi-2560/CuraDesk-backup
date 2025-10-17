import React from 'react'
import { useNavigate } from 'react-router-dom'

const SymptomFAB = () => {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/symptom-checker')}
      aria-label="Symptom checker"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-full shadow-lg"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V9H3v10a2 2 0 002 2z" />
      </svg>
      <span className="hidden sm:inline-block font-medium">Symptom Checker</span>
    </button>
  )
}

export default SymptomFAB
