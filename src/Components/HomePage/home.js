import React, { useState } from 'react';
import logo from '../../logo.svg';
import NavBar from '../Navbar';

function HomePage() {
    const [data, setData] = useState(null);
  
    return (
        <div className="App">
            <p>
                Home
            </p>
        </div>
    );
}

export default HomePage;
