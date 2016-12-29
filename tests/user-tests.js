var testsLib = require('../util/tests-lib');
var db = require('../util/database');
var userService = require('../services/user-service')(db);
var userController = require('../controllers/user-controller');

describe('User test controller', function(){

    it('Should insert an user', function(done){
        var user = {
            name:'George Bentes',
            email:'george.bentes@gmail.com',
            password:'bugabugabugaae'
        };

        testsLib.request(testsLib.app)
                .post('/api/users/')
                .send(user)
                .expect(201)
                .end(function(err, user){
                    if(err){
                        return done(err);
                    }
                    done();
                });
    });

    it('Should be ok. Email exists!', function(done){
        var obj = {};
        obj.email = 'george.bentes@gmail.com';
        userController.validateEmail(obj, function(err, emailExists){
            if(err){
                return done(err);
            }
            emailExists.should.be.ok();
            done();
        });
    });

    it('Should be not ok. Email not exists!', function(done){
        var obj = {};
        obj.email = 'georgebentes@gmail.com';
        userController.validateEmail(obj, function(err, emailExists){
            if(err){
                return done(err);
            }
            emailExists.should.be.false();
            done();
        });
    });
});

describe('User service tests', function(){
    it('Should get a user by its email', function(done){
        var email = 'george.bentes@gmail.com';
        userService.getUserByParam(email, function(err, user){

            if(err){
                return done(err);
            }

            should.exist(user);
            done();
        });

    });

    it('Should get a user by its id', function(done){
        var id = '5863b2fc1d41dd4f7c5fde04';
        userService.getUserByParam(id, function(err, user){

            if(err){
                return done(err);
            }

            should.exist(user);
            done();
        });
    });
});
