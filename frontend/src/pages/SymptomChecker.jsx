import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const SymptomChecker = () => {
  const { backendUrl } = useContext(AppContext)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const submit = async () => {
    if (!text.trim()) return
    setLoading(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/user/symptom-check', { symptoms: text })
      setResult(data)
    } catch (err) {
      setResult({ success: false, message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-4 sm:mx-[10%] mt-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">AI Symptom Checker</h2>
        <p className="text-sm text-gray-500 mb-4">Describe your symptoms and get suggested specialties to consult.</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full border p-3 rounded mb-3" rows={6} placeholder="e.g., I've had a fever and sore throat for 3 days" />
        <div className="flex items-center gap-3">
          <button onClick={submit} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? 'Checking...' : 'Check'}</button>
        </div>

        {result && (
          <div className="mt-6">
            {result.success ? (
              result.specialties ? (
                <div>
                  <h3 className="text-lg font-medium mb-2">Suggested specialties</h3>
                  <ul className="list-disc pl-5">
                    {result.specialties.map((s, i) => (
                      <li key={i}><strong>{s.name}</strong> — {s.reason}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap bg-gray-50 p-3 rounded mt-2">{result.raw || JSON.stringify(result, null, 2)}</pre>
              )
            ) : (
              <div className="text-red-500">{result.message || 'Error'}</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SymptomChecker
