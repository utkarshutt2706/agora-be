import express from 'express';
import { createUser } from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

router.post('/user', createUser);

export default router;
