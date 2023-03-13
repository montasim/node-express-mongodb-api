import { StatusCodes } from 'http-status-codes';
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

export const getUsers = async (req, res) => {
  try {
    res.status(StatusCodes.OK).send(res.paginatedResults);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);

    if (foundUser) {
      res.status(StatusCodes.OK).send(foundUser);
    } else {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'User not found!' });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

export const createUser = async (req, res) => {
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

      res
        .status(StatusCodes.CREATED)
        .send(`User ${firstName} ${lastName} added successfully`);
    } else {
      res.status(StatusCodes.BAD_REQUEST).send({ message: 'Invalid data' });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);

    if (foundUser) {
      users = users.filter((user) => user.id !== id);

      res
        .status(StatusCodes.OK)
        .send(
          `User ${foundUser?.firstName} ${foundUser?.lastName} deleted successfully`
        );
    } else {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'User not found!' });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

export const updateProvidedUserData = async (req, res) => {
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
          .status(StatusCodes.OK)
          .send(
            `User ${foundUser?.firstName} ${foundUser?.lastName} updated successfully`
          );
      } else {
        res.status(StatusCodes.BAD_REQUEST).send('Invalid data');
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'User not found!' });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const updateOverallUserData = async (req, res) => {
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
          .status(StatusCodes.OK)
          .send(
            `User ${foundUser.firstName} ${foundUser.lastName} updated successfully`
          );
      } else {
        res.status(StatusCodes.BAD_REQUEST).send('Invalid data');
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'User not found!' });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
