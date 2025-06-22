import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaLanguage, FaAward, FaStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const DoctorInfo = ({ doctor }) => {
  const { t } = useTranslation();

  const name = doctor.name || doctor.full_name || doctor.username || '';
  const specialty = doctor.specialty || doctor.specialization || '';
  const profilePicture = doctor.profilePicture || '/images/1.jpeg';
  const experience = doctor.experience || 0;
  const rating = doctor.rating || 0;
  const reviewsCount = doctor.reviewsCount || 0;
  const bio = doctor.bio || '';
  const education = Array.isArray(doctor.education) ? doctor.education : (doctor.education ? String(doctor.education).split(',') : []);
  const languages = ["Arabic", "English"];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-0 shadow-sm mb-4" dir="ltr">
        <Card.Body className="p-4">
          <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start">
            <motion.img
              src={profilePicture}
              alt={name}
              className="rounded-circle mb-3 mb-md-0 me-md-4 doctor-img"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{ maxWidth: '120px' }}
            />

            <div className="text-start w-100">
              <h2 className="mb-2" style={{ color: 'var(--primary-purple)' }}>{name}</h2>
              <h5 className="text-muted mb-3">{specialty}</h5>

              <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2 mb-3">
                <Badge pill bg="light" text="primary" className="px-3 py-2 d-flex align-items-center">
                  <FaAward className="me-1" />
                  {t('doctorInfo.yearsExperience', { count: experience })}
                </Badge>
                <Badge pill bg="light" text="primary" className="px-3 py-2 d-flex align-items-center">
                  <FaStar className="me-1 text-warning" />
                  {t('doctorInfo.ratingWithReviews', { rating, count: reviewsCount })}
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-4 text-start">
            <h5 className="fw-bold mb-3">{t('doctorInfo.aboutDoctor', { name: name.split(' ')[0] })}</h5>
            <p className="mb-4">{bio}</p>

            <div className="row">
              <div className="col-md-6 mb-3 text-start">
                <h6 className="fw-bold d-flex align-items-center">
                  <FaGraduationCap className="me-2" style={{ color: 'var(--primary-purple)' }} />
                  {t('doctorInfo.specialization')}
                </h6>
                <div className="ps-3 mb-2">
                  {specialty ? (
                    <span>{specialty}</span>
                  ) : (
                    <span className="text-muted">{t('doctorInfo.noSpecialization')}</span>
                  )}
                </div>

                {education.length > 0 && (
                  <>
                    <h6 className="fw-bold mt-3">{t('doctorInfo.education')}</h6>
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
                  <FaLanguage className="me-2" style={{ color: 'var(--primary-purple)' }} />
                  {t('doctorInfo.languages')}
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {languages.map((lang, index) => (
                    <Badge key={index} pill bg="light" text="primary" className="px-3 py-2">
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
