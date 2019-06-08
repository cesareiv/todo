import React, { useState, useEffect } from 'react';

export const TodoList = props => {

    const ToDo = props => {
        return(
            <p>{props.title}</p>
        );
    }

    let [todos,setTodos] = useState([]);
    let [newTodo,setNewTodo] = useState("");
    let [selected,setSelected] = useState(0);
    
    useEffect(
        () => {
            getTodos();
        },[]
    );

    const handleChange = (event) => {
        event.persist();
        setNewTodo(newTodo => event.target.value);
    };

    const selectTodo = event => {
        event.persist();
        setSelected(selected => event.target.value);
    }

    // Fetches our GET /todos route from the Express server
    async function getTodos() {
        const response = await fetch('http://localhost/api/v1/todos');
        const body = await response.json();
        console.log(body);
        if (response.status !== 200) {
            throw Error(body.message)
        }
        setTodos(body);
        return body;
    };

    // POST a todo to Express server
    async function createTodo(title) {
        let payload = JSON.stringify({'title':title})
        const response = await fetch('http://localhost/api/v1/todos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: payload
        });
        const body = await response.json()
        if (response.status !==201) {
            throw Error(body.message)
        }
        setNewTodo("");
        getTodos();
    };

    // DELETE a todo
    async function deleteTodo(id) {
        const response = await fetch(`http://localhost/api/v1/todos/${id}`, {
            method: 'DELETE'
        });
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message);
        }
        getTodos();
    }

    return(
        <div>
            <h1>Your todo list</h1>
            <div>
                <ul>
                    {todos.map((todo) => (
                        <li>
                            <ToDo title={todo.title} key={todo.id}/>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="todoListMain">
                <div className="header">        
                    <form onSubmit={e => {
    	                e.preventDefault();
                        createTodo(newTodo);
                    }}>
                        <input placeholder="Task" value={newTodo} onChange={handleChange}/>
                        <button type="submit"> Add Task </button>
                    </form>
                    <form onSubmit={e => {
    	                e.preventDefault();
                        deleteTodo(selected);
                    }}>
                        <input placeholder="Task" value={selected} onChange={selectTodo}/>
                        <button type="submit"> Delete Task </button>
                    </form>
                    
                </div>
            </div>
        </div>
    );
};
