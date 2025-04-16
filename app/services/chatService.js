import Chat from '../models/chatModel.js';

export const saveChat = async (socketMessage) => {
  try {
    const chat = new Chat({
      author: socketMessage.userId,
      body: socketMessage.body,
      date: Date.now(),
      title: socketMessage.title,
      roomId: socketMessage.roomId,
    });
    await chat.save();
  } catch (error) {
    throw error;
  }
};

export const getChatsByRoomId = async (roomId) => {
  try {
    const chats = await Chat.find({ roomId });
    if (chats && chats.length) return chats;
    else throw new Error('No chats found for the given room ID');
  } catch (error) {
    throw error;
  }
};

export const getChatsByUserId = async (userId) => {
  try {
    const chats = await Chat.find({ author: userId });
    if (chats && chats.length) return chats;
    else throw new Error('No chats found for the given user ID');
  } catch (error) {
    throw error;
  }
};
