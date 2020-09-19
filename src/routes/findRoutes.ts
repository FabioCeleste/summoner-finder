import { Router } from 'express'

import findContoller from '../controllers/SummonerFinder'

const router = Router()

router.post('/', findContoller.show)
router.post('/match', findContoller.match)

export default router
