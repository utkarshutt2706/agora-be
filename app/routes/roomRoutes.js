import express from 'express';
import { getAllRoomsHandler } from '../controllers/roomController.js';

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
 * /room/all:
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
