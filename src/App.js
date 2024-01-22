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

function App() {
  const [load, upadateLoad] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div id={load ? "no-scroll" : "scroll"}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
