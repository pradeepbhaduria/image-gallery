import React from 'react';
import ImageList from './image-list';
import Header from './header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <ImageList />
      </main>
    </div>
  );
}

export default App;
