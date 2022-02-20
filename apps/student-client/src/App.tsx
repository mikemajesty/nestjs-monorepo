import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { api } from './services/httpService';
import Config from './config';

function App() {
  const [student, setStudentHealth] = useState();

  api({ url: `http://localhost:3000/health`, method: 'GET' }).then(health => setStudentHealth(health));
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{ student }</p>
      </header>
    </div>
  );
}

export default App;