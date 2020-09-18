import { Router } from 'express'

import findContoller from '../controllers/SummonerFinder'

const router = Router()

router.post('/', findContoller.show)

export default router
