const jwt = require('jsonwebtoken');

module.exports = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.id}`);
    socket.join(socket.user.id);

    socket.on('sendMessage', (data) => {
      io.to(data.receiver).emit('newMessage', data);
    });

    socket.on('typing', (data) => {
      io.to(data.receiver).emit('userTyping', { sender: socket.user.id });
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.id}`);
    });
  });
};
