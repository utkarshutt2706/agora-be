import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import { setupEventHandlers } from './eventHandler.js';

const setupSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://172.20.10.12:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(
        socket.handshake.query.token,
        process.env.JWT_SECRET,
        (err, decoded) => {
          if (err) {
            return next(new Error('Socket authentication failed'));
          }
          socket.user = decoded.sub;
          next();
        }
      );
    } else {
      next(new Error('Socket authentication failed'));
    }
  }).on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Setup all event handlers
    setupEventHandlers(io, socket);
  });

  return io;
};

export default setupSocketServer;
