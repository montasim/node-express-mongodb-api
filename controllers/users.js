import { StatusCodes } from 'http-status-codes';
import { v4 as uuid } from 'uuid';

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

      await req.db.collection('users').insertOne(newUser);

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
      await req.db.collection('users').deleteOne({ _id: userId });

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
