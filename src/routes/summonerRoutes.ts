import { Router } from 'express'

import summonerController from '../controllers/SummonerController'
import loginRequired from '../middlewares/loginRequired'

const router = Router()

router.post('/', loginRequired, summonerController.store)
router.delete('/', loginRequired, summonerController.delete)
router.post('/favs', loginRequired, summonerController.index)

export default router
