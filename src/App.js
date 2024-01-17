import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  function handleClick() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://arbufe49zb.execute-api.eu-north-1.amazonaws.com/V1/create');
    to_send = {
      "name" : "B",
      "table_nr" : 1,
      "tables" : "[\"qwe\"]",
      "uuid" : "368ce544-2973-4240-8f93-2183497558ef"
    }
    xhr.onload = function() {
      if (xhr.status === 200) {
        setData(JSON.parse(xhr.responseText));
      }
    };
    xhr.send(to_send);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello amplify
        </a>

        <div>
        <button onClick={handleClick}>Get Data</button>
        {data ? <div>{JSON.stringify(data)}</div> : <div>Loading...</div>}
        </div>

      </header>
    </div>
  );
}

export default App;
