import express from 'express';
import { getMessagesByRoom } from '../models/messageModel.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat message management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - id
 *         - user
 *         - content
 *         - roomId
 *         - timestamp
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the message
 *         user:
 *           type: string
 *           description: The username of the sender
 *         content:
 *           type: string
 *           description: The content of the message
 *         roomId:
 *           type: string
 *           description: The ID of the chat room
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The time when the message was sent
 *       example:
 *         id: "5f8d0f3e8b3a8b1c9c8b4567"
 *         user: "JohnDoe"
 *         content: "Hello, how are you?"
 *         roomId: "room123"
 *         timestamp: "2023-04-15T10:30:00.000Z"
 */

/**
 * @swagger
 * /api/messages/{roomId}:
 *   get:
 *     summary: Get all messages in a specific room
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: The room ID
 *     responses:
 *       200:
 *         description: A list of messages in the room
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
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
router.get('/messages/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await getMessagesByRoom(roomId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
