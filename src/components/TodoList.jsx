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
      { id: nextId, value: inputValue.value, createdAt: date },
    ];
    console.log(newList);
    setList(newList);
    setTodoCounter(nextId);
  };

  const addToStart = (inputValue) => {
    const date = new Date();
    const nextId = todoCounter + 1;
    console.log(inputValue.value);
    const newList = [
      { id: nextId, value: inputValue.value, createdAt: date },
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

  return (
  <>  <div className="bg-primary-content">
        <br></br> 
      </div>
    <nav className="bg-primary-content">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex space-x-4">
          <button onClick={addToStart} className="btn btn-success">Add New to Start</button>&nbsp;&nbsp;
          <button onClick={addToEnd} className="btn btn-success">Add New to End</button>&nbsp;&nbsp;
          <button onClick={sortByEarliest} className="btn btn-warning">Sort by Earliest</button>&nbsp;&nbsp;
          <button onClick={sortByLatest} className="btn btn-warning">Sort by Latest</button>
        </div>
      </div>
    </div>
  </nav>
    <div className="bg-primary-content">
      <br />
      <div class="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
          <tr className="hover">
            <th>Index</th>
            <th>ID</th>
            <th>Item</th>
            <th>Created at</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          {list.map((todo, index) => (
            <ToDo
            key={todo.id} val={todo.value} index={index} onInputChange={(value) => handleInputChange(index, value)}
          onDelete={deleteRow} {...todo} />
          ))}
          </tbody>
        </table>
      </div>
    </div> </>
  );
};

export default ToDoList;