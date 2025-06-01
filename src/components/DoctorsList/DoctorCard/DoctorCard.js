import React from 'react';
import { FaStar, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaLanguage } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  const router = useRouter();

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(doctor.rating);
    const hasHalfStar = doctor.rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star-icon full" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star-icon half" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star-icon empty" />);
    }

    return stars;
  };

  return (
    <div className="doctor-card">
      <div className="doctor-image-container">
        <Image
          src={doctor.profilePicture}
          alt={`${doctor.name}'s profile`}
          width={100}
          height={100}
          className="doctor-image"
        />
        {doctor.available && (
          <div className="availability-badge">
            <FaClock className="availability-icon" />
            <span>Available Today</span>
          </div>
        )}
      </div>

      <div className="doctor-info">
        <div className="doctor-header">
          <h3>{doctor.name}</h3>
          <p className="specialty">{doctor.specialty}</p>

          <div className="rating-container">
            <div className="stars">
              {renderStars()}
              <span className="rating-value">{doctor.rating}</span>
              <span className="reviews">({doctor.reviews} reviews)</span>
            </div>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <FaCalendarAlt className="detail-icon" />
            <span>{doctor.experience} years experience</span>
          </div>

          <div className="detail-item">
            <FaLanguage className="detail-icon" />
            <span>{doctor.languages.join(', ')}</span>
          </div>

          <div className="detail-item">
            <FaMapMarkerAlt className="detail-icon" />
            <span>{doctor.location.address}</span>
          </div>

          {doctor.nextAvailable && (
            <div className="detail-item">
              <FaClock className="detail-icon" />
              <span>Next available: {doctor.nextAvailable}</span>
            </div>
          )}
        </div>

        <div className="card-actions">
          <button className="primary-button">Book Appointment</button>
          <button
            className="secondary-button"
            onClick={() => router.push('/doctorDetails')}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
