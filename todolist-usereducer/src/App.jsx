import React, { useReducer } from 'react';
import './App.css';
import TodoList from './TodoList';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialState = {
  newItem: '',
  items: [],
  editItemId: null,
  editItemValue: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_NEW_ITEM':
      return {
        ...state,
        newItem: action.payload,
      };
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    case 'SET_EDIT_ITEM_ID':
      return {
        ...state,
        editItemId: action.payload,
      };
    case 'SET_EDIT_ITEM_VALUE':
      return {
        ...state,
        editItemValue: action.payload,
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        newItem: '',
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'START_EDITING':
      return {
        ...state,
        editItemId: action.payload.id,
        editItemValue: action.payload.value,
      };
    case 'CANCEL_EDITING':
      return {
        ...state,
        editItemId: null,
        editItemValue: '',
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              value: action.payload.value,
            };
          }
          return item;
        }),
        editItemId: null,
        editItemValue: '',
      };
    case 'TOGGLE_ITEM_COMPLETION':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              completed: !item.completed,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addItem() {
    if (!state.newItem) {
      alert('Enter an item');
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: state.newItem,
      completed: false,
    };
    dispatch({ type: 'ADD_ITEM', payload: item });
  }

  function deleteItem(id) {
    dispatch({ type: 'DELETE_ITEM', payload: id });
  }

  function startEditing(id, value) {
    dispatch({ type: 'START_EDITING', payload: { id, value } });
  }

  function cancelEditing() {
    dispatch({ type: 'CANCEL_EDITING' });
  }

  function updateItem() {
    if (!state.editItemValue) {
      alert('Enter a new value');
      return;
    }

    dispatch({
      type: 'UPDATE_ITEM',
      payload: {
        id: state.editItemId,
        value: state.editItemValue,
      },
    });
  }

  function toggleItemCompletion(id) {
    dispatch({ type: 'TOGGLE_ITEM_COMPLETION', payload: id });
  }

  return (
    <div className="App">
      <div className="App1">
        <h1 className="text-black">Todo List App</h1>
        <input
          type="text"
          placeholder="Add an item"
          value={state.newItem}
          className="me-2"
          onChange={(e) => dispatch({ type: 'SET_NEW_ITEM', payload: e.target.value })}
        />
        <button onClick={addItem} className="btn btn-primary btn-sm">
          <i className="bi bi-plus"></i>
        </button>
        <TodoList
          items={state.items}
          editItemId={state.editItemId}
          editItemValue={state.editItemValue}
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
