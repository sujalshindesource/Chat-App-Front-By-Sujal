import React from 'react'
import signup from './signup.css'
import { useState } from 'react';
export default function Signup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await fetch("https://web-production-926e5.up.railway.app/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, number, password })
            });


            const data = await response.json();
            if (data.success) {
                alert("Signup successful!");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Server error");
        }
    };


    return (
        <div className='Signup'>
            <div className="input">
                <p>Sign - In :</p>
                <input type="email" placeholder="Enter Mail : " value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Enter UserName : " value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder="Enter Number : " value={number} onChange={(e) => setNumber(e.target.value)} />
                <input type="password" placeholder="Enter Password: " value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='Sign-in' style={{ fontSize: '1.1rem' }} onClick={handleSignup}>Sign-Up</button>

            </div>
        </div>
    )
}
