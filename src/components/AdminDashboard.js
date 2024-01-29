// src/components/AdminDashboard.js
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-5 text-center">
      <h2>Admin Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-8 mx-auto"> {/* Use col-md-8 for smaller width, and mx-auto for centering */}
          <div className="card bg-primary text-white p-4 mb-4">
            <div className="card-body">
              <h5 className="card-title">Add New User</h5>
              <p className="card-text">Click here to add a new user to the system.</p>
              <Link to="/admin/add-user" className="btn btn-light">
                Add User
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-8 mx-auto"> {/* Use col-md-8 for smaller width, and mx-auto for centering */}
          <div className="card bg-success text-white p-4">
            <div className="card-body">
              <h5 className="card-title">Manage Volunteer Hours</h5>
              <p className="card-text">View and manage volunteer hours for the system.</p>
              <Link to="/admin/manage-hours" className="btn btn-light">
                Manage Hours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
