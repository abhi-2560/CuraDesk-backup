import express from 'express'
import { checkSymptoms } from '../controllers/symptomController.js'

const symptomRouter = express.Router()

// POST /api/user/symptom-check
symptomRouter.post('/symptom-check', checkSymptoms)

export default symptomRouter
