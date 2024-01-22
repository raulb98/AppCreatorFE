import React, { useState } from 'react';
import logo from '../../logo.svg';
import NavBar from '../Navbar';
import './login.css'

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
  
    return (
        <div className="App">
            <form action="https://3q8wgo8ddd.execute-api.eu-north-1.amazonaws.com/V1/read_client" method="GET">
                <div class="container">
                    
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="name" required></input>

                    <button type="submit">Login</button>
                
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
