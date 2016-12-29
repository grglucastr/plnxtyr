var express = require('express');
var router = express.Router();
var plansController = require('../controllers/plan-controller');

var plans = function(){

    router.route('/api/users/:userID/plans/')
          .get(plansController.getAllPlans);

    return router;
}
module.exports = plans();
