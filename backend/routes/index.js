import express from 'express';
import userRouter from './userRouter.js';
import eventRouter from './eventRouter.js';
import authRouter from './authRouter.js';
import chatRouter from './chatRouter.js';
import mediaRouter from './mediaRouter.js';
//import mediaRouter from './mediaRouter.js';
const router = express.Router();

// router.use('/', authRouter);
router.use(userRouter);
router.use('/events',eventRouter);
router.use(chatRouter);
router.use('/media',mediaRouter);
export default router;