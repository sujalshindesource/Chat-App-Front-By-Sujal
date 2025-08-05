import React from 'react';
import {
  Menu,
  MessageCircle,
  Phone,
  BookOpen,
  Star,
  Trash2,
  Settings,
  User
} from 'lucide-react';
import './settingstrip.css';

export default function SideStrip({ setActiveSection , logout}) {
  return (
    <div className="side-strip">
      {/* Top Section */}
      <div className="strip-top">
        <div className="icon-btn" onClick={() => setActiveSection('menu')}>
          <Menu size={22} />
        </div>
        <div className="icon-btn" onClick={() => setActiveSection('chat')}>
          <MessageCircle size={22} />
        </div>
        <div className="icon-btn" onClick={() => setActiveSection('call')}>
          <Phone size={22} />
        </div>
        <div className="icon-btn" onClick={() => setActiveSection('status')}>
          <BookOpen size={22} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="strip-bottom">
        <div className="icon-btn" onClick={() => setActiveSection('star')}>
          <Star size={22} />
        </div>
        <div className="icon-btn" onClick={() => setActiveSection('bin')}>
          <Trash2 size={22} onClick={logout} />
        </div>
        <div className="icon-btn" onClick={() => setActiveSection('settings')}>
          <Settings size={22} />
        </div>
        <div className="icon-btn profile-circle">
          <User size={20} />
        </div>
      </div>
    </div>
  );
}
