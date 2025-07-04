import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import './DoctorsCard.css';
import doctorPlaceholder from '../images/doctor-placeholder.jpg';
import doctorImage from '../images/doctor.png';
import { FaStar, FaUserFriends, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaPhone, FaUser, FaCalendarAlt, FaUserMd} from 'react-icons/fa';

const DoctorsCard = ({ doctor }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <div className="doctor-card" key={doctor.doctor_id}>
      <div className="doctor-header">
        <div className="doctor-photo-container">
          <img
            src={doctor.profile_image || doctorImage || doctorPlaceholder}
alt={doctor.full_name ?? t('doctorCard.defaultName')}
            className="doctor-photo"
          />
        </div>
        <div className="doctor-titles">
          <h3 className="doctor-name">
            <FaUser className="icon" /> {doctor.full_name ?? t('doctorCard.defaultName')}

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
          <FaUser className="icon" /> {t('doctorCard.viewDoctor')}
        </button>
        <button onClick={() => navigate(`/doctors/${doctor.doctor_id}`)} className="book-button">
          <FaCalendarAlt className="icon" /> {t('doctorCard.book')}
        </button>
        {/* زر الدردشة يظهر فقط للمريض
        {(() => {
          const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
          const userRole = loggedUser ? loggedUser['role'] : null;
          if (userRole === 'patient') {
            return (
              <button
                className="book-button"
                style={{ marginTop: 8, background: 'linear-gradient(to right, #37ECBA, #72AFD3)', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: 30, padding: '0.6rem 1.5rem', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(114, 175, 211, 0.3)' }}
                onClick={() => navigate(`/chat/${doctor.doctor_id}`)}
              >
                💬 {t('doctorDetails.chatWithDoctor') || 'تشات مع الدكتور'}
              </button>
            );
          }
          return null;
        })()} */}
      </div>
    </div>
  );
};

export default DoctorsCard;