import express from 'express';
import { v4 as uuid } from 'uuid';

const router = express.Router();

const users = [
  {
    id: uuid(),
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
  },
  {
    id: uuid(),
    firstName: 'Jane',
    lastName: 'Doe',
    age: 24,
  },
];

// all routes in here are starting with /users
router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === id);

  res.send(user);
});

router.post('/', (req, res) => {
  const { firstName, lastName, age } = req.body;
  const newUser = {
    id: uuid(),
    firstName,
    lastName,
    age,
  };

  users.push(newUser);

  res.send(`User ${firstName} ${lastName} added successfully`);
});

export default router;
