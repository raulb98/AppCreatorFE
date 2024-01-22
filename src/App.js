import HomePage from './Components/HomePage/home';
import React, { useState, useEffect } from 'react';
import Preloader from './Components/Pre';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Components/LoginPage/login';
import NavBar from './Components/Navbar';
import SignupPage from './Components/SignupPage/signup';

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
}

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function App() {
  const [load, upadateLoad] = useState(null);
  const token = getToken();

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const To_display=()=>{
    if(token){
      return(
        <>
          A mers ok;
        </>
      )
    }
  }
  

  return (
    <Router>
      <Preloader load={load} />
      <div id={load ? "no-scroll" : "scroll"}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" exact element={<LoginPage setToken={setToken}/>}/>
          <Route path="/SignUp" element={<SignupPage />} />
        </Routes>
        <To_display />
      </div>
    </Router>
  );
}

export default App;
