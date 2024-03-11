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

function getUsername() {
  const cookie = new Cookies();
  const email = cookie.get("email");
  return email;
}

function App() {
  const [load, upadateLoad] = useState(null);
  const email = getUsername();

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
            <Route path="/" element={<Dashboard />} />
            <Route path="/Login" exact element={<SignIn />}/>
            <Route path="/Blog" element={<Blog />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
