import React from 'react';
import './DoctorsCard.css';
import doctorPlaceholder from '../images/doctor-placeholder.jpg'; // Add this image to your component folder
import doctorImage from '../images/doctor.png'; // Import the actual image


const DoctorsCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-header">
        <div className="doctor-photo-container">
          <img 
            src={doctorImage || doctorPlaceholder} 
            alt={doctor.name} 
            className="doctor-photo"
          />
        </div>
        <div className="doctor-titles">
          <h3 className="doctor-name">{doctor.name}</h3>
          <p className="doctor-title">{doctor.title}</p>
        </div>
        <div className="doctor-rating">
          <span className="rating-value">{doctor.rating}</span>
          <span className="rating-count">Overall Rating From {doctor.ratingCount} Visitors</span>
        </div>
      </div>
      
      <div className="doctor-specialty">
        <p>{doctor.specialty}</p>
      </div>
      
      <div className="doctor-location">
        <p>{doctor.location}</p>
      </div>
      
      <div className="doctor-details">
        <div className="detail-item">
          <span className="detail-label">Fees:</span>
          <span className="detail-value">{doctor.fee}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Waiting Time:</span>
          <span className="detail-value">{doctor.waitingTime}</span>
        </div>
      </div>
      
      <div className="doctor-call-cost">
        <p>{doctor.callCost}</p>
      </div>
      
      <div className="doctor-actions">
        <button className="view-doctor-button">View Doctor</button>
        <button className="book-button">Book</button>
      </div>
    </div>
  );
};

export default DoctorsCard;