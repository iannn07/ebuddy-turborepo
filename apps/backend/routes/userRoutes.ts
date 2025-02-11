import { Router } from 'express'
import { fetchAllUsers, fetchUser, updateUser } from '../controller/api'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.get('/fetch-all-user-data', authMiddleware, fetchAllUsers)
router.get('/fetch-user-data/:id', authMiddleware, fetchUser)
router.post('/update-user-data/:id', authMiddleware, updateUser)

export default router
