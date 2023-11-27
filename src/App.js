// src/App.js
import React from 'react';
import './App.css';
import ComicStrip from './ComicStrip';

function App() {
    return (
        <div className="App">
            <h1>Comic Strip Generator</h1>
            <ComicStrip />
            {/* Add a button to generate the comic */}
        </div>
    );
}

export default App;
