import express from "express";
import { healthCheck } from "../controllers/healthController.js";

const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the server health status
 *     tags: [Health Check]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *                 message:
 *                   type: string
 *                   example: "Server is healthy"
 *                 timestamp:
 *                   type: string
 *                   example: "2025-04-12T12:34:56.789Z"
 */
router.get("/health", healthCheck);

export default router;
