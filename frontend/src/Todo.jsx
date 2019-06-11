//COPYRIGHT 2019 RICHARD HUNTER
//GNU LICENSE

import React, { useState, useEffect, useRef } from 'react';

const ToDo = React.forwardRef((props, ref) => {
    let todoItem;
    if (props.selected === props.id) {
        todoItem = 
            <form onSubmit = {(e) => {
                e.preventDefault();
                props.updateTodo(props.id, props.newTodo); 
            }}>
                <input
                    className="todo_update_input" 
                    placeholder={props.title} 
                    value={props.newTodo} 
                    onFocus={e=>e.target.select()} 
                    autoFocus="true" 
                    ref={ref} 
                    onChange={props.handleChange}
                />
                <button type="submit" className="todo_update"> Update Task </button>
            </form>
    } else {
        todoItem = 
            <div>
                <button className="todo_text" onClick={(e) => props.selectTodo(e, props.id)}>{props.title}</button>
                <span className="todo_check">    
                    <button className="circle cross" onClick={() => props.deleteTodo(props.id)}></button>
                </span>
            </div>
    }
    return(
        <div className="todo_item">
            {todoItem}
        </div>
    );
});

export const TodoList = props => {

    let [todos,setTodos] = useState([]);
    let [newTodo,setNewTodo] =  useState("");
    let [selected,setSelected] = useState(0);
    const textInput = useRef(null);
    
    useEffect(
        () => {
            getTodos();
            textInput.current.focus();
        },[]
    );

    const handleChange = (event) => {
        event.persist();
        setNewTodo(newTodo => event.target.value);
    };

    const selectTodo = (event, id) => {
        event.preventDefault();
        let index = todos.findIndex(todo => todo.id === id);
        setSelected(id);
        setNewTodo(todos[index].title);

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
            textInput.current.focus();
            
        }else {
            textInput.current.focus();
            return;
        }
    };

    // UPDATE a todo
    async function updateTodo(id, title) {
        if (title.length > 0) {
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
            textInput.current.focus();        
        }else {
            return;
        }
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
        textInput.current.focus();
    }

    return(
        <div className="todolist">
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
                                ref={textInput}
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
                        <input placeholder="Task" value={newTodo} ref={textInput} onChange={handleChange}/>
                        <button type="submit" className="circle plus" />
                    </form>
                    }
                </div>
            </div>
        </div>
    );
};
