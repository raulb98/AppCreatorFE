import React, { useState } from 'react';
import logo from '../../logo.svg';
import NavBar from '../Navbar';
import './login.css'
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('https://3q8wgo8ddd.execute-api.eu-north-1.amazonaws.com/V1/read_client?name=' + credentials.username, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => data.json())
}

function LoginPage({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    
    const handleSubmit = async e => {
        e.preventDefault();
        const tok = await loginUser({
          username
        });
        const token = "test_1";
        setToken(token);
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
