process.env.NODE_ENV = 'test';

const app = require('../server');
const mongoose = require('mongoose');

const expect = require('chai').expect;
const request = require('request');
const assert = require('assert');

const uri = 'http://0.0.0.0:8080/api/v1/todos';

// wait for express app to come online
before(function(done) {
    console.log("waiting for express...");
    app.on("appStarted", function(){
        done();
    });
});

describe('Todos', () => {
    beforeEach((done) => {
        let options = {
            url: 'http://0.0.0.0:8080/api/v1/todos',
            headers: 'Accept: application/json'
        };
        request.delete(options, function(err, res, body){
            done();
        });
    });
    
    
    // test GET
    describe('GET /api/v1/todos', function(){
        let options = {
            url: 'http://0.0.0.0:8080/api/v1/todos',
            headers: 'Accept: application/json'
        };
        it('should GET all the todos', function(done) {
            request.get(options, function(err, res, body){
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
        it('should GET a single todo', function(done) {
            // first create a new todo
            request.post('http://0.0.0.0:8080/api/v1/todos', {
                json : {
                    'title' : "Some task"
                }
            }, function(err, res, body) {
                let todo_id = body._id;
                request.get(`http://0.0.0.0:8080/api/v1/todos/${todo_id}`, function(err, res, body) {
                    let title = JSON.parse(body).title;
                    expect(title).to.equal("Some task");
                    expect(res.statusCode).to.equal(200);
                    done();
                });
            });
        });
        it('should not GET a do todo that is not there', function(done) {
            request.get('http://0.0.0.0:8080/api/v1/todos/123', function(err, res, body) {
                expect(res.statusCode).to.equal(404);
                done();
            });
        });
    });

    // test POST 
    describe('POST /api/v1/todos', function(){
        let options = {
            url: 'http://0.0.0.0:8080/api/v1/todos',
            headers: 'Accept: application/json'
        };
        it('should not POST a todo with no title', function(done) {
            request.post('http://0.0.0.0:8080/api/v1/todos', {
                json: {
                    no_title: 'no title'
                }
            }, function(err, res, body){
                expect(res.statusCode).to.equal(400);
                done();
            });
        });
        
        it('should POST a new todo', function(done) {
            request.post('http://0.0.0.0:8080/api/v1/todos', {
                json: {
                    title: 'Write a todo app'
                }
            }, function(err, res, body){
                expect(res.statusCode).to.equal(201);
                expect(body.title).to.equal('Write a todo app');
                done();
            });
        });
    });

    // test DELETE
    describe('DELETE /api/v1/todos', function(){
        let options = {
            url: 'http://0.0.0.0:8080/api/v1/todos',
            headers: 'Accept: application/json'
        };
        it('should DELETE all the todos', function(done) {
            request.del(options, function(err, res, body){
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
        it('should DELETE a single todo', function(done) {
            // first create a new todo
            request.post('http://0.0.0.0:8080/api/v1/todos', {
                json : {
                    'title' : "Some other task"
                }
            }, function(err, res, body) {
                let todo_id = body._id;
                request.del(`http://0.0.0.0:8080/api/v1/todos/${todo_id}`, function(err, res, body) {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
            });
        });
    });                           
                       
                        

    // test PUT
    describe('PUT /api/v1/todos/:id', function(){
        let options = {
            url: 'http://0.0.0.0:8080/api/v1/todos',
            headers: 'Accept: application/json'
        };
        it('should not PUT a todo that is not there', function(done) {
            request.put('http://0.0.0.0:8080/api/v1/todos/123', {
                json : {
                    'title' : 'Changed task'
                }
            }, function(err, res, body) {
                expect(res.statusCode).to.equal(404);
                done();
            });
        });
        it('should PUT-update a todo', function(done) {
            // first create a todo
            request.post('http://0.0.0.0:8080/api/v1/todos', {
                json : {
                    'title' : "Fake task"
                }
            }, function(err, res, body) {
                // we need new todos id to address it
                let todo_id = body._id;
                request.put(`http://0.0.0.0:8080/api/v1/todos/${todo_id}`, {
                    json : {
                        'title' : 'Changed task'
                    }
                }, function(err, res, body) {
                    expect(res.statusCode).to.equal(204);
                    done();
                }); 
            });
        });
    });
});
                                
                      
    
// spin express service down after completed tests
//after(function(done) {
//    app.server.close(()=>console.log("tests completed, server shutown"));
//    done();
//});

