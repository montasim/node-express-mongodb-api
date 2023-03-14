import httpStatus from 'http-status-codes';

export const validateCreateUser = (req, res, next) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.email) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: 'Missing required fields' });
  }
  next();
};

export const validateUpdateUser = (req, res, next) => {
  const updatedUser = req.body;
  if (!updatedUser.name && !updatedUser.email) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: 'Missing required fields' });
  }
  next();
};
