const expect = require('chai').expect;
const request = require('request');
const assert = require('assert');
var app = require('../server');

// delay tests so express server has time to get up and running
setTimeout(function(){
    
//var agent = request.agent(app);


// wait for express app to come online
//before(function(done) {
//    app.on("appStarted", function(){
//        done();
//    });
//});

    // test GET /todos
    describe('TEST CRUD OPERATIONS --- /api/v1/todos', function(){
        let options = {
            url: 'http://0.0.0.0:8080/api/v1/todos',
            headers: 'Accept: application/json'
        };
        it('should return 200', function(done) {
            request.get(options, function(err, res, body){
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
    });
    
    // test POST /todos
    describe('POST /api/v1/todos', function(){
        let options = {
            url: 'http://0.0.0.0:8080/api/v1/todos',
            headers: 'Accept: application/json'
        };
        it('should return 201', function(done) {
            request.post('http://0.0.0.0:8080/api/v1/todos', {
                json: {
                    title: 'Write a todo app'
                }
            }, function(err, res, body){
                console.log(body.title);
                expect(res.statusCode).to.equal(201);
                expect(body.title).to.equal('Write a todo app');
                done();
            });
        });
    });

    // run test suite
    run();
}, 5000);
   
// test PUT /todos


// test DELETE /todos


