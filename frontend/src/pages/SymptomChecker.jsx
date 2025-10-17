import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const samplePrompts = [
  "Fever, sore throat and mild headache for 3 days",
  "Sharp lower abdominal pain after eating",
  "Persistent cough and shortness of breath",
]

const SymptomChecker = () => {
  const { backendUrl } = useContext(AppContext)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const submit = async () => {
    if (!text.trim()) return toast.warn('Please describe your symptoms first')
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const url = (backendUrl || '').replace(/\/$/, '') + '/api/user/symptom-check'
      const { data } = await axios.post(url, { symptoms: text })
      setResult(data)
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Request failed'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const clear = () => {
    setText('')
    setResult(null)
    setError(null)
  }

  const copyResult = async (payload) => {
    try {
      await navigator.clipboard.writeText(typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2))
      toast.success('Copied to clipboard')
    } catch (e) {
      toast.error('Could not copy')
    }
  }

  return (
    <div className="mx-4 sm:mx-[10%] mt-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">AI Symptom Checker</h2>
            <p className="text-sm text-gray-500 mb-4">Describe your symptoms in plain language and get suggested specialties, short descriptions and possible next steps.</p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-gray-200 p-4 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              rows={6}
              placeholder="e.g., I've had a fever and sore throat for 3 days, with occasional headache"
            />

            <div className="flex items-center gap-3">
              <button
                onClick={submit}
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:opacity-60"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2"> <span className="loader h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> Checking...</span>
                ) : 'Check'}
              </button>
              <button onClick={clear} className="px-3 py-2 border rounded-lg">Clear</button>
              <div className="ml-auto text-sm text-gray-500">Tip: try a short sentence. Or pick a sample:</div>
            </div>

            <div className="mt-3 flex gap-2 flex-wrap">
              {samplePrompts.map((p, i) => (
                <button key={i} onClick={() => setText(p)} className="text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">{p}</button>
              ))}
            </div>

            {error && <div className="mt-4 text-red-500">{error}</div>}
          </div>

          <div className="w-40 hidden md:block text-center">
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100">
              <div className="text-xs text-indigo-600 font-semibold">How it works</div>
              <div className="text-sm text-gray-600 mt-2">We analyze your description and suggest specialties and next steps. This is not a diagnosis.</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {result && (
            <div className="space-y-4">
              {result.success ? (
                result.specialties && Array.isArray(result.specialties) ? (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Suggested specialties</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {result.specialties.map((s, i) => (
                        <div key={i} className="p-4 bg-white rounded-xl border shadow-sm card-enter">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-base font-semibold">{s.name || s.specialty || s.title}</div>
                              {s.confidence && <div className="text-xs text-gray-400 mt-1">Confidence: {s.confidence}</div>}
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => copyResult(s)} className="text-indigo-600 text-sm">Copy</button>
                            </div>
                          </div>
                          {s.description && <div className="text-sm text-gray-600 mt-3">{s.description}</div>}
                          {s.reason && <div className="text-sm text-gray-600 mt-2"><strong>Why:</strong> {s.reason}</div>}
                          {s.treatment && <div className="text-sm text-gray-700 mt-2"><strong>Possible treatments:</strong> {s.treatment}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-medium mb-2">AI output</h3>
                    <pre className="whitespace-pre-wrap bg-gray-50 p-3 rounded mt-2">{result.raw || JSON.stringify(result, null, 2)}</pre>
                    <div className="mt-2">
                      <button onClick={() => copyResult(result.raw || result)} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded">Copy output</button>
                    </div>
                  </div>
                )
              ) : (
                <div className="text-red-500">{result.message || 'Error'}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SymptomChecker
