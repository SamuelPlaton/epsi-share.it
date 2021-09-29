import React from 'react';
import AppRouter from './router/AppRouter';
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <AppRouter/>
      </header>
    </div>
  );
}

export default App;
