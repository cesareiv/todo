const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define schema
const ToDoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});

// create mongo db model
const ToDo = mongoose.model('ToDo', ToDoSchema);

module.exports = ToDo;
