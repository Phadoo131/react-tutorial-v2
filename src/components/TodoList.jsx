import React, { useState, useEffect } from 'react';
import ToDo from './ToDo';

const ToDoList = () => {
  const [todoCounter, setTodoCounter] = useState(201);
  const [list, setList] = useState([
    {
      id: 201,
      value: '',
      createdAt: new Date(),
    },
  ]);

  const sortByEarliest = () => {
    const sortedList = [...list].sort((a, b) => a.createdAt - b.createdAt);
    setList(sortedList);
  };

  const sortByLatest = () => {
    const sortedList = [...list].sort((a, b) => b.createdAt - a.createdAt);
    setList(sortedList);
  };

  const addToEnd = (inputValue) => {
    const date = new Date();
    const nextId = todoCounter + 1;
    const newList = [
      ...list,
      { id: nextId, value: inputValue, createdAt: date },
    ];
    console.log(newList);
    setList(newList);
    setTodoCounter(nextId);
  };

  const addToStart = (inputValue) => {
    const date = new Date();
    const nextId = todoCounter + 1;
    const newList = [
      { id: nextId, value: inputValue, createdAt: date },
      ...list,
    ];
    console.log(newList);
    setList(newList);
    setTodoCounter(nextId);
  };

  const handleInputChange = (index, newItem) => {
    setList((prevList) =>
        prevList.map((todo, i) => (i === index ? newItem : todo))
    );
  };

  const deleteRow = (index) =>{
    const updatedList = list.filter((_,ind) => ind !== index);
    setList(updatedList);
    console.log('deleted!');
  }

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/todos/');
        const todos = await response.json();
  
        const newList = todos.map((item) => ({
          id: item.id,
          value: item.title,
          createdAt: new Date(),
        }));
  
        setList(newList);
        console.log(newList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="container">
      <code>key=index</code>
      <br />
      <button onClick={addToStart} className="btn btn-primary">Add New to Start</button>
      <button onClick={addToEnd} className="btn btn-primary">Add New to End</button>
      <button onClick={sortByEarliest} className="btn btn-success">Sort by Earliest</button>
      <button onClick={sortByLatest} className="btn btn-success">Sort by Latest</button>
      <table>
        <thead>
        <tr>
          <th>Index</th>
          <th>ID</th>
          <th>Item</th>
          <th>Created at</th>
        </tr>
        </thead>
        <tbody>
        {list.map((todo, index) => (
          <ToDo key={todo.id} value={todo.value} index={index} onInputChange={(value) => handleInputChange(index, value)}
        onDelete={deleteRow} {...todo} />
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;