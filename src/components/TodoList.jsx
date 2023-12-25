import React, { useState } from 'react';
import ToDo from './ToDo';

const ToDoList = () => {
  const [todoCounter, setTodoCounter] = useState(1);
  const [list, setList] = useState([
    {
      id: 1,
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

  const handleInputChange = (key, inputValue) => {
    const updatedList = list.map((todo, key) =>
      key === todo.id ? { ...todo, value: inputValue } : todo
    );
    setList(updatedList);
  };

  const deleteRow = (index) =>{
    const updatedList = list.filter((_,ind) => ind !== index);
    setList(updatedList);
    console.log('deleted!');

    //or do as the below code
    // const updatedList = list.splice(index, 1);
    // setList(updatedList);
  }

  return (
    <div>
      <code>key=index</code>
      <br />
      <button onClick={addToStart}>Add New to Start</button>
      <button onClick={addToEnd}>Add New to End</button>
      <button onClick={sortByEarliest}>Sort by Earliest</button>
      <button onClick={sortByLatest}>Sort by Latest</button>
      <table>
        <tr>
          <th>Index</th>
          <th>ID</th>
          <th>Item</th>
          <th>Created at</th>
        </tr>
        {list.map((todo, index) => (
          <ToDo key={todo.id} index={index} onInputChange={(value) => handleInputChange(index, value)}
        onDelete={deleteRow} {...todo} />
        ))}
      </table>
    </div>
  );
};

export default ToDoList;