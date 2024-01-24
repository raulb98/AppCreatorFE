import React, { useState } from 'react';
import logo from '../../logo.svg';
import NavBar from '../Navbar';
import './login.css'
import PropTypes from 'prop-types';
import sha256 from "crypto-js/sha256";
import { useJwt } from "react-jwt";

async function loginUser(credentials) {
    return fetch('https://3q8wgo8ddd.execute-api.eu-north-1.amazonaws.com/V1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.username,
        password: sha256(credentials.password).toString(),
      })
    }).then(data => data.json())
}

function LoginPage({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username, password
        });
        if(token?.token)
          setToken({"jwt" : token.token, "name" :username});
      }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <div class="container">
                    
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" onChange={e => setUserName(e.target.value)} required></input>

                    <label for="password"><b>Password</b></label>
                    <input type="text" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} required></input>

                    <button type="submit">Login</button>
                
                </div>
            </form>
        </div>
    );
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default LoginPage;
