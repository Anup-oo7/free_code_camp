import express from 'express'
import {signupUser, loginUser, verifyEmail}  from '../controller/user-controller.js';
import {courseRouter} from '../controller/courseDetails.js'
const router = express.Router()

router.post('/signup', signupUser)
router.post('/emailVerify', verifyEmail)
router.post('/login', loginUser)
router.get('/courses', courseRouter);

export default router;