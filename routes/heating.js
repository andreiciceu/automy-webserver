var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET heating state */
router.get('/', function(req, res, next) {
  try {

    let data = fs.readFileSync(__dirname + '/../../thermostat/var/state.json', 'utf8');
    if (data) {
      data = JSON.parse(data);
      return res.send({state: data});
    }
  }
  catch(err) {}
  return res.send({error: "Cannot open state.json from thermostat"}, 400);
});

module.exports = router;
