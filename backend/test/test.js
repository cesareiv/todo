const expect = require('chai').expect;
const request = require('request');


const assert = require('assert');
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function () {
            assert.equal([1,2,3].indexOf(4), -1);
        });
    });
});

it('should return 200', function(done) {
    request('http://www.google.com', function(err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
    });
});



// test GET /todos
it('should return 200', function(done) {
    request.get('http://0.0.0.0:8080/api/v1/todos', function(err, res){
        expect(res.statusCode).to.equal(200);
        done();
    });
});

// test POST /todos
it('should return 201', function(done) {

    request.post('http://0.0.0.0:8080/api/v1/todos', {
        json: {
            title: 'Write a todo app'
        }
    }, function(err, res, body){
        expect(res.statusCode).to.equal(201);
        done();
    });
});

// test PUT /todos

// test DELETE /todos
