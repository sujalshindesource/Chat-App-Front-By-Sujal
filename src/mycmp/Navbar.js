
import React from 'react'
import navbar from './navbar.css'
export default function Navbar() {
  return ( 
    <>
        <div className="navbar">
            <div className="logo">Logo here</div>
            <div className="ropt">
              <p>Support</p>
              <select name="drop" class="drop">
                <option value="1">English</option>
                <option value="2">Hindi</option>
              </select>
            </div>
            
        </div>
    </>
  )
}