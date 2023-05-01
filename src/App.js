import './App.css';
import React from 'react';
import { useState, useRef } from 'react';

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "npx Create react-my-app Prueba", done: false },
    { id: 2, text: "cd Prueba", done: false },
    { id: 3, text: "npm start", done: false }
  ]);

  return (
    <div className='App'>
      <h2>Tasks !!</h2>
      <ul>
        <TodoList todos={todos} setTodos={setTodos} />
        <AddTodo setTodos={setTodos} />
      </ul>
    </div>
  )
}
function TodoList({ todos, setTodos }) {

  function handleToggleTodo(todo) {

    const updatedTodos = todos.map((clickedTodo) =>
      clickedTodo.id === todo.id ? { ...clickedTodo, done: !clickedTodo.done } : clickedTodo
    );
    setTodos(updatedTodos)
  }


  //Meter en ternario
  return (
    !todos.length ? (
      <p style={{ color: "purple" }}> No hay mas tareas !!!</p>
    ) : (
      
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}
            onDoubleClick={() => handleToggleTodo(todo)}
            style={{ textDecoration: todo.done ? "line-through" : "" }}
          >
            {todo.text}
            <DeleteTodo todo={todo} setTodos={setTodos} />
          </li>
        ))}
      </ul>
    )
  );
}



function DeleteTodo({ todo, setTodos }) {

  function handleDeleteTodo() {

    const confirmed = window.confirm('¿Estas seguro de borrar?');
    if (confirmed) {
      setTodos((prevTodos) => {

        return prevTodos.filter((element) => element.id !== todo.id);
        //no llamar las variables con una letra (todo Item)
      })
    }
  }
  return (
    <span onClick={handleDeleteTodo}
      role="button"
      style={{
        color: "red",
        fontWeight: "bold",
        marginLeft: 10,
        cursor: "pointer"
      }}
    >
      Done
    </span>
  )
}



function AddTodo({ setTodos }) {
  const inputRef = useRef();
  function handleAddTodo(event) {

    event.preventDefault()
    const text = event.target.elements.addTodo.value;
    const todo = {
      id: Math.random(),
      text,
      done: false
    };

    setTodos((prevTodos) => {
      return [...prevTodos, todo]
    })
    inputRef.current.value = ""
  }
  return (
    <form onSubmit={handleAddTodo}>
      <input placeholder='Tareas a Realizar !!!!!' ref={inputRef} name="addTodo" />
      <button type='submit'>añadir</button>
    </form>
  )
}



