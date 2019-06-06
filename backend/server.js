'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
const router = express.Router();

const path_views = __dirname + '/views/';
const path_public = __dirname + '/public/';

let todos = [{'id':1, 'title':'take out trash'}, {'id':2, 'title':'write app'}];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


/*router.use(function (req, res, next) {
    console.log('/' + req.method);
    next();
});

router.get('/', function(req, res) {
    res.sendFile(path_views + 'index.html');
});

router.get('/sharks', function(req, res) {
    res.sendFile(path_views + 'sharks.html');
});

router.get('/todo-app', function(req, res) {
    res.sendFile(path_public + 'index.html');
});*/

// create a GET route
app.get('/api/v1/express', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


// get all todos
app.get('/todos', function(req, res) {
    res.status(200).json(todos);
});

// post a todo
app.post('/todos', function(req, res) {
    let newTodo = req.body;
    newTodo.id = todos.length + 1;
    todos.push(newTodo);
    res.status(201).json(newTodo);

});

// update a todo
app.put('/todos/:id', function(req, res) {
    let id = req.params.id;
    if (todos[id-1]) {
        todos[id-1] = req.body;
        res.status(204).send();
    }else {
        res.status(404, 'task not found').send();
    }
});

// delete a todo
app.delete('/todos/:id', function(req, res) {
    let id = parseInt(req.params.id);
    if (todos.filter(todo => todo.id == id).length !== 0){
        todos = todos.filter(todo => todo.id !== id);
        res.status(200, 'task deleted').send();
    }else {
        res.status(404, 'task not found').send();
    }
});


app.use(express.static(path_views));
app.use(express.static(path_public));

app.use('/', router);


app.listen(PORT, HOST);
console.log(`Running on HTTP://${HOST}:${PORT}`);
