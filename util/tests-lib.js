var testLibs = function(){
    return {
        should: require('should'),
        request: require('supertest'),
        app: require('../app')
    };
};
module.exports = testLibs();
