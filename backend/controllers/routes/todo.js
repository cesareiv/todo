let mongoose = require('mongoose');
let ToDo = require('../models/todo');

/*
 * GET /todo - retrieve all todos
*/
function getTodos(req, res) {
    ToDo.find(function(err, todos) {
        if (err) res.send(err);
        res.status(200).json(todos);
    });
};

/*
 * GET /todo/:id - retrieve a todo by id
*/
function getTodo(req, res) {
    let TaskId = req.params.id;
    ToDo.findById(TaskId, function(err, todo) {
        if (err) res.send(err);
        res.status(200).json(todo);
    });
};

// post a todo
function createTodo(req, res) {
    let newTaskTitle = req.body.title;
    let newTask = new ToDo({title: newTaskTitle});
    newTask.save(function(err, todo) {
        if (err) res.send(err);
        console.log("saved task! %s with id: %s", todo.title, todo._id);
        res.json(todo);
    });
};

// update a todo
function updateTodo(req, res) {
    let TaskId = req.params.id;
    let taskTitle = req.body.title;
    ToDo.findByIdAndUpdate(TaskId, {title: taskTitle}, function(err, todo) {
        if (err) res.send(err);
        res.json(todo);
    });  
};

// delete a todo
function deleteTodo(req, res) {
    let TaskId = req.params.id;
    ToDo.findByIdAndRemove(TaskId, function(err) {
        if (err) res.send(err);
        res.json({"message":"deleted"});
    });
};

// delete all todos
function clearTodos(req, res) {
    ToDo.deleteMany({}, (err) => {
        if (err) res.send(err);
        res.status(204).json({'message':'todos deleted'});
    });
};
