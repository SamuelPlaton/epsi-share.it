import React from 'react';
import logo from '../assets/logo.svg';
import './../styles/App.css';
//import './styles/Login.css';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Login/>
        <Register/>
      </header>
    </div>
  );
}

export default App;
