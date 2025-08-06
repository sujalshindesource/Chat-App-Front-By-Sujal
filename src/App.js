import React, { useEffect, useState } from 'react';
import Login from './mycmp/Login';
import Dashboard from './mycmp/Dashboard';
import Footer from './mycmp/Footer';
import Navbar from './mycmp/Navbar';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch("https://web-production-b2389.up.railway.app/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUser({ email: data.email });
          } else {
            localStorage.clear();
          }
        });
    }
  }, []);

  const isLoggedIn = user !== null;

  return (
    <div className="App">
      {!isLoggedIn && <Navbar />}
      
      {isLoggedIn ? (
        <Dashboard user={user} />
      ) : (
        <Login />
      )}

      {!isLoggedIn && <Footer />}
    </div>
  );
}

export default App;
