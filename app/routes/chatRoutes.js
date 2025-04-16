import express from 'express';
import { getChatsByRoomIdHandler } from '../controllers/chatController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       required:
 *         - id
 *         - author
 *         - body
 *         - roomId
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the chat message
 *         author:
 *           type: string
 *           description: The ID of the message sender
 *         body:
 *           type: string
 *           description: The main content of the chat message
 *         title:
 *           type: string
 *           description: Optional title for the chat message
 *         roomId:
 *           type: string
 *           description: The ID of the chat room
 *         date:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the message was created
 *       example:
 *         id: "66178e9f8efb5e001c92abcd"
 *         author: "66178a6b8efb5e001c927eaf"
 *         body: "What's the plan for today?"
 *         title: "Daily sync"
 *         roomId: "66178ab78efb5e001c9280cd"
 *         date: "2025-04-11T12:00:00.000Z"
 */

/**
 * @swagger
 * /api/chats/{roomId}:
 *   get:
 *     summary: Get all chats in a specific room
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the chat room
 *     responses:
 *       200:
 *         description: A list of chat messages in the room
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No chats found for the given room ID
 */

router.get('/chats/:roomId', getChatsByRoomIdHandler);

export default router;
