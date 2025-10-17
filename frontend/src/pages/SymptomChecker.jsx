import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const SymptomChecker = () => {
  const { backendUrl } = useContext(AppContext)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const submit = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const { data } = await axios.post(backendUrl + '/api/user/symptom-check', { symptoms: text })
      setResult(data)
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-4 sm:mx-[10%] mt-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">AI Symptom Checker</h2>
        <p className="text-sm text-gray-500 mb-4">Describe your symptoms in plain language. The assistant will suggest specialties, brief descriptions, and possible next steps.</p>

        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full border p-3 rounded mb-3" rows={6} placeholder="e.g., I've had a fever and sore throat for 3 days, with occasional headache" />

        <div className="flex items-center gap-3">
          <button onClick={submit} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? 'Checking...' : 'Check'}</button>
          <button onClick={() => { setText(''); setResult(null); setError(null) }} className="px-3 py-2 border rounded">Clear</button>
        </div>

        {error && <div className="mt-4 text-red-500">{error}</div>}

        {result && (
          <div className="mt-6 space-y-4">
            {result.success ? (
              result.specialties ? (
                <div>
                  <h3 className="text-lg font-medium mb-2">Suggested specialties</h3>
                  <div className="grid gap-4">
                    {result.specialties.map((s, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-md border">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold">{s.name}</div>
                          {s.confidence && <div className="text-xs text-gray-500">{s.confidence}</div>}
                        </div>
                        {s.reason && <div className="text-sm text-gray-600 mt-2">{s.reason}</div>}
                        {s.treatment && <div className="text-sm text-gray-700 mt-2"><strong>Possible treatments:</strong> {s.treatment}</div>}
                        {s.description && <div className="text-sm text-gray-600 mt-2"><strong>About:</strong> {s.description}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium mb-2">AI output</h3>
                  <pre className="whitespace-pre-wrap bg-gray-50 p-3 rounded mt-2">{result.raw || JSON.stringify(result, null, 2)}</pre>
                </div>
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
