import React from 'react';
import { useNavigate } from 'react-router-dom';

import './DoctorsCard.css';
import doctorPlaceholder from '../images/doctor-placeholder.jpg';
import doctorImage from '../images/doctor.png';
import { FaStar, FaUserFriends, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaPhone, FaUser, FaCalendarAlt, FaUserMd} from 'react-icons/fa';

const DoctorsCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="doctor-card" key={doctor.doctor_id}>
      <div className="doctor-header">
        <div className="doctor-photo-container">
          <img
            src={doctor.profile_image || doctorImage || doctorPlaceholder}
            alt={doctor.full_name ?? 'Prof.'}
            className="doctor-photo"
          />
        </div>
        <div className="doctor-titles">
          <h3 className="doctor-name">
            <FaUser className="icon" /> {doctor.full_name ?? 'Martha'}
          </h3>
          <p className="doctor-title">{doctor.specialization}</p>
        </div>
        {/* <div className="doctor-rating">
          <span className="rating-value">
            <FaStar className="star-icon" /> {doctor.rating}
          </span>
          <span className="rating-count">
            <FaUserFriends className="icon" /> Overall Rating From {doctor.ratingCount ?? 3} Visitors
          </span>
        </div> */}
      </div>

      <div className="doctor-specialty">
        <p>
          <FaUserMd className="icon" /> {doctor.specialization}
        </p>  
      </div>

      <div className="doctor-location">
        <p>
          <FaMapMarkerAlt className="icon" /> {doctor.clinic_name}, {doctor.clinic_address}, {doctor.city}
        </p>
      </div>

      {/* <div className="doctor-details"> */}
        {/* <div className="detail-item">
          <span className="detail-label">
            <FaMoneyBillWave className="icon" /> Fees:
          </span>
          <span className="detail-value">{doctor.fee ?? 'Free'}</span>
        </div> */}
        {/* <div className="detail-item">
          <span className="detail-label">
            <FaClock className="icon" /> Waiting Time:
          </span>
          <span className="detail-value">{doctor.waitingTime ?? '+3 hours'}</span>
        </div> */}
      {/* </div> */}

      <div className="doctor-call-cost">
        <p>
          <FaPhone className="icon" /> {doctor.phone}
        </p>
      </div>

      <div className="doctor-actions">
        <button onClick={() => navigate(`/doctors/${doctor.doctor_id}`)} className="view-doctor-button">
          <FaUser className="icon" /> View Doctor
        </button>
        <button className="book-button">
          <FaCalendarAlt className="icon" /> Book
        </button>
      </div>
    </div>
  );
};

export default DoctorsCard;