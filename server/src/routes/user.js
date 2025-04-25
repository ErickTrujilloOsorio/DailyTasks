import express from 'express';
import { registerUser, loginUser, getUsers, getUserById, getTasksByUserId } from '../controllers/user.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/login', loginUser);
router.get('/get', getUsers);
router.get('/:id', getUserById);
router.get('/:id/tasks', getTasksByUserId);

export default router;
