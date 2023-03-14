import { StatusCodes } from 'http-status-codes';
import { v4 as uuid } from 'uuid';

export const getProjects = async (req, res) => {
  try {
    const projects = await req.db.collection('projects').find().toArray();
    res.status(StatusCodes.OK).send(projects);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await req.db.collection('projects').find().toArray();
    const foundProject = projects.find((project) => project._id === id);

    if (foundProject) {
      res.status(StatusCodes.OK).send(foundProject);
    } else {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'Project not found!' });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name } = req.body;

    if (name) {
      const newProject = {
        _id: uuid(),
        name,
        creationTime: new Date(),
      };

      await req.db.collection('projects').insertOne(newProject);

      res.status(StatusCodes.CREATED).send(`Project ${name} added successfully`);
    } else {
      res.status(StatusCodes.BAD_REQUEST).send({ message: 'Invalid data' });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await req.db.collection('projects').find().toArray();
    const foundProject = projects.find((project) => project._id === id);

    if (foundProject) {
      await req.db.collection('projects').deleteOne({ _id: id });

      res.status(StatusCodes.OK).send(`Project ${foundProject?.name} deleted successfully`);
    } else {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'Project not found!' });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export const updateProvidedProjectData = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await req.db.collection('projects').find().toArray();
    const foundProject = projects.find((project) => project._id === id);

    if (foundProject) {
      const { name } = req.body;

      if (name) {
        name && (foundProject.name = name);

        res.status(StatusCodes.OK).send(`Project ${foundProject?.name} updated successfully`);
      } else {
        res.status(StatusCodes.BAD_REQUEST).send('Invalid data');
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'Project not found!' });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const updateOverallProjectData = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await req.db.collection('projects').find().toArray();
    const foundProject = projects.find((project) => project._id === id);

    if (foundProject) {
      const { name } = req.body;

      if (name) {
        await req.db
          .collection('projects')
          .updateOne({ $set: { name: name, lastUpdateTime: new Date() } });

        res.status(StatusCodes.OK).send(`Project ${foundProject.name} updated successfully`);
      } else {
        res.status(StatusCodes.BAD_REQUEST).send('Invalid data');
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'Project not found!' });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
