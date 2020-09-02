import React from 'react';
import Routes from './router';

import Header from './header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes />
      </main>
    </div>
  );
}

export default App;
