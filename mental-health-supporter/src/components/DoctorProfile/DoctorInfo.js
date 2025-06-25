import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaLanguage, FaAward, FaStar } from 'react-icons/fa';

const DoctorInfo = ({ doctor }) => {
  // Defensive checks for undefined/null fields
  // Try to get the doctor's name from several possible fields
  const name = doctor.name || doctor.full_name || doctor.username || '';
  // Try to get the doctor's specialty from several possible fields
  const specialty = doctor.specialty || doctor.specialization || '';
  const profilePicture = doctor.profilePicture || '/images/1.jpeg';
  const experience = doctor.experience || 0;
  const rating = doctor.rating || 0;
  const reviewsCount = doctor.reviewsCount || 0;
  const bio = doctor.bio || '';
  const education = Array.isArray(doctor.education) ? doctor.education : (doctor.education ? String(doctor.education).split(',') : []);
  // Languages: always show Arabic and English as static data
  const languages = ["Arabic", "English"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-0 shadow-sm mb-4" dir="ltr">
        <Card.Body className="p-4">
          <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start">
            {/* Image on the left */}
            <motion.img
              src={profilePicture || null}
              alt={name}
              className="rounded-circle mb-3 mb-md-0 me-md-4 doctor-img"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{ maxWidth: '120px' }}
            />

            {/* Content aligned left */}
            <div className="text-start w-100">
              <h2 className="mb-2" style={{ color: 'var(--primary-teal)' }}>{name}</h2>
              <h5 className="text-muted mb-3">{specialty}</h5>

              <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2 mb-3">
                <Badge pill bg="light" className="px-3 py-2 d-flex align-items-center" style={{ color: '#2A5C5F'}}>
                  <FaAward className="me-1" style={{ color: '#2A5C5F' }}/> {experience} years experience
                </Badge>
                <Badge pill bg="light" className="px-3 py-2 d-flex align-items-center" style={{ color: '#2A5C5F'}}>
                  <FaStar className="me-1" style={{ color: '#2A5C5F' }}/> {rating} ({reviewsCount}+ reviews)
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-4 text-start">
            <h5 className="fw-bold mb-3">About Dr. {name.split(' ')[0]}</h5>
            <p className="mb-4">{bio}</p>

            <div className="row">
              <div className="col-md-6 mb-3 text-start">
                <h6 className="fw-bold d-flex align-items-center">
                  <FaGraduationCap className="me-2" style={{ color: 'var(--primary-teal)' }} />
                  Specialization
                </h6>
                <div className="ps-3 mb-2">
                  {specialty ? (
                    <span>{specialty}</span>
                  ) : (
                    <span className="text-muted">No specialization listed</span>
                  )}
                </div>
                {/* Optionally, show education below specialization if needed */}
                {education.length > 0 && (
                  <>
                    <h6 className="fw-bold mt-3">Education</h6>
                    <ul className="ps-3">
                      {education.map((edu, index) => (
                        <li key={index} className="mb-1">{edu}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div className="col-md-6 mb-3 text-start">
                <h6 className="fw-bold d-flex align-items-center">
                  <FaLanguage className="me-2" style={{ color: 'var(--primary-teal)' }} />
                  Languages Spoken
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {languages.map((lang, index) => (
                    <Badge key={index} pill bg="light" style={{ color: '#2A5C5F'}} className="px-3 py-2">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default DoctorInfo;
