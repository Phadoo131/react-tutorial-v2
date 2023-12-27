import React from 'react'

function Todo({index, data, onDelete, onInputChange}) {

    const deleteRow = ()=>{
        onDelete(index);
    }

    const changeItem = (event)=>{
        const newItem = {
            id: data.id,
            value: event.target.value,
            createdAt: data.createdAt,
        }

        onInputChange(newItem);
    }

    return (
        <tr>
            <td>{index}</td>
            <td>{data.id}</td>
            <td><input type="text" value={data.value}  onChange={changeItem}></input></td>
            <td>
                <label>{data.createdAt.toLocaleTimeString()}</label>
            </td>
            <td>
            <button onClick={deleteRow} className="btn btn-danger">Delete</button>
            </td>
        </tr>
        );
}

export default Todo


// import React from 'react';


// function ToDo ({index, id, val, createdAt, onInputChange, onDelete}) {
//     //const [inputValue, setInputValue] = useState('');

//     // const handleInputChange = (event) => {
//     //   let value = event.target.value;
//     //   console.log(value);
//     //   setInputValue(value);
//     //   onInputChange(value);
//     // };

//     const changeItem = (event)=>{
//         const newValue = event.target.value;
//         //setInputValue(newValue);
//         const newItem = {
//             id: id,
//             value: newValue,
//             createdAt: createdAt
//         };
//         onInputChange(newItem);
//     }

//     return (
//       <tr className="hover bg-primary">
//         <td className="bg-neutral-content">
//           <label>{index}</label>
//         </td>
//         <td className="bg-primary-content">
//           <label>{id}</label>
//         </td>
//         <td className="bg-primary-content">
//           <input type="text" value={val} onChange={changeItem} placeholder="Type here" 
//           className="input input-bordered input-primary w-full max-w-xs" /> 
//           {/* <button className="btn btn-error" onClick={() => onDelete(index)}>Delete</button> */}
//         </td>
//         <td className="bg-primary-content">
//           <label>{createdAt.toLocaleTimeString()}</label>
//         </td>
//         <td className="bg-primary-content">
//           <button className="btn btn-error" onClick={() => onDelete(index)}>Delete</button>
//         </td>
//       </tr>)
//     };

//   export default ToDo;