import React from 'react'
import signup from './signup.css'
import { useState } from 'react';
export default function Login1() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  try {
    const response = await fetch("https://web-production-b2389.up.railway.app/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.success) {
      // Save JWT and email
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      alert("Login successful!");
      window.location.reload(); // or redirect to dashboard
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Server error");
  }
};

  return (
    <div className='Signup'>
      <div className="input">
        <p >Login : </p>

        <input type="text" name='email' placeholder='  Enter UserName : ' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name='password' placeholder='  Enter Password: ' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='Sign-in' style={{ fontSize: '1.1rem' }} onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}
