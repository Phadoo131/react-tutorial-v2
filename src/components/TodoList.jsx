import React, {useState, useEffect} from 'react'
import Todo from './Todo';

function TodoList() {

    const [todoCounter, setTodoCounter] = useState(201);
    const [list, setList] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch('http://localhost:5000/todos');
                const data = await response.json();

                const newList = data.map((item) => (
                    {id: item.id,
                    value: item.title,
                    createdAt: new Date(),
                    }));

                setList(newList);

                } catch(err){
                    console.log(err);
                }
            }
            fetchData();
        }, [])

    const addToEnd = (event) => {
        let newCount = todoCounter + 1;
        let date = new Date();

        const newList = [...list, {
            id: newCount,
            value: '',
            createdAt: date,
        }]

        setList(newList);
        setTodoCounter(newCount);
    }

    const addToStart = (event) => {
        let newCount = todoCounter + 1;
        let date = new Date();

        const newList = [{
            id: newCount,
            value: '',
            createdAt: date,
        }, ...list,]

        setList(newList);
        setTodoCounter(newCount);
    }

    const deleteRow = (index)=>{
        const newList = [...list].filter((_,i)=> i !== index);
        
        setList(newList);
    }

    const changeRow = (index, newList) =>{
        list[index] = newList;

        setList([...list]);
    }

    const sortByEarliest = ()=>{
        const newList = [...list].sort((a, b)=> {
            return a.id - b.id;
        })

        setList(newList);
    }

    const sortByLatest = ()=>{
        const newList = [...list].sort((a, b)=> {
            return b.id - a.id;
        })

        setList(newList);
    }

    return (
        <div className="container text-center"> 
        <div className="justify-content-md-center">
          <button onClick={addToStart} className="btn btn-primary">Add New to Start</button>&nbsp;&nbsp;
          <button onClick={addToEnd} className="btn btn-primary">Add New to End</button>&nbsp;&nbsp;
          <button onClick={sortByEarliest} className="btn btn-secondary">Sort by Earliest</button>&nbsp;&nbsp;
          <button onClick={sortByLatest} className="btn btn-secondary">Sort by Latest</button>
        </div>
    <div>
      <br />
      <div>
        <table className="table table-striped">
          <thead>
          <tr>
            <th>Index</th>
            <th>ID</th>
            <th>Item</th>
            <th>Created at</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          {list.map((list, index) => (
            <Todo
                key={list.id} data={list} index={index} onInputChange={(value) => changeRow(index, value)}
                 onDelete={deleteRow} {...list} />
          ))}
          </tbody>
        </table>
      </div>
    </div> </div>
    )
}

export default TodoList;