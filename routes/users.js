import express from 'express';
import { v4 as uuid } from 'uuid';

const router = express.Router();

let users = [
  {
    id: 'd9838a50-64f2-4666-9619-5673d48e296e',
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
  },
  {
    id: '7eb7a167-9734-4651-9794-83c2b85164ed',
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

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  users = users.filter((user) => user.id !== id);

  res.send(
    `User ${foundUser?.firstName} ${foundUser?.lastName} deleted successfully`
  );
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  const { firstName, lastName, age } = req.body;

  firstName && (foundUser.firstName = firstName);
  lastName && (foundUser.lastName = lastName);
  age && (foundUser.age = age);

  res.send(
    `User ${foundUser?.firstName} ${foundUser?.lastName} updated successfully`
  );
});

export default router;
