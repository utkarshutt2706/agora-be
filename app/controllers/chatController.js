import { getChatsByRoomId, getChatsByUserId } from '../services/chatService.js';

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
    res.status(error.cause || 500).json({ error: error.message });
  }
};

export const getChatsByUserIdHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await getChatsByUserId(userId);
    res.json(chats);
  } catch (error) {
    res.status(error.cause || 500).json({ error: error.message });
  }
};
