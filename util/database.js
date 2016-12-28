var database = function(){
    var mongo = require('mongodb');
    var monk = require('monk');
    var db = monk('localhost:27017/plnxtyr');
    return db;
};

module.exports = database();
