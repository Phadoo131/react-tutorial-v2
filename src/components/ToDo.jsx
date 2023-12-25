import React, {useState} from 'react';


function ToDo ({index, id, value, createdAt, onInputChange, onDelete}) {
    const [inputValue, setInputValue] = useState('');

    // const handleInputChange = (event) => {
    //   let value = event.target.value;
    //   console.log(value);
    //   setInputValue(value);
    //   onInputChange(value);
    // };

    const changeItem = (event)=>{
        const newValue = event.target.value;
        setInputValue(newValue);
        const newItem = {
            id: id,
            value: newValue,
            createdAt: createdAt
        };
        onInputChange(newItem);
    }

    return (<tr>
      <td>
        <label>{index}</label>
      </td>
      <td>
        <label>{id}</label>
      </td>
      <td>
        <input type="text" value={inputValue} onChange={changeItem} /> 
        <button onClick={() => onDelete(index)}>Delete</button>
      </td>
      <td>
        <label>{createdAt.toLocaleTimeString()}</label>
      </td>
    </tr>)
    };

  export default ToDo;