// import 'dotenv/config'
// import axios from 'axios'

// let TextServiceClient = null
// try {
//   // optional dependency: @google/generative-ai
//   // load dynamically to avoid hard crash if not installed
//   // eslint-disable-next-line import/no-extraneous-dependencies, node/no-missing-require
//   TextServiceClient = (await import('@google/generative-ai')).TextServiceClient
//   console.log("text-service-client passed")
// } catch (e) {
//   // SDK not installed or failed to load; we'll fallback to heuristic when needed
//   TextServiceClient = null
//   console.log('Generative AI SDK not available, will use heuristic fallback if needed')
// }

// // Simple heuristic mapping if Gemini not configured
// const specialtyKeywords = [
//   { specialty: 'General Physician', keywords: ['fever', 'cough', 'cold', 'fatigue', 'headache'] },
//   { specialty: 'Neurologist', keywords: ['headache', 'seizure', 'numb', 'tingle', 'dizzy', 'dizziness', 'migraine'] },
//   { specialty: 'Cardiologist', keywords: ['chest pain', 'palpit', 'heart', 'shortness of breath', 'bp', 'blood pressure'] },
//   { specialty: 'Dermatologist', keywords: ['rash', 'itch', 'skin', 'acne', 'eczema'] },
//   { specialty: 'Orthopedist', keywords: ['pain in joint', 'joint pain', 'back pain', 'knee', 'hip', 'fracture'] },
//   { specialty: 'Psychiatrist', keywords: ['anxiety', 'depress', 'low mood', 'panic', 'insomnia'] },
//   { specialty: 'ENT', keywords: ['ear', 'nose', 'throat', 'hearing', 'sinus'] },
//   { specialty: 'Gastroenterologist', keywords: ['stomach', 'abdomen', 'nausea', 'vomit', 'diarrhea', 'constipation'] },
// ]

// export const checkSymptoms = async (req, res) => {
//   try {
//     const { symptoms } = req.body
//     if (!symptoms || !symptoms.trim()) return res.status(400).json({ success: false, message: 'Please provide symptoms' })

//     // If GEMINI_API_KEY present, attempt to use the Gemini SDK if available.
//     // If any step fails, we'll fall back to the local heuristic so the endpoint always returns a JSON response.
//     if (process.env.GEMINI_API_KEY && TextServiceClient) {
//       try {
//         console.log("try block of gemini api request")
//         const client = new TextServiceClient({ apiKey: process.env.GEMINI_API_KEY })
//         const prompt = `You are a medical triage assistant. The patient reports: "${symptoms}". Suggest up to 3 medical specialties (from this list: General Physician, Neurologist, Cardiologist, Dermatologist, Orthopedist, Psychiatrist, ENT, Gastroenterologist) that are most appropriate and a short reason for each. Optionally include a brief description and possible treatments. Return strictly parseable JSON: {\"specialties\": [{\"name\":\"...\",\"reason\":\"...\",\"description\":\"...\",\"treatment\":\"...\"}]}\n\nOnly output valid JSON.`

//         // model name for Gemini 1.5 Flash
//         const model = 'models/gemini-1.5-flash'

//         const resp = await client.generateText({
//           model,
//           // depending on SDK version the field may be 'input' or 'prompt'
//           input: prompt,
//           temperature: 0.2,
//           maxOutputTokens: 600,
//         })

//         // try to find text content in common response shapes
//         const content = resp?.text || resp?.data || resp?.candidates?.[0]?.content || resp?.candidates?.[0]?.output || resp?.output || null
//         const text = typeof content === 'string' ? content : (content?.[0]?.text || JSON.stringify(content || ''))

//         let parsed = null
//         try { parsed = JSON.parse(text) } catch (e) {
//           console.warn('Could not parse Gemini output as JSON; returning raw text and falling back to heuristic next')
//         }

//         if (parsed && parsed.specialties) {
//           return res.json({ success: true, specialties: parsed.specialties })
//         }

//         // If the SDK returned text but not JSON, return it as raw so the frontend can display it,
//         // but still also compute a heuristic fallback for usability.
//         if (text && text.trim()) {
//           // also compute heuristic in background (synchronous here) and include it as hint
//           const lower = symptoms.toLowerCase()
//           const matches = {}
//           specialtyKeywords.forEach((entry) => {
//             entry.keywords.forEach((kw) => {
//               if (lower.includes(kw)) matches[entry.specialty] = (matches[entry.specialty] || 0) + 1
//             })
//           })
//           const sorted = Object.keys(matches).sort((a, b) => matches[b] - matches[a])
//           const heuristic = sorted.length ? sorted.slice(0, 3).map(name => ({ name, reason: 'Matched on symptom keywords' })) : [{ name: 'General Physician', reason: 'Non-specific symptoms; GP is a good first contact' }]

//           return res.json({ success: true, raw: text, heuristic })
//         }
//       } catch (err) {
//         console.error('Gemini client call failed', err?.message || err)
//         // fallthrough to heuristic
//       }
//     }

//     // Heuristic fallback
//     // Heuristic fallback (always runs if Gemini SDK not available or Gemini call fails)
//     const lower = symptoms.toLowerCase()
//     const matches = {}
//     specialtyKeywords.forEach((entry) => {
//       entry.keywords.forEach((kw) => {
//         if (lower.includes(kw)) matches[entry.specialty] = (matches[entry.specialty] || 0) + 1
//       })
//     })

//     const sorted = Object.keys(matches).sort((a, b) => matches[b] - matches[a])
//     const result = sorted.length ? sorted.slice(0, 3).map(name => ({ name, reason: 'Matched on symptom keywords' })) : [{ name: 'General Physician', reason: 'Non-specific symptoms; GP is a good first contact' }]
//     return res.json({ success: true, specialties: result })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ success: false, message: 'Internal error' })
//   }
// }

// export default { checkSymptoms }import 'dotenv/config'import 'dotenv/config'
import { GoogleGenerativeAI } from "@google/generative-ai"

export const checkSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body

    if (!symptoms || !symptoms.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide symptoms',
      })
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Gemini API key not configured',
      })
    }

    console.log("Sending request to Gemini 1.5 Flash...")

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const prompt = `
      You are a medical triage assistant.
      The patient reports: "${symptoms}".
      Suggest up to 3 medical specialties (from this list:
      General Physician, Neurologist, Cardiologist, Dermatologist, Orthopedist, Psychiatrist, ENT, Gastroenterologist)
      that are most appropriate, with a short reason for each.
      Optionally include a brief description and possible treatments.
      Return strictly valid JSON:
      {
        "specialties": [
          { "name": "...", "reason": "...", "description": "...", "treatment": "..." }
        ]
      }
      Only output valid JSON — no explanations or text outside of the JSON.
    `

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    })

    const text = result.response.text()
    console.log("Gemini raw output:", text)

    const cleaned = text.replace(/^[^{]*({[\s\S]*})[^}]*$/, '$1')

    let parsed
    try {
      parsed = JSON.parse(cleaned)
    } catch (e) {
      console.error('Gemini output was not valid JSON:', cleaned)
      return res.status(500).json({
        success: false,
        message: 'Invalid JSON response from Gemini',
        raw: cleaned,
      })
    }

    if (!parsed?.specialties) {
      return res.status(500).json({
        success: false,
        message: 'No specialties found in Gemini response',
        raw: parsed,
      })
    }

    return res.json({
      success: true,
      specialties: parsed.specialties,
    })

  } catch (error) {
    console.error('Gemini API call failed:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

export default checkSymptoms
