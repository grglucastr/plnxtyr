var db = require('../util/database');
var plansService = require('../services/plan-service')(db);
var functions = require('../util/functions');

var planController = function(){
    var getAllPlans = function(req, res){
        plansService.listAllPlansByUser(req.params.userID, function(err, plans){
            return functions.sendResponse(res, plans, 200, err);
        });
    };

    return{
        getAllPlans: getAllPlans
    };
};

module.exports = planController();
