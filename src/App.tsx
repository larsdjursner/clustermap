import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import ClusterMap from './features/oldmap/ClusterMap';
import ReactMap from './features/map/ReactMap';

function App() {
  return (
    <div className="App">
        <ReactMap />
        {/* <ClusterMap /> */}
        {/* <Counter /> */}
    </div>
  );
}

export default App;
