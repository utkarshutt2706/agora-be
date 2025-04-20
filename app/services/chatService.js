import Chat from '../models/chatModel.js';
import { chatSchema } from '../schemas/chatSchema.js';

export const saveChat = async (socketMessage) => {
  try {
    const validateResponse = chatSchema.validate(socketMessage);
    if (validateResponse) {
      if (validateResponse.error) {
        throw new Error(validateResponse.error.message);
      }
    }

    const chat = new Chat({
      authorId: socketMessage.authorId,
      authorName: socketMessage.authorName,
      body: socketMessage.body,
      type: socketMessage.type,
      roomId: socketMessage.roomId,
      extra: socketMessage.extra,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await chat.save();
  } catch (error) {
    throw error;
  }
};

export const getChatsByRoomId = async (roomId) => {
  try {
    if (!roomId) {
      throw new Error('Invalid room');
    }
    const chats = await Chat.find({ roomId });
    if (chats && chats.length) return chats.map((chat) => chat.toJSON());
    else throw new Error('No chats found for the given room ID');
  } catch (error) {
    throw error;
  }
};

export const getChatsByUserId = async (userId) => {
  try {
    if (!userId) {
      throw new Error('Invalid user');
    }
    const chats = await Chat.find({ author: userId });
    if (chats && chats.length) return chats.map((chat) => chat.toJSON());
    else throw new Error('No chats found for the given user ID');
  } catch (error) {
    throw error;
  }
};
