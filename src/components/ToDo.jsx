import React, {useState} from 'react';


function ToDo ({index, id, createdAt, onInputChange, onDelete}) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
      let value = event.target.value;
      setInputValue(value);
      onInputChange(value);
    };

    return (<tr>
      <td>
        <label>{index}</label>
      </td>
      <td>
        <label>{id}</label>
      </td>
      <td>
        <input type="text" value={inputValue} onChange={handleInputChange} /> 
        <button onClick={() => onDelete(index)}>Delete</button>
      </td>
      <td>
        <label>{createdAt.toLocaleTimeString()}</label>
      </td>
    </tr>)
    };

  export default ToDo;