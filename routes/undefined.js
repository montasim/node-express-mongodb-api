import express from 'express';
import { undefinedRoutes } from '../controllers/undefined.js';

const router = express.Router();

router.get('*', undefinedRoutes);

export default router;
