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
import Blog from './Components/Blog/Blog'
import SignIn from './Components/LoginPage/SignIn';
import Dashboard from './Components/Dashboard/Dashboard'
import Cookies from 'universal-cookie';

function getToken() {
  const cookie = new Cookies();
  const email = cookie.get("email");
  return email;
}

function getUsername() {
  const cookie = new Cookies();
  const email = cookie.get("email");
  return email;
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
            <Route path="/Blog" element={<Blog />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
