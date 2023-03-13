import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateProvidedUserData,
  updateOverallUserData,
} from '../controllers/users.js';

const router = express.Router();

// all routes in here are starting with /users
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateProvidedUserData);
router.put('/:id', updateOverallUserData);

export default router;
