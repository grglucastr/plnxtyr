var db = require('../util/database');
var plansService = require('../services/plan-service')(db);
var functions = require('../util/functions');

var planController = function(){
    var getAllPlans = function(req, res){
        return functions.sendResponse(res, null, 200, null);
    };

    return{
        getAllPlans: getAllPlans
    };
};

module.exports = planController();
