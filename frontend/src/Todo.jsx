import React, { useState, useEffect } from 'react';

const ToDo = props => {
    let todoItem;
    if (props.selected === props.id) {
        todoItem = 
            <form onSubmit = {(e) => {
                e.preventDefault();
                props.updateTodo(props.id, props.newTodo); 
            }}>
                <input placeholder={props.title} value={props.newTodo} onChange={props.handleChange}/>
                <button type="submit"> Update Task </button>
            </form>
    } else {
        todoItem = 
            <div>
                <a onClick={(e) => props.selectTodo(e, props.id)}>{props.title}</a>
                 <button onClick={() => props.deleteTodo(props.id)}>done</button>

            </div>
    }
    return(
        <div>
            {todoItem}
        </div>
    );
}

export const TodoList = props => {

    let [todos,setTodos] = useState([]);
    let [newTodo,setNewTodo] =  useState("");
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

    const selectTodo = (event, id) => {
        event.preventDefault();
        setSelected(id);
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
        if (title.length > 0) {
            let payload = JSON.stringify({'title':title});
            const response = await fetch('http://localhost/api/v1/todos', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: payload
            });
            const body = await response.json();
            if (response.status !==201) {
                throw Error(body.message);
            }
            setNewTodo("");
            getTodos();
        }else {
            return;
        }
    };

    // UPDATE a todo
    async function updateTodo(id, title) {
        let payload = JSON.stringify({'title':title});
        const response = await fetch(`http://localhost/api/v1/todos/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: payload
        });
        const body = await response;
        if (response.status !==204) {
            throw Error(body.message);
        }
        getTodos();       
        setSelected(0);
        setNewTodo("");    
    }

    // DELETE a todo
    async function deleteTodo(id) {
        const response = await fetch(`http://localhost/api/v1/todos/${id}`, {
            method: 'DELETE'
        });
        const body = await response;
        if (response.status !== 200) {
            throw Error(body.message);
        }
        getTodos();
    }

    return(
        <div className="todolist_main">
            <h1>Your todo list</h1>
            <div>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <ToDo 
                                title={todo.title} 
                                key={todo.id} 
                                id={todo.id}
                                selected={selected}
                                deleteTodo={deleteTodo}
                                selectTodo={selectTodo}
                                newTodo={newTodo}
                                handleChange={handleChange}
                                updateTodo={updateTodo}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <div>        
                    {selected===0 && 
                    <form onSubmit={e => {
    	                e.preventDefault();
                        createTodo(newTodo);
                    }}>
                        <input placeholder="Task" value={newTodo} onChange={handleChange}/>
                        <button type="submit"> Add Task </button>
                    </form>
                    }
                </div>
            </div>
        </div>
    );
};
