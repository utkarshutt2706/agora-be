import { saveChat } from '../services/chatService.js';
import { joinRoomById } from '../services/roomService.js';

export const setupEventHandlers = (io, socket) => {
  // Join a room
  socket.on('join_room', (roomId) => {
    try {
      socket.join(roomId);
      joinRoomById(roomId);
      io.to(roomId).emit('user_connected', socket.id);
    } catch (error) {
      socket.emit('join_error', {
        message: 'Failed to join room. Please try again.',
        error: error.message,
      });
    }
  });

  socket.on('leave_room', (roomId) => {
    try {
      socket.leave(roomId);
      leaveRoomById(roomId);
      io.to(roomId).emit('user_disconnected', socket.id);
    } catch (error) {
      socket.emit('leave_error', {
        message: 'Failed to leave room. Please try again.',
        error: error.message,
      });
    }
  });

  // Send message to room
  socket.on('send_message', async (data) => {
    try {
      await saveChat(data, socket.user);

      // Broadcast to all users in the room
      io.to(data.room).emit('receive_message', data);
    } catch (error) {
      // Send error message
      socket.emit('message_error', {
        message: 'Failed to send message. Please try again.',
        error: error.message,
      });
    }
  });

  // Typing indicator - start
  socket.on('typing_start', (roomId) => {
    socket.to(roomId).emit('user_typing_start', socket.user.fullName);
  });

  // Typing indicator - end
  socket.on('typing_end', (roomId) => {
    socket.to(roomId).emit('user_typing_end', socket.user.fullName);
  });

  // Handle disconnection
  socket.on('disconnect', () => {});
};
