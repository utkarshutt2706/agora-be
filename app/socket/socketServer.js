import { Server } from 'socket.io';
import { setupEventHandlers } from './eventHandler.js';

const setupSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Setup all event handlers
    setupEventHandlers(io, socket);
  });

  return io;
};

export default setupSocketServer;
