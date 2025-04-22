import Room from '../models/roomModel.js';
import roomSchema from '../schemas/roomSchema.js';

export const createRoom = async (roomData, user) => {
  try {
    const validateResponse = roomSchema.validate(roomData);
    if (validateResponse && validateResponse.error) {
      throw new Error(validateResponse.error.message, { cause: 400 });
    }

    const room = new Room({
      authorId: user._id,
      authorName: user.fullName,
      name: roomData.name,
      description: roomData.description,
      isPrivate: roomData.isPrivate,
      currentOnlineCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      active: true,
    });
    const savedRoom = await room.save();
    if (savedRoom && savedRoom.id) return savedRoom.id;
    else
      throw new Error('An error occured while creating the room', {
        cause: 500,
      });
  } catch (error) {
    throw error;
  }
};

export const getAllRooms = async () => {
  try {
    const rooms = await Room.find();
    if (rooms) return rooms.map((room) => room.toJSON());
    else throw new Error('No rooms found', { cause: 404 });
  } catch (error) {
    throw error;
  }
};

export const joinRoomById = async (roomId) => {
  try {
    if (!roomId) {
      throw new Error('Invalid room ID', { cause: 400 });
    }
    const room = await Room.findById(roomId);
    if (room) {
      room.currentOnlineCount = (room.currentOnlineCount || 0) + 1;
      await room.save();
    } else {
      throw new Error('No room found with the given room ID', { cause: 404 });
    }
  } catch (error) {
    throw error;
  }
};

export const leaveRoomById = async (roomId) => {
  try {
    if (!roomId) {
      throw new Error('Invalid room ID', { cause: 400 });
    }
    const room = await Room.findById(roomId);
    if (room) {
      room.currentOnlineCount = (room.currentOnlineCount || 0) - 1;
      await room.save();
    } else {
      throw new Error('No room found with the given room ID', { cause: 404 });
    }
  } catch (error) {
    throw error;
  }
};

export const toggleRoomStatus = async (roomId) => {
  try {
    if (!roomId) {
      throw new Error('Invalid room ID', { cause: 400 });
    }
    const room = await Room.findById(roomId);
    if (room) {
      room.active = !room.active;
      await room.save();
    } else {
      throw new Error('No room found with the given room ID', { cause: 404 });
    }
  } catch (error) {
    throw error;
  }
};

export const toggleRoomPrivacy = async (roomId) => {
  try {
    if (!roomId) {
      throw new Error('Invalid room ID', { cause: 400 });
    }
    const room = await Room.findById(roomId);
    if (room) {
      room.isPrivate = !room.isPrivate;
      await room.save();
    } else {
      throw new Error('No room found with the given room ID');
    }
  } catch (error) {
    throw error;
  }
};
