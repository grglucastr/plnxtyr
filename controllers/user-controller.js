var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/plnxtyr');

var userService = require('../services/user-service')(db);

var userController = function(){

    var getUser = function(req, res){
        userService.getUserByParam(req.params.id, function(err, user){
            if(err){
                return res.status(500).json(err);
            }
            return res.status(200).json(user);
        });
    };

    var postNewUser = function(req, res){
        // Password encryption
        if(req.body.password){
            req.body.password = handleStringEncryption(req.body.password);
        }

        validateEmail(req.body, function(errValidate, emailExists){
            if(errValidate){
                return res.status(500).json(errValidate);
            }

            if(emailExists){
                return res.status(200).json('E-mail already in use! User account was not created.');
            }

            userService.saveNewUser(req.body, function(err, user){
                if(err){
                    return res.status(500).json(err);
                }
                return res.status(201).json(user);
            });
        });
    };

    var validateEmail = function(data, callback){
        if(!data.email){
            return callback(Error(`The key 'email' was not found in your json document file.`), null);
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

    function handleStringEncryption(str){
        const crypto = require('crypto');
        const secretkey = "Twilight 0f The Thunder G()d!";
        const cipher = crypto.createCipher('aes192', secretkey);
        var encrypted =  cipher.update(str, 'utf8', 'hex');
        return encrypted += cipher.final('hex');
    };

    function handleStringDecryption(str){
        const crypto = require('crypto');
        const secretkey = "Twilight 0f The Thunder G()d!";
        const decipher = crypto.createDecipher('aes192', secretkey);
        var decrypted = decipher.update(str, 'hex', 'utf8');
        return decrypted += decipher.final('utf8');
    };

    return{
        getUser: getUser,
        postNewUser: postNewUser,
        validateEmail: validateEmail
    };
};

module.exports = userController();
