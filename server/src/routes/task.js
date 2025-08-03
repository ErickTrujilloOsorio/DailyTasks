import express from 'express';
import { createTask, getTasks, getTasksByStatus, updateTaskStatus, updateTask, deleteTask } from '../controllers/task.js';  

const router = express.Router();

router.get('/get', getTasks); // Get all tasks
router.get('/getByStatus/:status', getTasksByStatus); // Get tasks by status
router.post('/add', createTask); // Create a new task
router.put('/updateStatus/:id', updateTaskStatus); // Update task status
router.put('/updateTask/:id', updateTask); // Update task status
router.delete('/delete/:id', deleteTask); // Delete a task

export default router;