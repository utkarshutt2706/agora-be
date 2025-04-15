import Message from '../models/messageModel.js';

export const getMessagesByRoomId = async (roomId) => {
  try {
    const messages = await Message.find({ roomId });
    if (messages && messages.length) return messages;
    else throw new Error('No message found for the given room ID');
  } catch (error) {
    throw error;
  }
};

export const saveMessage = async (socketMessage) => {
  const message = new Message({
    author: socketMessage.userId,
    body: socketMessage.body,
    date: Date.now(),
    title: socketMessage.title,
    roomId: socketMessage.roomId,
  });

  await message.save();
};
