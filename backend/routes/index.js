import express from 'express';
import userRouter from './userRouter.js';
import eventRouter from './eventRouter.js';
import authRouter from './authRouter.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.use('/auth', authRouter);
router.use(userRouter);
router.use(eventRouter);
export default router;