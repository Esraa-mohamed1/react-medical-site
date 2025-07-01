import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FiUser, FiMail, FiCalendar, FiClock } from 'react-icons/fi';
import './DoctorSidebar.css';

const PatientCard = ({ appointment, onClick }) => {
  const { patient_info, appointment_date, id } = appointment;
  return (
    <Card className="shadow rounded-4 border-0 h-100" style={{ background: 'linear-gradient(135deg, #e0f7fa 60%, #e8eaf6 100%)' }}>
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <FiUser size={32} className="me-3 text-primary" />
          <div>
            <h5 className="mb-0 fw-bold">{patient_info?.first_name} {patient_info?.last_name}</h5>
            <div className="text-muted small">{patient_info?.username}</div>
          </div>
        </div>
        <div className="mb-2">
          <FiMail className="me-2 text-info" />
          <span>{patient_info?.email || 'No email'}</span>
        </div>
        <div className="mb-2">
          <FiCalendar className="me-2 text-success" />
          <span>{new Date(appointment_date).toLocaleDateString()}</span>
        </div>
        <div className="mb-3">
          <FiClock className="me-2 text-warning" />
          <span>{new Date(appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <Button variant="outline-primary" className="rounded-pill w-100" onClick={() => onClick && onClick(appointment)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PatientCard; 