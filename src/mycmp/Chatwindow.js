import React, { useEffect, useState, useRef } from 'react';
import { Mic, Smile, Send } from 'lucide-react';
import socket from '../socket';
import './chatwindow.css';
import Userpf from './Userpf';

export default function ChatWindow({ currentUser, selectedUser }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;
    fetch("https://web-production-926e5.up.railway.app/messages", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user1: currentUser.email, user2: selectedUser.email })
    })
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error("Msg fetch error:", err));

  }, [selectedUser]);

  useEffect(() => {
    socket.on('receive_message', (msg) => {
      // Only add message if I'm the receiver
      if (msg.receiver === currentUser.email && msg.sender === selectedUser.email) {
        setMessages(prev => [...prev, msg]);

        // Send delivery confirmation
        socket.emit('message_delivered', {
          timestamp: msg.timestamp,
          sender: msg.sender
        });
      }
    });

    socket.on('message_status_update', (data) => {
      console.log('Status update received:', data); // Debug line
      setMessages(prev =>
        prev.map(msg => {
          if (msg.timestamp === data.timestamp && msg.sender === currentUser.email) {
            console.log('Updating message status:', msg.text, 'to', data.status); // Debug line
            return { ...msg, status: data.status };
          }
          return msg;
        })
      );
    });

    socket.on('user_typing', (data) => {
      if (data.sender === selectedUser.email) {
        setOtherUserTyping(true);
      }
    });

    socket.on('user_stopped_typing', (data) => {
      if (data.sender === selectedUser.email) {
        setOtherUserTyping(false);
      }
    });

    return () => {
      socket.off('receive_message');
      socket.off('message_status_update');
      socket.off('user_typing');
      socket.off('user_stopped_typing');
    };
  }, [selectedUser, currentUser]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleMsgRight = (e, i) => {
    e.preventDefault()
    fetch("https://web-production-926e5.up.railway.app/messages", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user1: currentUser.email, user2: selectedUser.email, time: i })
    })
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error("Msg fetch error:", err));

  }

  const handleSend = () => {
    if (input.trim()) {
      const timestamp = new Date().toLocaleString('sv-SE').replace('T', ' ').slice(0, 19);

      const msg = {
        sender: currentUser.email,
        receiver: selectedUser.email,
        text: input,
        status: 'sent',
        timestamp: timestamp
      };

      // Add to UI immediately
      setMessages(prev => [...prev, msg]);

      // Send to backend
      socket.emit('send_message', {
        sender: currentUser.email,
        receiver: selectedUser.email,
        text: input,
        status: 'sent'
      });

      setInput('');
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById("msg-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-window">
      <Userpf user={selectedUser} isTyping={otherUserTyping} />

      <div className="chat-body" id='msg-container'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender === currentUser.email ? 'sent' : 'received'} ${msg.sender === currentUser.email ? `status-${msg.status || 'sent'}` : ''}`}
            id={`${msg.text}`}
            onContextMenu={(e) => {
              const i = msg.timestamp
              console.log(i)
              handleMsgRight(e, i)
            }}
          >
            <h4>{msg.text}</h4>
            <p style={{ fontSize: 'small', display: 'flex', justifyContent: 'end', alignItems: 'end' }}>{msg.timestamp}</p>
          </div>
        ))}
      </div>

      <div className="chat-input-area" style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: '#1a1a1a',
        gap: '10px',
        borderTop: '1px solid #333'
      }}>
        <Smile className="icon" />
        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            const value = e.target.value;
            setInput(value);

            if (value.trim() && !isTyping) {
              setIsTyping(true);
              socket.emit('typing', {
                sender: currentUser.email,
                receiver: selectedUser.email
              });
            }

            if (typingTimeoutRef.current) {
              clearTimeout(typingTimeoutRef.current);
            }

            typingTimeoutRef.current = setTimeout(() => {
              setIsTyping(false);
              socket.emit('stopped_typing', {
                sender: currentUser.email,
                receiver: selectedUser.email
              });
            }, 1000);
          }}
        />
        <Mic className="icon" />
        <Send className="icon send-btn" onClick={() => {
          console.log('SEND CLICKED, input value:', input);
          handleSend();
        }} />
      </div>
    </div>
  );
}
