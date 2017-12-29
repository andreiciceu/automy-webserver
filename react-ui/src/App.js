import React, { Component } from 'react';
import './App.css';
import Thermostat from './components/widgets/Thermostat';
import HeatingHistory from './components/widgets/HeatingHistory';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Thermostat />
        <HeatingHistory />
      </div>
    );
  }
}

export default App;
