import { Router } from 'express'

import tokenController from '../controllers/TokenController'

const router = Router()

router.post('/', tokenController.store)

export default router
