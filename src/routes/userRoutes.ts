import { Router } from 'express'

import userController from '../controllers/UserController'

import loginRequired from '../middlewares/loginRequired'

const router = Router()

router.get('/', loginRequired, userController.index)
router.get('/show/:id', userController.show)
router.put('/update/:id', userController.update)
router.post('/', userController.store)

export default router
