require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const ALLOWED_ORIGIN = process.env.CLIENT_URL || 'http://localhost:5173';
const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

const ROOM_PASSWORD = process.env.ROOM_PASSWORD;
const activeUsers = new Map(); // socketId -> name

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('verify_password', (password, callback) => {
    if (password === ROOM_PASSWORD) {
      callback({ success: true });
    } else {
      callback({ success: false, error: 'Wrong password. Try again.' });
    }
  });

  socket.on('pick_name', (name, callback) => {
    const trimmed = name.trim().toLowerCase();
    if (trimmed.length !== 3 || !/^[a-z]+$/.test(trimmed)) {
      return callback({ success: false, error: 'Name must be exactly 3 letters (a-z).' });
    }
    const taken = [...activeUsers.values()].includes(trimmed);
    if (taken) {
      return callback({ success: false, error: `"${trimmed}" is already taken. Pick another.` });
    }
    activeUsers.set(socket.id, trimmed);
    io.emit('user_list', [...activeUsers.values()]);
    io.emit('system_message', `${trimmed} has joined the chat`);
    callback({ success: true, name: trimmed });
  });

  socket.on('send_message', (text) => {
    const name = activeUsers.get(socket.id);
    if (!name || !text || !text.trim()) return;
    const message = {
      id: Date.now() + Math.random(),
      name,
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };
    io.emit('new_message', message);
  });

  socket.on('disconnect', () => {
    const name = activeUsers.get(socket.id);
    if (name) {
      activeUsers.delete(socket.id);
      io.emit('user_list', [...activeUsers.values()]);
      io.emit('system_message', `${name} has left the chat`);
    }
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
