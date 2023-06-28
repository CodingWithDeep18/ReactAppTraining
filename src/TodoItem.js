import React from 'react';

function TodoItem({ item, editItemId, editItemValue, startEditing, updateItem, cancelEditing, deleteItem, toggleItemCompletion }) {
  const handleCheckboxChange = () => {
    toggleItemCompletion(item.id); // Call toggleItemCompletion with the item's id
  };

  if (editItemId === item.id) {
    return (
      <>
        <input
          type="text"
          value={editItemValue}
          onChange={(e) => startEditing(item.id, e.target.value)}
        />
        <button onClick={updateItem}className="btn btn-primary me-2" ><i className="bi bi-pencil-fill"></i></button>
        <button onClick={cancelEditing} className="btn btn-danger"><i className="bi bi-trash-fill"></i></button>
      </>
    );
  } else {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
        <input
              type="checkbox"
              checked={item.completed}
              onChange={handleCheckboxChange}
              className="form-check-input me-2"
            />
          <p className={`m-2 ${item.completed ? 'text-decoration-line-through' : ''}`}>
            {item.value}
          </p>
          <div className="d-flex">
            
            <button
              onClick={(e) => startEditing(item.id, e.target.value)}
              className="btn btn-primary me-2"
            >
              <i className="bi bi-pencil-fill"></i>
            </button>
            <button onClick={() => deleteItem(item.id)} className="btn btn-danger">
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default TodoItem;
