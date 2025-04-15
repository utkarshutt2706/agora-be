import { Server } from 'socket.io';

const initSocket = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('New connection');
  });
};

export { initSocket };
