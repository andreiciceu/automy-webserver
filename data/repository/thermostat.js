const db = require('../mysql.js');
const config = require('../../config/parameters');
const moment = require('moment');

function getLoggedStatesBetween(start, end) {
  const fStart = moment(start).format('YYYY-MM-DD HH:mm:ss');
  const fEnd = moment(end).format('YYYY-MM-DD HH:mm:ss');

  return db.query(
    `SELECT * FROM ${config.thermostat.stateTable} WHERE ? <= timestamp AND timestamp <= ?`,
    [fStart, fEnd],
  );
}


module.exports = {
  getLoggedStatesBetween,
};
