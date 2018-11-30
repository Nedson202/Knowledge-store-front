import socketIOClient from 'socket.io-client';

const socketConnection = () => {
  const socket = socketIOClient('127.0.0.1:4500',
    { transports: ['websocket'], upgrade: false }, { 'force new connection': true });
  // socket.on('chatData', data => console.log('connected', data));
  return socket;
};

export default socketConnection;