// src/components/MyActivityModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MyActivityModal = ({ show, onHide, myActivities }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>My Approved Activities</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {myActivities.map((activity) => (
          <div key={activity._id} className="mb-3">
            <p>{activity.volunteerName} - {activity.hours} hours - {activity.event} - {activity.description}</p>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyActivityModal;
