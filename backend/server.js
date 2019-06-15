'use strict';

// import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// network settings
const PORT = 8080;
const DBPORT = 27017;
const HOST = '0.0.0.0';

const app = express();
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
    title: String,
    completed: Boolean
});

// create mongo db model
const ToDo = mongoose.model('ToDo', ToDoSchema);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// test route
app.get('/api/v1/express', (req, res) => {
    res.send({ express: 'hello world' });
});

// CRUD functions
// get all todos
app.get('/api/v1/todos', function(req, res) {
    ToDo.find(function(err, todos) {
        if (err) return next(err);
        res.status(200).json(todos);
    });
});

// post a todo
app.post('/api/v1/todos', function(req, res) {
    let newTaskTitle = req.body.title;
    let newTask = new ToDo({title: newTaskTitle});
    newTask.save(function(err, todo) {
        if (err) return next(err);
        console.log("saved task! %s with id: %s", todo.title, todo._id);
        res.status(201).json(todo);
    });
});

// update a todo
app.put('/api/v1/todos/:id', function(req, res) {
    let TaskId = req.params.id;
    let taskTitle = req.body.title;
    ToDo.findByIdAndUpdate(TaskId, {title: taskTitle}, function(err, todo) {
        if (err) res.status(404, 'task not found').send();
        res.status(204).json(todo);
    });  
});

// delete a todo
app.delete('/api/v1/todos/:id', function(req, res) {
    let TaskId = req.params.id;
    ToDo.findByIdAndRemove(TaskId, function(err) {
        if (err) res.status(404, 'task not found').send();
        res.status(200).json({"message":"deleted"});
    });

});
   
app.use(express.static(path_public));

app.use('/', router);

app.listen(PORT, HOST);
console.log(`Running on HTTP://${HOST}:${PORT}`);
