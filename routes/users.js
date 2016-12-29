var express = require('express');
var router = express.Router();
var userController = require('../controllers/user-controller');

var users = function(){
    router.route('/')
        .post(userController.postNewUser);

    router.route('/:userID')
        .get(userController.getUser);

    return router;
};

module.exports = users();
