import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './containers/homePage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Number 8 Challenge</h1>
        </header>
        <div>
          <HomePage />
        </div>
      </div>
    );
  }
}

export default App;
