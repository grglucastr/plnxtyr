var userService = function(db){

    var saveUser = function(data, callback){
        var userCollection = db.get('users');
        userCollection.insert(data, function(err, user){
            if(err){
                return callback(err, null);
            }
            return callback(null, user);
        });
    };

    var getUserByParam = function(paramValue, callback){
        var criteria = {};

        if(paramValue.indexOf('@') > 0){
            criteria.email = paramValue;
        }else{
            criteria._id = paramValue;
        }

        var userCollection =  db.get('users');
        userCollection.findOne(criteria, function(err, user){
            if(err){
                return callback(err, null);
            }
            return callback(null, user);
        });
    };

    var updateUser = function(data, callback){
        var usersCollection = db.get('users');
        usersCollection.update({_id:data.id}, data, function(err, user){
            if(err){
                return callback(err);
            }
            return callback(null, user);
        });
    };

    return{
        saveUser: saveUser,
        getUserByParam: getUserByParam,
        updateUser: updateUser
    };
};

module.exports = userService;
