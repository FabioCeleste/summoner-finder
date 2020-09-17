import { Router } from 'express'

import userController from '../controllers/UserController'

const router = Router()

router.get('/', userController.index)
router.get('/show/:id', userController.show)
router.put('/update/:id', userController.update)
router.post('/', userController.store)

export default router
