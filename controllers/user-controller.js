var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/plnxtyr');

var userService = require('../services/user-service')(db);

var userController = function(){

    var getUser = function(req, res){
        userService.getUserById(req.params.id, function(err, user){
            if(err){
                return res.status(500).json(err);
            }
            return res.status(200).json(user);
        })
    };

    var postNewUser = function(req, res){
        userService.saveNewUser(req.body, function(err, user){
            if(err){
                return res.status(500).json(err);
            }
            return res.status(201).json(user);
        });
    };

    return{
        getUser: getUser,
        postNewUser: postNewUser
    };
};

module.exports = userController();
