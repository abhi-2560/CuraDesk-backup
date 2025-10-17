import express from 'express'
import { checkSymptoms } from '../controllers/symptomController.js'

const router = express.Router()

// POST /api/user/symptom-check
router.post('/symptom-check', checkSymptoms)

export default router
