var db = require('../util/database');
var userService = require('../services/user-service')(db);
var functions = require('../util/functions');

var userController = function(){

    var getUser = function(req, res){
        userService.getUserByParam(req.params.userID, function(err, user){
            return functions.sendResponse(res, user, 200, err);
        });
    };

    var postNewUser = function(req, res){
        // Password encryption
        if(req.body.password){
            req.body.password = functions.handleStringEncryption(req.body.password);
        }

        validateEmail(req.body, function(errValidate, emailExists){
            if(errValidate){
                return res.status(500).json(errValidate);
            }

            if(emailExists){
                return res.status(200).json('E-mail already in use! User account was not created.');
            }

            // Starts with an enpty plans array
            req.body.plans = [];

            userService.saveUser(req.body, function(err, user){
                return functions.sendResponse(res, user, 201, err);
            });
        });
    };

    var validateEmail = function(data, callback){
        if(!data.email){
            var error = new Error(`The key 'email' was not found in your json document file.`);
            return callback(error, null);
        }

        userService.getUserByParam(data.email, function(err, user){
            if(err){
                return callback(err, null);
            }
            var userExists = false;
            if(user){
                userExists = true;
            }
            return callback(null, userExists);
        });
    };

    return{
        getUser: getUser,
        postNewUser: postNewUser,
        validateEmail: validateEmail
    };
};

module.exports = userController();
