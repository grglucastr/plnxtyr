var planService = function(db){

    // Important to use around the whole service file.
    var userService = require('../services/user-service')(db);

    var listAllPlansByUser = function(userId, callback){
        userService.getUserByParam(userId, function(err, user){
            if(err){
                return callback(err, null);
            }

            if(!user){
                return callback(null, null);
            }

            return callback(null, user.plans);
        });
    };

    var addNewPlan = function(userId, plan, callback){
        userService.getUserByParam(userId, function(err, user){
            if(err){
                return callback(err, null);
            }

            user.plans.push(plan);
            userService.saveUser(user, function(errUpdate, user){
                if(errUpdate){
                    return callback(errUpdate, null);
                }
                return callback(null, user);
            });
        });
    };

    return{
        listAllPlansByUser: listAllPlansByUser,
        addNewPlan: addNewPlan
    };
};
module.exports = planService;
