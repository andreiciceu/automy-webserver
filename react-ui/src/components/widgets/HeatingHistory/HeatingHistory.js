import React, { Component } from 'react';
import moment from 'moment';
import  { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import api from '../../../utils/api';
import './style.css';

export default class Thermostat extends Component {
  constructor() {
    super();
    this.state = {
      states: null,
      start: moment().subtract(10, 'days'),
      end: moment(),
    };
  }

  async _getHeatingHistory() {
    try {
      let rs = await api.get(`/heating/log?start=${this.state.start.toISOString()}&end=${this.state.end.toISOString()}`, true);
      this.setState({states: rs.data.states
        .map( entry => {
          entry.timestamp = moment(entry.timestamp).unix();
          entry.heatingOn = entry.heatingOn ? entry.currentTemperature : null;
          return entry;
        }).filter( entry => entry.timestamp > 0 )
      });
    }
    catch (err) {
      console.warn('Fail to get status', err);
    }
  }

  async componentDidMount() {
    this._getHeatingHistory();
    this._updateInterval = setInterval(this._getHeatingHistory.bind(this), 60000);
  }

  componentWillUnmount() {
    clearInterval(this._updateInterval);
  }

  render() {
    if (!this.state.states) return (
      <div>
        Data not loaded for temperature chart
      </div>
    );

    return (
      <div className="heating-history-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={600}
            height={400}
            data={this.state.states}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis
              dataKey="timestamp"
              domain={['auto', 'auto']}
              name="time"
              tickFormatter={ unixTime => moment.unix(unixTime).format('D/M HH:mm ') }
              type="number"
            />
            <YAxis domain={['auto', 'auto']} />
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip content={ () => console.log(...arguments) } />
            <Legend />
            <Line type="monotone" dot={false} dataKey="currentTemperature" stroke="#8884d8" activeDot={{r: 8}}/>
            <Line type="monotone" dot={false} dataKey="desiredTemperature" stroke="#82ca9d" />
            <Line type="monotone" dot={false} dataKey="heatingOn" stroke="red" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}