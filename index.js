import express from 'express';
// const express = require('express'); // equivalent to previous lin
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// users routes
app.use('/users', usersRoutes);

app.get('/', (req, res) => res.send(`Hello from Homepage.`));

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost${PORT}`);
});
