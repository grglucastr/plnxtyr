var userService = function(db){

    var saveNewUser = function(data, callback){
        var userCollection = db.get('users');
        userCollection.insert(data, function(err, user){
            if(err){
                return callback(err, null);
            }
            return callback(null, user);
        });
    };

    var getUserById = function(id, callback){
        var userCollection =  db.get('users');
        userCollection.findOne({_id:id}, function(err, user){
            if(err){
                return callback(err, null);
            }
            return callback(null, user);
        });
    };

    return{
        saveNewUser: saveNewUser,
        getUserById: getUserById
    }
};

module.exports = userService;