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
  try {
    if (users.length > 0) {
      res.status(200).send(users);
    } else {
      res.status(404).send({ message: 'Users not found!' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUser = (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);

    if (foundUser) {
      res.status(302).send(foundUser);
    } else {
      res.status(404).send({ message: 'User not found!' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createUser = (req, res) => {
  try {
    const { firstName, lastName, age } = req.body;

    if (firstName && lastName && age) {
      const newUser = {
        id: uuid(),
        firstName,
        lastName,
        age,
      };

      users.push(newUser);

      res.status(201).send(`User ${firstName} ${lastName} added successfully`);
    } else {
      res.status(400).send('Invalid data');
    }
  } catch {
    res.status(500).send(error);
  }
};

export const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);

    if (foundUser) {
      users = users.filter((user) => user.id !== id);

      res
        .status(200)
        .send(
          `User ${foundUser?.firstName} ${foundUser?.lastName} deleted successfully`
        );
    } else {
      res.status(404).send({ message: 'User not found!' });
    }
  } catch {
    res.status(500).send(error);
  }
};

export const updateProvidedUserData = (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);

    if (foundUser) {
      const { firstName, lastName, age } = req.body;

      if (firstName || lastName || age) {
        firstName && (foundUser.firstName = firstName);
        lastName && (foundUser.lastName = lastName);
        age && (foundUser.age = age);

        res
          .status(200)
          .send(
            `User ${foundUser?.firstName} ${foundUser?.lastName} updated successfully`
          );
      } else {
        res.status(400).send('Invalid data');
      }
    } else {
      res.status(404).send({ message: 'User not found!' });
    }
  } catch {
    res.status(500).send(error);
  }
};

export const updateOverallUserData = (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);

    if (foundUser) {
      const { firstName, lastName, age } = req.body;

      if (firstName && lastName && age) {
        foundUser.firstName = firstName;
        foundUser.lastName = lastName;
        foundUser.age = age;

        res
          .status(200)
          .send(
            `User ${foundUser?.firstName} ${foundUser?.lastName} updated successfully`
          );
      } else {
        res.status(400).send('Invalid data');
      }
    } else {
      res.status(404).send({ message: 'User not found!' });
    }
  } catch {
    res.status(500).send(error);
  }
};
