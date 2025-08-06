import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKEND_URL || "https://your-railway-app.railway.app", {
  transports: ['websocket', 'polling']
});

export default socket;