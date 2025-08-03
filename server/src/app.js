import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.disable('x-powered-by'); // Disable the 'X-Powered-By' header

// Routes
import users from './routes/user.js';
import tasks from './routes/task.js';

app.use('/users', users);
app.use('/tasks', tasks);

app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DB_HOST}:${PORT}`);
} );