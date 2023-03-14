import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateProvidedUserData,
  updateOverallUserData,
} from '../controllers/users.js';
import { validateCreateUser, validateUpdateUser } from '../validators/users.js';
import pagination from '../middleware/pagination.js';

const router = express.Router();

// all routes in here are starting with /users
router.get('/', pagination, getUsers);
router.get('/:id', getUser);
router.post('/', validateCreateUser, createUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateProvidedUserData);
router.put('/:id', validateUpdateUser, updateOverallUserData);

export default router;
