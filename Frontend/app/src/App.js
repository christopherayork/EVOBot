import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Routes/Home";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/' component={Home} />
      </Router>
    </div>
  );
}

export default App;
