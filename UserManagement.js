import React, { useState, useEffect } from 'react';
import './UserManagement.css'; // External CSS file for styles

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Load users from localStorage when the component mounts
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Save users to localStorage
  const saveUsersToLocalStorage = (updatedUsers) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  // Add a new user
  const handleAddUser = () => {
    if (users.some(user => user.email === email)) {
      alert('User with this email already exists.');
      return;
    }

    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
    setName('');
    setEmail('');
    setPassword('');
  };

  // Edit an existing user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
  };

  // Update user
  const handleUpdateUser = () => {
    const updatedUsers = users.map(user =>
      user.email === editingUser.email
        ? { ...user, name, email, password }
        : user
    );
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
    setEditingUser(null);
    setName('');
    setEmail('');
    setPassword('');
  };

  // Delete user
  const handleDeleteUser = (emailToDelete) => {
    const updatedUsers = users.filter(user => user.email !== emailToDelete);
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      {editingUser ? (
        <div className="form-container">
          <h3>Edit User</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdateUser(); }}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">Update User</button>
            <button type="button" onClick={() => setEditingUser(null)} className="cancel-btn">Cancel</button>
          </form>
        </div>
      ) : (
        <div className="form-container">
          <h3>Add User</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">Add User</button>
          </form>
        </div>
      )}

      <h3>User List</h3>
      <ul className="user-list">
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index} className="user-item">
              {user.name} ({user.email})
              <button onClick={() => handleEditUser(user)} className="edit-btn">Edit</button>
              <button onClick={() => handleDeleteUser(user.email)} className="delete-btn">Delete</button>
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
};

export default UserManagement;
