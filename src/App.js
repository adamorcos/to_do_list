import './App.css';
import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };
  
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Calculate progress
  const progress = todos.length ? (todos.filter(todo => todo.completed).length / todos.length) * 100 : 0;

  return(
    <div className='container'>
      <header>To-Do List</header>

      <div className='input'>
        <input
          type='text'
          className='inputBox'
          value={inputValue}
          onChange={handleInputChange}
          placeholder='Add a new Task'
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <button className='button' onClick={handleAddTodo}>Add</button>
      </div>

      <div className='progress-container'>
        <div className='progress-bar' style={{ width: `${progress}%` }}></div>
        <span className='progress-text'>{Math.round(progress)}% tasks completed</span>
      </div>

      <ul className='scroll'>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span 
              className="todo-text"
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            <button 
              onClick={() => handleDeleteTodo(todo.id)}
              className="delete-button"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    
      <div>
        <hr className='counter'/>
        <div className='counter-container'>
          <p><span>{todos.length}</span> Items total</p>
          <button id="deleteButton" onClick={handleDeleteAll}>Delete All</button>
        </div>
      </div>
    </div>
  );
}

export default App;
