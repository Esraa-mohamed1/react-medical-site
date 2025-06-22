import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './DoctorsCard.css';
import doctorPlaceholder from '../images/doctor-placeholder.jpg';
import doctorImage from '../images/doctor.png';

import {
  FaStar,
  FaUserFriends,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaPhone,
  FaUser,
  FaCalendarAlt
} from 'react-icons/fa';

const DoctorsCard = ({ doctor }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="doctor-card" key={doctor.doctor_id}>
      <div className="doctor-header">
        <div className="doctor-photo-container">
          <img
            src={doctorImage || doctorPlaceholder}
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
        <div className="doctor-rating">
          <span className="rating-value">
            <FaStar className="star-icon" /> {doctor.rating}
          </span>
          <span className="rating-count">
            <FaUserFriends className="icon" /> {t('doctorCard.overallRating')} {doctor.ratingCount ?? 3} {t('doctorCard.visitors')}
          </span>
        </div>
      </div>

      <div className="doctor-specialty">
        <p>{doctor.specialty}</p>
      </div>

      <div className="doctor-location">
        <p>
          <FaMapMarkerAlt className="icon" /> {doctor.clinic_name}, {doctor.clinic_address}
        </p>
      </div>

      <div className="doctor-details">
        <div className="detail-item">
          <span className="detail-label">
            <FaMoneyBillWave className="icon" /> {t('doctorCard.fees')}:
          </span>
          <span className="detail-value">{doctor.fee ?? t('doctorCard.free')}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">
            <FaClock className="icon" /> {t('doctorCard.waitingTime')}:
          </span>
          <span className="detail-value">{doctor.waitingTime ?? '+3 hours'}</span>
        </div>
      </div>

      <div className="doctor-call-cost">
        <p>
          <FaPhone className="icon" /> {doctor.phone}
        </p>
      </div>

      <div className="doctor-actions">
        <button onClick={() => navigate(`/doctors/${doctor.doctor_id}`)} className="view-doctor-button">
          <FaUser className="icon" /> {t('doctorCard.viewDoctor')}
        </button>
        <button className="book-button">
          <FaCalendarAlt className="icon" /> {t('doctorCard.book')}
        </button>
      </div>
    </div>
  );
};

export default DoctorsCard;
