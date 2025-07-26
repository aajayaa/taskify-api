import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';


import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';

// All routes are protected
router.use(auth);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
