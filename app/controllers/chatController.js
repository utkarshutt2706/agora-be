import { getChatsByRoomId } from '../services/chatService.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getChatsByRoomIdHandler = async (req, res) => {
  try {
    const { roomId } = req.params;
    const chats = await getChatsByRoomId(roomId);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
