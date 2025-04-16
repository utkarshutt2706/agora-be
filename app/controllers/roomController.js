import { createRoom, getAllRooms } from '../services/roomService.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllRoomsHandler = async (_, res) => {
  try {
    const rooms = await getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createRoomHandler = async (req, res) => {
  try {
    const roomId = await createRoom(req.body);
    res.status(200).json({ message: 'Room created successfully', roomId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
