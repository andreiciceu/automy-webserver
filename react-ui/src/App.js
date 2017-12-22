import React, { Component } from 'react';
import './App.css';
import Thermostat from './components/widgets/Thermostat';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Thermostat />
      </div>
    );
  }
}

export default App;
