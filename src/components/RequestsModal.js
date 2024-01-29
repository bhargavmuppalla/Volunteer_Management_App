// src/components/RequestsModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import config from '../config';


const RequestsModal = ({ show, onHide, requests, setRequests }) => {

  const handleRequest = async (requestId, requestAction) => {
    try {
      const response = await fetch(config.serverUrl+'/approve-reject-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId, action: requestAction }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        // Update the status in the local state or refetch the requests from the server
        console.log(`Request with ID ${requestId} Status updated succesfully`);
        setRequests((prevRequests) => prevRequests.filter((request) => request._id !== requestId));
      } else {
        console.error('Failed to approve request:', data.error);
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Volunteer Hour Requests</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display requests and actions here */}
        {requests.map((request) => (
          <div key={request.username} className="mb-3">
            <p>{request.volunteerName} - {request.hours} hours - {request.event} - {request.description}</p>
            <Button variant="success" onClick={() => handleRequest(request._id, 'approve')}>Approve</Button>
            <Button variant="danger" onClick={() => handleRequest(request._id, 'reject')}>Reject</Button>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default RequestsModal;
