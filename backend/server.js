/***
server.js -- 2019 Richard Hunter
***/

'use strict';

// import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// network settings
const PORT = 8080;
const DBPORT = 27017;
const HOST = '0.0.0.0';

const app = module.exports = express();
const router = express.Router();

const path_images = __dirname + '/images/';
const path_public = __dirname + '/public/';

// set up mongoose connection
const mongoDB = `mongodb://mongo:${DBPORT}/my_database`;

mongoose.connect(mongoDB, { useNewUrlParser: true}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Not connected to MongoDB ", err);
});

// get connection
const db = mongoose.connection;

// bind connection to error events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// define schema
const ToDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1
    },
    completed: Boolean
});

// create mongo db model
const ToDo = mongoose.model('ToDo', ToDoSchema);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(path_public));

// test route
app.get('/api/v1/express', (req, res) => {
    res.send({ express: 'hello world' });
});

// CRUD functions
// clear all todos
app.delete('/api/v1/todos', function(req, res) {
    ToDo.deleteMany({}, (err) => {
        if (err) res.status(400).send(err);
        else res.status(200).json({'message':'todos deleted'});
    });
});

// get all todos
app.get('/api/v1/todos', function(req, res) {
    ToDo.find(function(err, todos) {
        if (err) res.status(404).send(err);
        else res.status(200).json(todos);
    });
});

// get a todo
app.get('/api/v1/todos/:id', function(req, res) {
    let TaskId = req.params.id;
    ToDo.findById(TaskId, function(err, todo) {
        if (err) res.status(404, 'task not found').send(err);
        else res.status(200).json(todo);
    });
});

// post a todo
app.post('/api/v1/todos', function(req, res) {
    let newTaskTitle = req.body.title;
    let newTask = new ToDo({title: newTaskTitle});
    newTask.save(function(err, todo) {
        if (err) res.status(400).send(err);
        else res.status(201).json(todo);
    });
});

// update/put a todo
app.put('/api/v1/todos/:id', function(req, res) {
    let TaskId = req.params.id;
    let taskTitle = req.body.title;
    ToDo.findByIdAndUpdate(TaskId, {title: taskTitle}, function(err, todo) {
        if (err) res.status(404, 'task not found').send(err);
        else res.status(204).json(todo);
    });
});

// delete a todo
app.delete('/api/v1/todos/:id', function(req, res) {
    let TaskId = req.params.id;
    ToDo.findByIdAndRemove(TaskId, function(err) {
        if (err) res.status(404, "task not found").send(err);
        else res.status(200).json({"message":"deleted"});
    });
});

app.use(function(req, res, err, next) {
    res.status(404).send('not found');
});

// start server and emit event for test suite
app.server = app.listen(PORT, HOST, function() {
    console.log(`Running on HTTP://${HOST}:${PORT}`);
    let emitStart = setInterval(()=> {
        let connected = app.emit("appStarted");
        if (connected == true){
            clearInterval(emitStart);
        }
    }, 1000);
});
