const express = require('express');
const fs = require('fs');
const moment = require('moment');
const thermostatRepository = require('../data/repository/thermostat');
const config = require('../config/parameters');

const router = express.Router();


/* GET heating state */
router.get('/', (req, res) => {
  try {
    let state = fs.readFileSync(config.thermostat.stateFilePath, 'utf8');
    if (state) {
      state = JSON.parse(state);
      return res.send({ state });
    }
    return { error: 'cannot read state' };
  } catch (error) {
    return res.status(500).send({ message: 'Cannot open state.json from thermostat', error });
  }
});


router.get('/log', async (req, res) => {
  try {
    const start = moment(req.query.start);
    const end = moment(req.query.end);
    const states = await thermostatRepository.getLoggedStatesBetween(start, end);

    res.send({ start, end, states });
  } catch (error) {
    res.status(500).send({ message: 'Cannot get logs', error });
  }
});

module.exports = router;
