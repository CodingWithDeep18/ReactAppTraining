import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ items, editItemId, editItemValue, startEditing, updateItem, cancelEditing, deleteItem, toggleItemCompletion }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <TodoItem
            item={item}
            editItemId={editItemId}
            editItemValue={editItemValue}
            startEditing={startEditing}
            updateItem={updateItem}
            cancelEditing={cancelEditing}
            deleteItem={deleteItem}
            toggleItemCompletion={toggleItemCompletion}
          />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
