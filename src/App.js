import React, { useState, useEffect } from 'react';
import Preloader from './Components/Pre';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/Navbar';
import SignUp from './Components/SignupPage/SignUp';
import Blog from './Components/Blog/Blog'
import SignIn from './Components/LoginPage/SignIn';
import Dashboard from './Components/Dashboard/Dashboard'

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.jwt;
}

function getUsername() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.name;
}

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function App() {
  const [load, upadateLoad] = useState(null);
  const token = getToken();
  const username = getUsername();

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const Hello_Message=()=>{
    if(token){
      return(
        <>
          Hello, {username}
        </>
      )
    }
  }

  return (
    <Router>
      <Preloader load={load} />
      <div id={load ? "no-scroll" : "scroll"}>
        <NavBar />
        <Hello_Message />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Login" exact element={<SignIn setToken={setToken}/>}/>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Blog" element={<Blog />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
