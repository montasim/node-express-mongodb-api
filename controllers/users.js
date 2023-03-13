import { v4 as uuid } from 'uuid';

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

export const getUsers = (req, res) => {
  res.send(users);
};

export const getUser = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
};

export const createUser = (req, res) => {
  const { firstName, lastName, age } = req.body;
  const newUser = {
    id: uuid(),
    firstName,
    lastName,
    age,
  };

  users.push(newUser);

  res.send(`User ${firstName} ${lastName} added successfully`);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);

  users = users.filter((user) => user.id !== id);

  res.send(
    `User ${foundUser?.firstName} ${foundUser?.lastName} deleted successfully`
  );
};

export const updateProvidedUserData = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  const { firstName, lastName, age } = req.body;

  firstName && (foundUser.firstName = firstName);
  lastName && (foundUser.lastName = lastName);
  age && (foundUser.age = age);

  res.send(
    `User ${foundUser?.firstName} ${foundUser?.lastName} updated successfully`
  );
};

export const updateOverallUserData = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  const { firstName, lastName, age } = req.body;

  foundUser.firstName = firstName;
  foundUser.lastName = lastName;
  foundUser.age = age;

  res.send(
    `User ${foundUser?.firstName} ${foundUser?.lastName} updated successfully`
  );
};
