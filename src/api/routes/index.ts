import { Router } from 'express';
import tasksRouter from './task';

const router = Router();
router.use('/tasks', tasksRouter);

export default router;