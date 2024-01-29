// src/components/Login.js
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import config from '../config';

const Login = () => {
  const { isAuthenticated, userRole, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    console.log("Attempting login...");
    try {
      const response = await fetch(config.serverUrl+'/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      console.log("after post call"+username);

      if (response.ok) {
        login(data.role, username);
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Login Error Client:', error);
      setError('An error occurred during login. Please try again later.');
    }
  };

  const redirectPath = isAuthenticated ? (userRole === 'volunteer' ? '/volunteer-dashboard' : '/admin-dashboard') : null;

  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
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
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
