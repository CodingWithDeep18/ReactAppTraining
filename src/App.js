import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemValue, setEditItemValue] = useState('');

  function addItem() {
    if (!newItem) {
      alert('Enter an item');
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
      completed: false,
    };
    setItems((oldList) => [...oldList, item]);
    setNewItem('');
  }

  function deleteItem(id) {
    const newArr = items.filter((item) => item.id !== id);
    setItems(newArr);
  }

  function startEditing(id, value) {
    setEditItemId(id);
    setEditItemValue(value);
  }

  function cancelEditing() {
    setEditItemId(null);
    setEditItemValue('');
  }

  function updateItem() {
    if (!editItemValue) {
      alert('Enter a new value');
      return;
    }

    const updatedItems = items.map((item) => {
      if (item.id === editItemId) {
        return {
          ...item,
          value: editItemValue,
        };
      }
      return item;
    });

    setItems(updatedItems);
    setEditItemId(null);
    setEditItemValue('');
  }

  function toggleItemCompletion(id) {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });

    setItems(updatedItems);
  }

  return (
    <div className="App">
      <div className="App1">
        <h1 className="text-white">Todo List App</h1>
        <input
          type="text"
          placeholder="Add an item"
          value={newItem}
          className="me-2"
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem} className="btn btn-primary btn-sm">
          <i className="bi bi-plus"></i>
        </button>
        <TodoList
          items={items}
          editItemId={editItemId}
          editItemValue={editItemValue}
          startEditing={startEditing}
          updateItem={updateItem}
          cancelEditing={cancelEditing}
          deleteItem={deleteItem}
          toggleItemCompletion={toggleItemCompletion}
        />
      </div>
    </div>
  );
}

export default App;
