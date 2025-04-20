import Room from '../models/roomModel.js';

export const createRoom = async (roomData) => {
  try {
    const room = new Room({
      name: roomData.name,
      description: roomData.description,
      authorId: roomData.userId,
      authorName: roomData.userName,
      isPrivate: roomData.isPrivate,
      currentOnlineCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      active: true,
    });
    const savedRoom = await room.save();
    if (savedRoom && savedRoom.id) {
      return savedRoom.id;
    } else {
      throw new Error('An error occured while creating the room');
    }
  } catch (error) {
    throw error;
  }
};

export const getAllRooms = async () => {
  try {
    const rooms = await Room.find();
    if (rooms && rooms.length) {
      return rooms.map((room) => room.toJSON());
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

export const leaveRoomById = async (roomId) => {
  try {
    const room = await Room.findById(roomId);
    if (room) {
      room.currentOnlineCount = (room.currentOnlineCount || 0) - 1;
      await room.save();
    } else {
      throw new Error('No room found with the given room ID');
    }
  } catch (error) {
    throw error;
  }
};

export const toggleRoomStatus = async (roomId) => {
  try {
    if (!roomId) {
      throw new Error('Invalid room');
    }
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

export const toggleRoomPrivacy = async (roomId) => {
  try {
    if (!roomId) {
      throw new Error('Invalid room');
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
