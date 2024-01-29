// src/components/ManageHours.js
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RequestsModal from './RequestsModal';
import LogHoursModal from './LogHoursModal';
import '../styles/styles.css'; // Custom styles
import config from '../config';

export const handleLogHours = async (logData) => {
    try {
        const response = await fetch(config.serverUrl + '/log-hours', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(logData),
        });
        const data = await response.json();
      } catch (error) {
        console.error('Error logging hours:', error);
      }
  };
  
const ManageHours = () => {
  const { isAuthenticated, userRole } = useAuth();
  const [showRequestsModal, setShowRequestsModal] = useState(false); // State for modal visibility
  const [requests, setRequests] = useState([]);
  const [showLogHoursModal, setShowLogHoursModal] = useState(false);

  const handleViewRequests = async () => {
    try {
        const response = await fetch(config.serverUrl+'/requests');
        const data = await response.json();
        setRequests(data);
        setShowRequestsModal(true);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    setShowRequestsModal(true);
  };

  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-5 text-center">
      <h2>Manage Volunteer Hours</h2>
      <div className="row mt-4">
        <div className="col-md-8 mx-auto">
          <Card className="custom-card mb-4">
            <Card.Body>
              <Card.Title>Requests</Card.Title>
              <Card.Text>Approve or reject volunteer hour requests.</Card.Text>
              <Button variant="light" onClick={handleViewRequests}>
                View Requests
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-8 mx-auto">
          <Card className="custom-card mb-4">
            <Card.Body>
              <Card.Title>Volunteers</Card.Title>
              <Card.Text>View a list of all volunteers in the system.</Card.Text>
              <Link to="/admin/manage-hours/volunteers">
                <Button variant="light">View Volunteers</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-8 mx-auto">
          <Card className="custom-card">
            <Card.Body>
                <Card.Title>Log Hours</Card.Title>
                <Card.Text>Record volunteer activity and log hours.</Card.Text>
                <Button variant="light" onClick={() => setShowLogHoursModal(true)}>
                Log Hours
                </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      <LogHoursModal
        show={showLogHoursModal}
        onHide={() => setShowLogHoursModal(false)}
        onLogHours={handleLogHours}
      />
      <RequestsModal 
        show={showRequestsModal} 
        onHide={() => setShowRequestsModal(false)} 
        requests = {requests} 
        setRequests = {setRequests} />
    </div>
  );
};

export default ManageHours;
