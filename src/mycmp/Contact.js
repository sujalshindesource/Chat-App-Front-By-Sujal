import React from 'react'
import {User} from 'lucide-react'
import './contct.css'
export default function Contact({user}) {
  return (
    <div className='contact'>
        <div className="pf">
            <User size={20} />
        </div>
        <div className="info">
            <p className='headpara'>{user.name}</p>
            <p>{user.lstseen}</p>
        </div>
    </div>
  )
}
