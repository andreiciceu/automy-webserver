const path = require('path');

module.exports = {
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'IAmEverywhere1!',
    database: 'thermostat',
  },
  thermostat: {
    stateTable: 'state',
    stateFilePath: path.join(__dirname, '/../../thermostat/var/state.json'),
  },
};
