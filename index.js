import express from 'express';
// const express = require('express'); // equivalent to previous lin
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost${PORT}`);
});
