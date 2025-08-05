import React from 'react'
import { CircleSmall, User } from 'lucide-react'
import { Phone, Video, Search } from 'lucide-react';
import './userpf.css'

export default function Userpf({ user, showCallButtons = true, isTyping = false }) {
    if (user) {
        return (
            <div className='userpf'>
                <div className="rh">
                    <div className="pf">
                        <div className="icon-btn profile-circle">
                            <User size={25} />
                        </div>
                    </div>
                    <div className="pkgname">
                        <p>{user.name}</p>
                        <p className={isTyping ? "typing-pulse" : ""} style={{
                            fontSize: '12px',
                            color: isTyping ? '#00d4aa' : '#888',
                            fontStyle: isTyping ? 'italic' : 'normal',
                            fontWeight: isTyping ? '500' : 'normal'
                        }}>
                            {isTyping ? (
                                <>
                                    typing<span className="typing-dots"></span>
                                </>
                            ) : (
                                "online"
                            )}
                        </p>
                    </div>
                </div>
                {showCallButtons && (
                    <div className="callservice">
                        <div className="call-icons">
                            <div className="icon-btn">
                                <Phone size={20} />
                            </div>
                            <div className="icon-btn">
                                <Video size={20} />
                            </div>
                        </div>
                        <div className="icon-btn">
                            <Search size={20} />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}