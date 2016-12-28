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

    return{
        saveNewUser: saveNewUser,
        getUserByParam: getUserByParam
    }
};

module.exports = userService;
