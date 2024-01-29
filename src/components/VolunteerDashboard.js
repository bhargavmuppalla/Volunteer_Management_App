// src/components/VolunteerDashboard.js
import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import config from '../config';
import MyActivityModal from './MyActivityModal'; 
import PendingRequestsModal from './PendingRequestsModal'; 
import LogHoursModal from './LogHoursModal'; 
import '../styles/styles.css'; // Custom styles
import { handleLogHours } from './ManageHours';

const VolunteerDashboard = () => {
  const { isAuthenticated, userRole, userUsername } = useAuth();
  const [showMyActivityModal, setShowMyActivityModal] = useState(false);
  const [showPendingRequestsModal, setShowPendingRequestsModal] = useState(false);
  const [showLogHoursModal, setShowLogHoursModal] = useState(false);
  const [myActivities, setMyActivities] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  if (!isAuthenticated || userRole !== 'volunteer') {
    return <Navigate to="/login" />;
  }

  const fetchMyActivities = async () => {
    try {
      const response = await fetch(config.serverUrl + '/my-activities/'+ userUsername + '/Approved'); // Adjust the endpoint
      const data = await response.json();
      setMyActivities(data);
      setShowMyActivityModal(true);
    } catch (error) {
      console.error('Error fetching my activities:', error);
    }
  };

  const fetchMyPendingActivities = async () => {
    try {
      const response = await fetch(config.serverUrl + '/my-activities/'+ userUsername + '/Pending'); // Adjust the endpoint
      const data = await response.json();
      setPendingRequests(data);
      setShowPendingRequestsModal(true);
    } catch (error) {
      console.error('Error fetching my activities:', error);
    }
  };


  return (
    <div className="container mt-5 text-center">
      <h2>Volunteer Dashboard</h2>
      <div className="row mt-4">
        {/* Action: View My Activity */}
        <div className="col-md-8 mx-auto">
          <Card className="custom-card mb-4">
            <Card.Body>
              <Card.Title>My Activity</Card.Title>
              <Card.Text>View your hours of approved activity.</Card.Text>
              <Button variant="light" onClick={fetchMyActivities}>
                View My Activity
              </Button>
            </Card.Body>
          </Card>
        </div>

        {/* Action: View Pending Requests */}
        <div className="col-md-8 mx-auto">
          <Card className="custom-card mb-4">
            <Card.Body>
              <Card.Title>Pending Requests</Card.Title>
              <Card.Text>View your pending activity requests.</Card.Text>
              <Button variant="light" onClick={fetchMyPendingActivities}>
                View Pending Requests
              </Button>
            </Card.Body>
          </Card>
        </div>

        {/* Action: Log Hours */}
        <div className="col-md-8 mx-auto">
          <Card className="custom-card">
            <Card.Body>
              <Card.Title>Log Hours</Card.Title>
              <Card.Text>Log your volunteer activity hours.</Card.Text>
              <Button variant="light" onClick={() => setShowLogHoursModal(true)}>
                Log Hours
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>

      <MyActivityModal show={showMyActivityModal} onHide={() => setShowMyActivityModal(false)} myActivities = {myActivities} />
      <PendingRequestsModal show={showPendingRequestsModal} onHide={() => setShowPendingRequestsModal(false)} pendingRequests={pendingRequests}/>
      <LogHoursModal show={showLogHoursModal} onHide={() => setShowLogHoursModal(false)} onLogHours={handleLogHours}/>
    </div>
  );
};

export default VolunteerDashboard;
