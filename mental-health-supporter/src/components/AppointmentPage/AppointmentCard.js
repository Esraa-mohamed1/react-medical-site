import React from 'react';
import { FaClock, FaUserCircle } from 'react-icons/fa';
import './AppointmentPage.css';

export default function AppointmentCard({ appt }) {
  return (
    <div className={`card mb-3 shadow-sm appt-card ${appt.status.toLowerCase()}`}>
      <div className="card-body p-3">
        <h6 className="card-title mb-1 d-flex align-items-center">
          <FaUserCircle className="me-2 text-secondary" />
          {appt.patient}
        </h6>
        <p className="card-text mb-2 text-muted small">{appt.reason}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="badge bg-secondary">
            <FaClock className="me-1" />
            {appt.start} - {appt.end}
          </span>
          <span className={`badge status-${appt.status.toLowerCase()}`}>
            {appt.status}
          </span>
        </div>
      </div>
    </div>
  );
}
