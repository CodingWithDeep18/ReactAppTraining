import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(data => setUsers(data.data));
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleUpdate = (index) => {
    const editedUser = users[index];

    fetch(`https://reqres.in/api/users/${editedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedUser),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Update response:', data);
        // Handle success or display a message
        setEditingIndex(-1);
      });
  };

  const handleDelete = (userId) => {
    fetch(`https://reqres.in/api/users/${userId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Delete response:', data);
        // Handle success or display a message
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        setEditingIndex(-1); // Reset the editing index
      })
      .catch(error => {
        console.log('Delete error:', error);
        // Handle error or display an error message
      });
  };
  
  
  
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = {
        ...updatedUsers[index],
        [name]: value
      };
      return updatedUsers;
    });
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Avatar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    name="first_name"
                    value={user.first_name}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                ) : (
                  user.first_name
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    name="last_name"
                    value={user.last_name}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                ) : (
                  user.last_name
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    name="avatar"
                    value={user.avatar}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                ) : (
                  <img src={user.avatar} alt="Avatar" style={{ width: '50px' }} />
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <div>
                    <button onClick={() => handleUpdate(index)}>Submit</button>
                    <button onClick={() => setEditingIndex(-1)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
