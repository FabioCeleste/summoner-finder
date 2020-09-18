import { Router } from 'express'

import summonerController from '../controllers/SummonerController'
import loginRequired from '../middlewares/loginRequired'

const router = Router()

router.post('/', loginRequired, summonerController.store)
router.get('/', loginRequired, summonerController.index)

export default router
