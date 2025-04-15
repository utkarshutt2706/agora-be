import { saveMessage } from '../models/messageModel.js';

export const setupEventHandlers = (io, socket) => {
  // Join a room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
    io.to(roomId).emit('user_connected', socket.id);
  });

  // Send message to room
  socket.on('send_message', async (data) => {
    console.log('Message received:', data);
    const messageWithTimestamp = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    // Save message to database
    await saveMessage(data.room, messageWithTimestamp);

    // Broadcast to all users in the room
    io.to(data.room).emit('receive_message', messageWithTimestamp);
  });

  // User typing indicator
  socket.on('typing', (data) => {
    socket.to(data.room).emit('user_typing', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
};
