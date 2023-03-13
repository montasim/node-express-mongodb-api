import express from 'express';
import bodyParser from 'body-parser';
import logger from './middleware/logger.js';
import usersRoutes from './routes/users.js';
import undefinedRoutes from './routes/undefined.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Custom middleware to save logs to file with IP address, location, browser name, and response data
app.use(logger);

// users routes
app.use('/users', usersRoutes);

// undefined routes
app.use(undefinedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost${PORT}`);
});
