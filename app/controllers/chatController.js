import { getMessagesByRoomId } from '../services/chatService.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getMessagesByRoomIdHandler = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await getMessagesByRoomId(roomId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
