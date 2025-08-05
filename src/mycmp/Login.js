import React from "react";
import { useState } from "react";
import login from './login.css'
import Signup  from "./Signup";
import Login1 from "./Login1";
export default function Login() {
  const [islogin,setislogin] = useState(true);
  return (
    <div className="Login">
        <div className="holder">
            <div className="choose">
              <button onClick={() => setislogin(true)} style={{fontSize:'1.1rem'}}>Login</button>
              <button onClick={() => setislogin(false)} style={{fontSize:'1.1rem'}}>Signup</button>
            </div>
            <div className="form">
              {islogin ? <Login1/> : <Signup/>}
            </div>
            
        </div>
    </div>
  )
}
