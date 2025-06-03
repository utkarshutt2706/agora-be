import Chat from '../models/chatModel.js';
import { chatSchema } from '../schemas/chatSchema.js';

export const saveChat = async (socketMessage, user) => {
  try {
    const validateResponse = chatSchema.validate(socketMessage);
    if (validateResponse && validateResponse.error) {
      throw new Error(validateResponse.error.message, { cause: 400 });
    }

    const chat = new Chat({
      authorId: user._id,
      authorName: user.fullName,
      body: socketMessage.body,
      type: socketMessage.type,
      roomId: socketMessage.roomId,
      extra: socketMessage.extra,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const savedChat = await chat.save();
    if (savedChat) {
      return savedChat.toJSON();
    } else {
      throw new Error('An error occured while saving the chat', {
        cause: 500,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const getChatsByRoomId = async (roomId) => {
  try {
    if (!roomId) {
      throw new Error('Invalid room ID', { cause: 400 });
    }
    const chats = await Chat.find({ roomId }).sort({ createdAt: 1 });
    if (chats) return chats.map((chat) => chat.toJSON());
    else
      throw new Error('No chats found for the given room ID', { cause: 404 });
  } catch (error) {
    throw error;
  }
};

export const getChatsByUserId = async (userId) => {
  try {
    if (!userId) {
      throw new Error('Invalid user ID', { cause: 400 });
    }
    const chats = await Chat.find({ author: userId });
    if (chats) return chats.map((chat) => chat.toJSON());
    else
      throw new Error('No chats found for the given user ID', { cause: 404 });
  } catch (error) {
    throw error;
  }
};
