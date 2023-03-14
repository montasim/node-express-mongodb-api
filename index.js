import express from 'express';
import bodyParser from 'body-parser';
import logger from './middleware/logger.js';
import { connectToDb, disconnectFromDb } from './middleware/database.js';
import usersRoutes from './routes/users.js';
import projectsRoutes from './routes/projects.js';
import undefinedRoutes from './routes/undefined.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Custom middleware to save logs to file with IP address, location, browser name, and response data
app.use(logger);

app.use(connectToDb);

// users routes
app.use('/users', usersRoutes);

// projects routes
app.use('/projects', projectsRoutes);

app.use(disconnectFromDb);

// undefined routes
app.use(undefinedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
