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
        // Password encryption
        if(req.body.password){
            req.body.password = handlePasswordEncryption(req.body.password);
        }

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

    /**
    * Here below are the methods are used only in this controller.
    * There are not exported. There are not used outside this controller.
    **/
    function handlePasswordEncryption(password){
        const crypto = require('crypto');
        const secretkey = "Twilight 0f The Thunder G()d!";
        const cipher = crypto.createCipher('aes192', secretkey);
        var encrypted =  cipher.update(password, 'utf8', 'hex');
        return encrypted += cipher.final('hex');
    };

    function handlePasswordDecryption(password){
        const crypto = require('crypto');
        const secretkey = "Twilight 0f The Thunder G()d!";
        const decipher = crypto.createDecipher('aes192', secretkey);
        var decrypted = decipher.update(password, 'hex', 'utf8');
        return decrypted += decipher.final('utf8');
    };
};

module.exports = userController();
