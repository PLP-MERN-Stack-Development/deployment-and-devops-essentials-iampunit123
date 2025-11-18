import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './users.js';
import tourRouter from './tours.js';
import bookingRouter from './bookings.js';
import reviewRouter from './reviews.js';


const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/tours', tourRouter);
router.use('/bookings', bookingRouter);
router.use('/reviews', reviewRouter);


export default router;