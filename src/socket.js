import io from 'socket.io-client';

const socket = io('https://web-production-b2389.up.railway.app', {
  transports: ['websocket', 'polling'],
  upgrade: true,
  rememberUpgrade: true
});

export default socket;