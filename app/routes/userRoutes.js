import express from 'express';
import {
  createUserHandler,
  getAllUserHandler,
  loginUserHandler,
} from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - email
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the user
 *         fullName:
 *           type: string
 *           description: The full name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         password:
 *           type: string
 *           format: email
 *           description: The password of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the user account was created
 *       example:
 *         id: "user123"
 *         fullName: "John Doe"
 *         email: "john@example.com"
 *         password: "hispassword123"
 *         createdAt: "2023-04-10T08:15:00.000Z"
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - fullName
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@example.com
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               username:
 *                 type: string
 *                 example: johndoe123
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Something went wrong
 */

router.post('/user', createUserHandler);

/**
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all registered users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

router.get('/user/all', getAllUserHandler);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticate a user using email and password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mypassword123
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or password
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.post('/user/login', loginUserHandler);

export default router;
