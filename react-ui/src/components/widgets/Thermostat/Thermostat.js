import React, { Component } from 'react';
import './style.css';
import api from '../../../utils/api';
import { prettyPrintDate } from '../../../utils/date';

export default class Thermostat extends Component {
  constructor() {
    super();
    this.state = {
      thermo: null,
    };
  }

  async _getHeatingStatus() {
    try {
      let rs = await api.get('/heating', true);
      let data = rs.data.state;
      this.setState({thermo: data});
    }
    catch (err) {
      console.warn('Fail to get status', err);
    }
  }

  async componentDidMount() {
    this._getHeatingStatus();
    this._updateInterval = setInterval(this._getHeatingStatus.bind(this), 60000);
  }

  componentWillUnmount() {
    clearInterval(this._updateInterval);
  }

  render() {
    if (!this.state.thermo) return (
      <div>
        UNKNOWN state
      </div>
    );

    return (
      <div>
        <p>
          Heating state: {this.state.thermo.heatingOn === true ? 'ON' : 'OFF'}
          <br />
          Someone home: {this.state.thermo.someoneIsHome === true ? 'YES' : 'NO'}
          <br />
          Current temp: {this.state.thermo.currentTemperature} @ {prettyPrintDate(this.state.thermo.lastTemperatureUpdate)}
          <br />
          Desired temp: {this.state.thermo.desiredTemperature}
        </p>
      </div>
    );
  }
}