// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Home from './components/Home';
import VolunteerDashboard from './components/VolunteerDashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import AddUser from './components/AddUser';
import ManageHours from './components/ManageHours';

const App = () => {
  // Add state and useEffect for global data fetching if needed
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-user" element={<AddUser />} />
          <Route path="/admin/manage-hours" element={<ManageHours />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
