import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProvidedProjectData,
  updateOverallProjectData,
} from '../controllers/projects.js';
import {
  validateProjectId,
  validateCreateProject,
  validateUpdateProject,
} from '../validators/projects.js';
import pagination from '../middleware/pagination.js';

const router = express.Router();

// all routes in here are starting with /projects
router.get('/', pagination, getProjects);
router.get('/:id', validateProjectId, getProject);
router.post('/', validateCreateProject, createProject);
router.delete('/:id', deleteProject);
router.patch('/:id', updateProvidedProjectData);
router.put('/:id', validateUpdateProject, updateOverallProjectData);

export default router;
