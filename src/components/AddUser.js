// src/components/AddUser.js
import React, { useState } from 'react';
import config from '../config';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddUser = async () => {
    try {
      const response = await fetch(config.serverUrl + '/add-user', {
        method: 'POST',
        body: JSON.stringify({ username, password, role }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        setSuccessMessage('User added successfully');
        setErrorMessage(''); 
        setUsername('');
        setPassword('');
        setRole('');
      } else {
        setSuccessMessage('');
        setErrorMessage(data.error || 'Failed to add user');
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Failed to add user');
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="text-center mb-4">Add New User</h2>
        {successMessage && <p className="text-success">{successMessage}</p>}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              className="form-select"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled>Select Role</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleAddUser}>
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
