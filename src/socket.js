import io from 'socket.io-client';

const socket = io('https://web-production-926e5.up.railway.app/', {
  transports: ['websocket', 'polling'],
  upgrade: true,
  rememberUpgrade: true
});

export default socket;