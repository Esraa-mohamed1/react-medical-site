import React from 'react';
import { Link } from 'react-router-dom';
import './DoctorCard.css';
import doctorimage from '../images/doctor-placeholder.jpg';

const DoctorCard = ({ doctor, onEdit }) => {
  const handleImageError = (e) => {
    e.target.src = doctorimage;
    e.target.onerror = null;
  };

  return (
    <div className="doctor-profile-card">
      <div className="profile-header">
        <div className="avatar-container">
          <img 
            src={doctor.photo || doctorimage} 
            onError={handleImageError}
            alt={`Dr. ${doctor.name}`} 
            className="doctor-photo"
          />
        </div>
        <div className="header-info">
          <h2 className="doctor-name">Dr. {doctor.name}</h2>
          <span className="doctor-title">{doctor.title}</span>
          <div className="rating-container">
            <span className="rating">{doctor.rating}</span>
            <span className="rating-count">({doctor.ratingCount} reviews)</span>
          </div>
          <span className="specialization-badge">{doctor.specialty}</span>
        </div>
      </div>
      
      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{doctor.location}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">City/Area:</span>
          <span className="detail-value">{doctor.city}, {doctor.area}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Consultation Fee:</span>
          <span className="detail-value">{doctor.fee}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Waiting Time:</span>
          <span className="detail-value">{doctor.waitingTime}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Contact:</span>
          <span className="detail-value">{doctor.callCost}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Insurance:</span>
          <span className="detail-value">{doctor.insurance?.join(', ')}</span>
        </div>
      </div>
      
      <div className="profile-actions">
        <Link 
          to={`/doctors/${doctor.id}/edit`} 
          className="btn btn-primary edit-button"
          onClick={(e) => {
            e.preventDefault();
            onEdit();
          }}
        >
          <i className="fas fa-edit me-2"></i> Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;