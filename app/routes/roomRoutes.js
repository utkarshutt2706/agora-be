import express from 'express';
import {
  createRoomHandler,
  getAllRoomsHandler,
} from '../controllers/roomController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Room
 *   description: Room management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - author
 *         - createdAt
 *         - active
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         name:
 *           type: string
 *           description: Name of the chat room
 *         author:
 *           type: string
 *           description: ID of the user who created the room
 *         active:
 *           type: boolean
 *           description: Whether the room is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Room creation timestamp
 *         currentOnlineCount:
 *           type: integer
 *           minimum: 0
 *           description: Number of currently online users in the room
 *       example:
 *         id: "643af5e9c8e7f4d1b8a9b1ab"
 *         name: "Tech Talk"
 *         author: "642ef5e9c8e7f4d1b8a9b199"
 *         active: true
 *         createdAt: "2024-04-10T08:15:00.000Z"
 *         currentOnlineCount: 3
 */

/**
 * @swagger
 * /api/room:
 *   post:
 *     summary: Create a new chat room
 *     description: Create a new room with the provided name and creator information
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - userId
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the chat room
 *               userId:
 *                 type: string
 *                 description: The ID of the user creating the room
 *             example:
 *               name: "Random Room"
 *               userId: "64a2b8f9c0a29d001f32abc1"
 *     responses:
 *       200:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Room created successfully
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Name and userId are required
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

router.post('/room', createRoomHandler);

/**
 * @swagger
 * /api/room/all:
 *   get:
 *     summary: Get all chat rooms
 *     tags: [Room]
 *     description: Returns a list of all available chat rooms
 *     responses:
 *       200:
 *         description: A list of chat rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No rooms found
 */

router.get('/room/all', getAllRoomsHandler);

export default router;
