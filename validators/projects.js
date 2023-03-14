import httpStatus from 'http-status-codes';

export const validateProjectId = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: 'Missing required fields' });
  } else if (typeof id !== 'string' || id.length !== 36) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: 'Invalid parameter' });
  } else {
    next();
  }
};

export const validateCreateProject = (req, res, next) => {
  const { name } = req.body;
  if (!name && typeof name !== 'string') {
    return res.status(httpStatus.BAD_REQUEST).json({ error: 'Missing required fields' });
  }
  next();
};

export const validateUpdateProject = (req, res, next) => {
  const updatedProject = req.body;
  if (!updatedProject.name) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: 'Missing required fields' });
  }
  next();
};
