import Room from '../models/roomModel.js';

export const createRoom = async (socketMessage) => {
  try {
    const room = new Room({
      author: socketMessage.userId,
      createdAt: Date.now(),
      currentOnlineCount: 0,
      active: true,
      name: socketMessage.name,
    });
    await room.save();
  } catch (error) {
    throw error;
  }
};

export const getAllRooms = async () => {
  try {
    const rooms = await Room.find();
    if (rooms && rooms.length) {
      return rooms;
    } else {
      throw new Error('No rooms found');
    }
  } catch (error) {
    throw error;
  }
};

export const joinRoomById = async (roomId) => {
  try {
    const room = await Room.findById(roomId);
    if (room) {
      room.currentOnlineCount = (room.currentOnlineCount || 0) + 1;
      await room.save();
    } else {
      throw new Error('No room found with the given room ID');
    }
  } catch (error) {
    throw error;
  }
};

export const toggleRoomStatus = async () => {
  try {
    const room = await Room.findById(roomId);
    if (room) {
      room.active = !room.active;
      await room.save();
    } else {
      throw new Error('No room found with the given room ID');
    }
  } catch (error) {
    throw error;
  }
};
