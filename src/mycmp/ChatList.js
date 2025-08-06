import React, { useEffect, useState } from 'react';
import { Edit, Menu, User } from 'lucide-react';
import Contact from './Contact';
import './chatlist.css';

export default function ChatList({ setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [input,setInput] = useState([])
  const currentUserEmail = localStorage.getItem('email');

  const handleRightClick = (e) =>{
     e.preventDefault(); // prevent default browser context menu
    alert('Right click detected! Show your custom menu here');
  }

  useEffect(() => {
    fetch("https://web-production-b2389.up.railway.app/users") 
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(u => u.email !== currentUserEmail);
        setUsers(filtered);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
      });
  },[]);

  return (
    <div className='list'>
      <div className="layer1">
        <div className="left"><p>Chat</p></div>
        <div className="right">
          <div className="right1">
            <Edit size={22} />
          </div>
          <div className="right1">
            <Menu size={22} />
          </div>
        </div>
      </div>

      <input type="text" className='search' placeholder='   🔎 Developed By Sujal : ' value={input}/>

      {users.map((user, index) => (
        <div className="u" key={index} onClick={() => setSelectedUser(user)} onContextMenu={handleRightClick}>
          <Contact user={{ name: user.name, lstseen: 'online', email: user.email }} />
        </div>
      ))}
    </div>
  );
}
