import { StatusCodes } from 'http-status-codes';

export const undefinedRoutes = async (req, res) => {
  try {
    res.status(StatusCodes.NOT_IMPLEMENTED).send({ message: error.message });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};
