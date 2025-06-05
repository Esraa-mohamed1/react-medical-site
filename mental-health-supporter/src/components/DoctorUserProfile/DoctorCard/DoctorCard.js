import React from 'react';
import { Link } from 'react-router-dom';
import './DoctorCard.css';

const DoctorCard = ({ doctor, onEdit }) => {
  return (
    <div className="doctor-profile-card">
      <div className="profile-header">
        <div className="avatar">DR</div>
        <h2 className="doctor-name">Dr. {doctor.name}</h2>
        <span className="specialization-badge">{doctor.specialization}</span>
      </div>
      
      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-label">Contact:</span>
          <span className="detail-value">{doctor.contact}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{doctor.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">License No:</span>
          <span className="detail-value">{doctor.license || 'MD-12345'}</span>
        </div>
      </div>
      
      <div className="profile-actions">
        <Link 
          to={`/doctors/${doctor.id}/edit`} 
          className="edit-button"
          onClick={(e) => {
            e.preventDefault();
            onEdit();
          }}
        >
          <i className="fas fa-edit"></i> Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;