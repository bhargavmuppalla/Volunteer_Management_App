// src/components/PendingRequestsModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const PendingRequestsModal = ({ show, onHide, pendingRequests }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Pending Volunteer Activity Requests</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display pending requests and actions here */}
        {pendingRequests.map((request) => (
          <div key={request._id} className="mb-3">
            <p>{request.event} - {request.hours} hours - {request.description}</p>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default PendingRequestsModal;
