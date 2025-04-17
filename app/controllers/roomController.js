import {
  createRoom,
  getAllRooms,
  toggleRoomPrivacy,
  toggleRoomStatus,
} from '../services/roomService.js';

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

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const toggleRoomStatusHandler = async (req, res) => {
  try {
    const { roomIdParam } = req.params;
    const roomId = await toggleRoomStatus(roomIdParam);
    res
      .status(200)
      .json({ message: 'Room status updated successfully', roomId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const toggleRoomPrivacyHandler = async (req, res) => {
  try {
    const { roomIdParam } = req.params;
    const roomId = await toggleRoomPrivacy(roomIdParam);
    res
      .status(200)
      .json({ message: 'Room privacy updated successfully', roomId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
