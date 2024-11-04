import { Socket, Server } from 'socket.io';

const CHAT_EVENTS = {
  SEND_MESSAGE: 'chat::send',
  RECEIVE_MESSAGE: 'chat::receive',
  JOIN_ROOM: 'chat::join',
  DEFAULT: 'chat::default',
  DISCONNECT: 'disconnect',
} as const;

export default function socketChatHandler(io: Server, socket: Socket) {
  socket.on(CHAT_EVENTS.SEND_MESSAGE, message => {
    io.to(message.room).emit(CHAT_EVENTS.RECEIVE_MESSAGE, message.message); // broadcast to all clients in 'room'
    // io.to(message.room).emit(CHAT_EVENTS.RECEIVE_MESSAGE, message); // broadcast to all clients in 'room'
    // io.emit(CHAT_EVENTS.RECEIVE_MESSAGE, message); // broadcast to all clients
    // socket.broadcast.emit(CHAT_EVENTS.RECEIVE_MESSAGE, message); // broadcast to all clients except sender
    // io.to('room').emit(CHAT_EVENTS.RECEIVE_MESSAGE, message); // broadcast to all clients in 'room'
    // socket.to('room').emit(CHAT_EVENTS.RECEIVE_MESSAGE, message); // broadcast to all clients in 'room' except sender
  });

  socket.on(CHAT_EVENTS.JOIN_ROOM, data => {
    console.log(data);
    const room = data.room; // store room name in socket data
    socket.join(room); // join room with room name
    console.log(`Client connected: ${socket.id} in ${room} room :)`);
    socket.to(room).emit(CHAT_EVENTS.SEND_MESSAGE, `${socket.id}님이 ${room} 방에 입장하셨습니다.`);
  });

  socket.on(CHAT_EVENTS.DEFAULT, data => {
    console.log(data);
  });

  socket.on(CHAT_EVENTS.DISCONNECT, reason => {
    const room = socket.data.room; // retrieve room name from socket data
    if (room) {
      socket.leave(room); // leave room with room name
    }
    io.to(room).emit(CHAT_EVENTS.SEND_MESSAGE, `${socket.id}님이 ${room} 방에서 퇴장하셨습니다.`);
    console.log(`Client disconnected: ${socket.id}, ${reason} :(`);
  });
}
