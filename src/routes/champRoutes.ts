import { Router } from 'express'

import champControler from '../controllers/ChampControler'

const router = Router()
router.get('/1', champControler.champs1)

export default router
