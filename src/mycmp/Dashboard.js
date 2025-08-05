import React, { useState, useEffect } from 'react';
import SettingStrip from './SettingStrip';
import ChatList from './ChatList';
import ChatWindow from './Chatwindow';
import SettingsPanel from './SettingsPanel';
import Wlcchat from './Wlcchat';
import socket from '../socket';
import './dash.css';

export default function Dashboard({ user }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeSection, setActiveSection] = useState('wlc'); 

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileView, setMobileView] = useState('list'); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleBack = () => {
      if (isMobile && mobileView === 'chat') {
        setMobileView('list');
      }
    };
    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, [isMobile, mobileView]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      if (
        data.sender === selectedUser?.email ||
        data.receiver === selectedUser?.email
      ) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => socket.off('receive_message');
  }, [selectedUser]);

  const handleSend = (text) => {
    if (!selectedUser) return;

    const messageData = {
      sender: user.email,
      receiver: selectedUser.email,
      text: text,
    };

    socket.emit('send_message', messageData);
    setMessages((prev) => [...prev, { ...messageData, sender: 'me' }]);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleUserSelect = (userObj) => {
    setSelectedUser(userObj);
    if (isMobile) {
      setMobileView('chat');
      window.history.pushState({}, '');
    }
  };

    const handleGlobalKey = (e) => {
    e.preventDefault();
    if (e.key === 'Escape') {
      setSelectedUser(false)
    }
  }

  return (
    <div className="strip" onKeyDown={handleGlobalKey}>
      <SettingStrip setActiveSection={setActiveSection} logout={handleLogout} />

      {activeSection === 'chat' && (
        <>
          {(!isMobile || mobileView === 'list') && (
            <ChatList setSelectedUser={handleUserSelect} />
          )}

          {(!isMobile || mobileView === 'chat') && selectedUser && (
            <ChatWindow
              currentUser={{ email: user.email }}
              selectedUser={selectedUser}
            />
          )}

          {(!selectedUser && !isMobile) && <Wlcchat />}
        </>
      )}
      {activeSection === 'wlc' && (
        <>
          <ChatList setSelectedUser={handleUserSelect} />
          <Wlcchat />
        </>
      )}

      {activeSection === 'settings' && <SettingsPanel />}
    </div>
  );
}
