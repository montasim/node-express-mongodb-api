import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';
import undefinedRoutes from './routes/undefined.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// users routes
app.use('/users', usersRoutes);

app.get('/', (req, res) => res.send(`Hello from Homepage.`));

// undefined routes
app.use(undefinedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost${PORT}`);
});
