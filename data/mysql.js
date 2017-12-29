const config = require('../config/parameters');
const mysql = require('mysql');
const connection = mysql.createConnection(config.mysql);

connection.connect();

module.exports = {
  connection,
  query(text, params) {
    return new Promise((resolve, reject) => {
      connection.query(text, params, (err, rows, fields) => {
        console.log(text, params);
        if (err) return reject(err);

        return resolve(rows, fields);
      });
    });
  },
  end() {
    connection.end();
  },
};
