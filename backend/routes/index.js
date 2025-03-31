import express from 'express';
import userRouter from './userRouter.js';
import eventRouter from './eventRouter.js';

const router = express.Router();


router.use('/user',userRouter);
router.use('/events',eventRouter); 

export default router;