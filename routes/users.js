import express from 'express';
import fs from 'fs';
import usersData from '../user.json' assert { type: 'json' };

const router = express.Router();

// all routes in here are starting with /users
router.get('/', (req, res) => {
  res.send(usersData);
});

export default router;
