var testLib = require('../util/tests-lib');
var db = require('../util/database');
var planService = require('../services/plan-service')(db);
var planController = require('../controllers/plan-controller');

describe('User service tests', function(){
    it('Should return array', function(done){
        testLib.request(testLib.app)
               .get('/api/users/58650c65229abd8260311a8d/plans')
               .expect(200)
               .end(function(err, u){
                   console.log(u);
                   done();
               });
    });
});
