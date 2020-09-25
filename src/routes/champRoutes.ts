import { Router } from 'express'

import champControler from '../controllers/ChampControler'
import profileIconController from '../controllers/ProfileIconController'

const router = Router()
router.get('/1', champControler.champs1)
router.get('/2', profileIconController.champs2)

export default router
