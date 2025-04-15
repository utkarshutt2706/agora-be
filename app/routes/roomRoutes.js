import express from 'express';
import { getAllRooms } from '../services/roomService.js';

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
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the room
 *         name:
 *           type: string
 *           description: The name of the chat room
 *         description:
 *           type: string
 *           description: Optional description of the chat room
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp of the room
 *         createdBy:
 *           type: string
 *           description: The ID or username of the room creator
 *         participants:
 *           type: array
 *           description: List of users currently in the room
 *           items:
 *             type: string
 *         isPrivate:
 *           type: boolean
 *           description: Indicates if the room is private
 *         lastActivity:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the last message in the room
 *       example:
 *         id: "room123"
 *         name: "General Discussion"
 *         description: "Room for general topics"
 *         createdAt: "2023-04-10T08:15:00.000Z"
 *         createdBy: "admin"
 *         participants: ["user1", "user2", "user3"]
 *         isPrivate: false
 *         lastActivity: "2023-04-15T14:22:00.000Z"
 */

/**
 * @swagger
 * /api/room/all:
 *   get:
 *     summary: Get all chat rooms
 *     description: Retrieve a list of all available chat rooms
 *     tags: [Room]
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
router.get('/room/all', async (req, res) => {
  try {
    const rooms = await getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
