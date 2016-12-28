var express = require('express');
var router = express.Router();
var plansController = require('../controllers/plan-controller');

var plans = function(){

    router.route('/api/users/:id/plans/')
          .get();

    return router;
}
module.exports = plans();
