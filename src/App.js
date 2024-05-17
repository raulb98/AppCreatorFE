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
import MainPage from './Components/Blog/Blog';
import SignIn from './Components/LoginPage/SignIn';
import MyToolbar from './Components/Dashboard/Toolbar';
import SignUpUser from './Components/SignupPage/signup';
import Cookies from 'universal-cookie';

function App() {
  const cookie = new Cookies();
  const name = cookie.get("n");
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
            <Route path="/MainPage" element={<MainPage />} />
            <Route path="/Dashboard" element={<MyToolbar />} />
            {name ? 
            <Route path="/Log In" exact element={<SignIn />}/> 
            : 
            <Route path="/Log Out" exact element={<SignIn />}/>
            }
            <Route path="/Signup" exact element={<SignUpUser />}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
