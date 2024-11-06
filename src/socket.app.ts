import express from 'express';
import { Server } from 'socket.io';
import socketChatHandler from './api/common/socket/socket';
import http from 'http';
import morgan from 'morgan';
import errorHandler from './api/common/middlewares/errorHandler.middleware';

const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(errorHandler);

const port = 4000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5000', 'http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => socketChatHandler(io, socket));

server.listen(port, () => {
  console.log(`SOCKET SERVER started at http://localhost:${port} ^-^`);
});
