import { getAllRooms } from '../services/roomService.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllRoomsHandler = async (_, res) => {
  try {
    const rooms = await getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
