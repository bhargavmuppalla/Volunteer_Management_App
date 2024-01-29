// src/components/LogHoursModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../context/AuthContext';

const LogHoursModal = ({ show, onHide, onLogHours }) => {
  const [volunteerName, setVolunteerName] = useState('');
  const [username, setUsername] = useState('');
  const [event, setEvent] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const { userRole } = useAuth();
  const handleLogHours = () => {
    // Perform client-side validation
    if (!hours || isNaN(hours) || hours <= 0) {
      alert('Please enter a valid number for hours worked.');
      return;
    }

    // Prepare the data and send it to the parent component
    const logData = {
      volunteerName,
      username,
      event,
      description,
      hours: Number(hours), // Convert hours to a number
      userRole: userRole,
    };

    onLogHours(logData);

    // Reset form fields
    setVolunteerName('');
    setUsername('');
    setEvent('');
    setDescription('');
    setHours('');
    
    onHide(); // Close the modal
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Log Volunteer Hours</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formVolunteerName">
            <Form.Label>Volunteer Name</Form.Label>
            <Form.Control
              type="text"
              value={volunteerName}
              onChange={(e) => setVolunteerName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEvent">
            <Form.Label>Event</Form.Label>
            <Form.Control
              type="text"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formHours">
            <Form.Label>Hours Worked</Form.Label>
            <Form.Control
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleLogHours}>
          Log Hours
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogHoursModal;
