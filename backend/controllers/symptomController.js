import 'dotenv/config'
import axios from 'axios'
let TextServiceClient
try {
  // optional dependency: @google/generative-ai
  // load dynamically to avoid hard crash if not installed
  // eslint-disable-next-line import/no-extraneous-dependencies, node/no-missing-require
  TextServiceClient = (await import('@google/generative-ai')).TextServiceClient
} catch (e) {
  TextServiceClient = null
}

// Simple heuristic mapping if Gemini not configured
const specialtyKeywords = [
  { specialty: 'General Physician', keywords: ['fever','cough','cold','fatigue','headache'] },
  { specialty: 'Neurologist', keywords: ['headache','seizure','numb','tingle','dizzy','dizziness','migraine'] },
  { specialty: 'Cardiologist', keywords: ['chest pain','palpit','heart','shortness of breath','bp','blood pressure'] },
  { specialty: 'Dermatologist', keywords: ['rash','itch','skin','acne','eczema'] },
  { specialty: 'Orthopedist', keywords: ['pain in joint','joint pain','back pain','knee','hip','fracture'] },
  { specialty: 'Psychiatrist', keywords: ['anxiety','depress','low mood','panic','insomnia'] },
  { specialty: 'ENT', keywords: ['ear','nose','throat','hearing','sinus'] },
  { specialty: 'Gastroenterologist', keywords: ['stomach','abdomen','nausea','vomit','diarrhea','constipation'] },
]

export const checkSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body
    if (!symptoms || !symptoms.trim()) return res.status(400).json({ success: false, message: 'Please provide symptoms' })

    // If GEMINI_API_KEY present, try to call Gemini (via REST). If not, fallback to heuristic.
    if (process.env.GEMINI_API_KEY) {
      // Try Google Generative AI client first (Gemini 1.5 Flash)
      if (TextServiceClient) {
        try {
          const client = new TextServiceClient({ apiKey: process.env.GEMINI_API_KEY })
          const prompt = `You are a medical triage assistant. The patient reports: "${symptoms}". Suggest up to 3 medical specialties (from this list: General Physician, Neurologist, Cardiologist, Dermatologist, Orthopedist, Psychiatrist, ENT, Gastroenterologist) that are most appropriate and a short reason for each. Return JSON: {\"specialties\": [{\"name\":\"...\",\"reason\":\"...\"}]}`

          // model name for Gemini 1.5 Flash
          const model = 'models/gemini-1.5-flash'

          const resp = await client.generateText({
            model,
            // depending on SDK version the field may be 'input' or 'prompt'
            input: prompt,
            temperature: 0.2,
            maxOutputTokens: 300,
          })

          // try to find text content in common response shapes
          const content = resp?.text || resp?.data || resp?.candidates?.[0]?.content || resp?.candidates?.[0]?.output || resp?.output || null
          const text = typeof content === 'string' ? content : (content?.[0]?.text || JSON.stringify(content || ''))

          let parsed = null
          try { parsed = JSON.parse(text) } catch (e) { /* ignore */ }
          if (parsed && parsed.specialties) return res.json({ success: true, specialties: parsed.specialties })
          return res.json({ success: true, raw: text })
        } catch (err) {
          console.error('Gemini client call failed', err?.message || err)
          // fallthrough to REST/OpenAI style call
        }
      }

      // Fallback: call OpenAI-compatible endpoint (existing behavior)
      try {
        const prompt = `You are a medical triage assistant. The patient reports: "${symptoms}". Suggest up to 3 medical specialties (from this list: General Physician, Neurologist, Cardiologist, Dermatologist, Orthopedist, Psychiatrist, ENT, Gastroenterologist) that are most appropriate and a short reason for each. Return JSON: {"specialties": [{"name":"...","reason":"..."}]}`
        const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 300
        }, { headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` }})

        const text = resp.data?.choices?.[0]?.message?.content || resp.data?.choices?.[0]?.text || ''
        let parsed = null
        try { parsed = JSON.parse(text) } catch (e) { /* ignore */ }
        if (parsed && parsed.specialties) return res.json({ success: true, specialties: parsed.specialties })
        return res.json({ success: true, raw: text })
      } catch (err) {
        console.error('Fallback GEMINI REST call failed', err?.response?.data || err.message)
      }
    }

    // Heuristic fallback
    const lower = symptoms.toLowerCase()
    const matches = {}
    specialtyKeywords.forEach((entry) => {
      entry.keywords.forEach((kw) => {
        if (lower.includes(kw)) matches[entry.specialty] = (matches[entry.specialty] || 0) + 1
      })
    })

    const sorted = Object.keys(matches).sort((a,b) => matches[b] - matches[a])
    const result = sorted.length ? sorted.slice(0,3).map(name => ({ name, reason: 'Matched on symptom keywords' })) : [{ name: 'General Physician', reason: 'Non-specific symptoms; GP is a good first contact' }]
    return res.json({ success: true, specialties: result })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: 'Internal error' })
  }
}

export default { checkSymptoms }
