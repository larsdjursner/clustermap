import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import ReactMap from './features/map/ReactMap';

function App() {
  return (
    <div className="App">
        <ReactMap />
        {/* <Counter /> */}
    </div>
  );
}

export default App;
