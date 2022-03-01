import * as React from 'react';
import logo from '../../logo.svg';
import './App.css';
import { api } from '../../services/http';
import Secrets from '../../services/secrets';

function App() {
  const [student, setStudentHealth] = React.useState();
  api({ url: `${Secrets.url.studentApi}/health`, method: 'GET' })
    .then(health => setStudentHealth(health))

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{student}</p>
      </header>
    </div>
  );
}

export default App;