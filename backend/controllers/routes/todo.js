let mongoose = requre('mongoose');
let ToDo = require('../models/todo');


/*
 * GET /todo - retrieve all todos
*/
function getTodos(req, res) {
    ToDo.find(function(err, todos) {
        if (err) res.send(err);
        res.json(todos);
    });
};

// get a todo
app.get('/api/v1/todos/:id', function(req, res) {
    let TaskId = req.params.id;
    ToDo.findById(TaskId, function(err, todo) {
        if (err) return next(err);
        res.status(200).json(todo);
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
        if (err) res.status(404, "task not found").send();
        res.status(200).json({"message":"deleted"});
    });
});
