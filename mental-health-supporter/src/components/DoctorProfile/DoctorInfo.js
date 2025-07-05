import React, { useEffect, useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaLanguage, FaAward, FaStar, FaUserMd } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const DoctorInfo = ({ doctor }) => {
  const { t } = useTranslation();

  const name = doctor.name || doctor.full_name || doctor.username || '';
  const specialty = doctor.specialty || doctor.specialization || '';
  const description = doctor.description || '';
  const profilePicture = doctor.profile_image || '/images/doctor.png';
  const experience = doctor.experience || 0;
  const bio = doctor.bio || '';
  const education = Array.isArray(doctor.education) ? doctor.education : (doctor.education ? String(doctor.education).split(',') : []);
  const languages = ['English', 'Arabic']; // Both languages included

  const [reviewStats, setReviewStats] = useState({ rating: null, reviewsCount: null });
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    // Always call the API with the doctor_id from props and include the 'access' token
    const docId = doctor?.id || doctor?.doctor_id || doctor?.user_id;
    const token = localStorage.getItem('access');
    if (!docId || !token) return;
    setLoadingStats(true);
    fetch(`http://127.0.0.1:8000/api/medical/doctors/${docId}/reviews/stats/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        setReviewStats({
          rating: typeof data.median_rating === 'number' ? data.median_rating : 0,
          reviewsCount: typeof data.review_count === 'number' ? data.review_count : 0
        });
        setLoadingStats(false);
      })
      .catch(() => {
        setReviewStats({ rating: 0, reviewsCount: 0 });
        setLoadingStats(false);
      });
  }, [doctor]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0" style={{ 
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'white',
        boxShadow: '0 4px 20px rgba(109, 90, 207, 0.08)'
      }}>
        {/* Profile Header */}
        <div className="p-4" style={{ 
          background: 'linear-gradient(135deg, rgba(109, 90, 207, 0.03) 0%, rgba(77, 58, 207, 0.03) 100%)',
          borderBottom: '1px solid rgba(109, 90, 207, 0.1)'
        }}>
          <div className="d-flex align-items-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="me-4 position-relative"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <img
                src={profilePicture || null}
                alt={name}
                className="rounded-circle border border-3 border-white shadow-sm"
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover'
                }}
              />
            </motion.div>
            <div>
              <h3 className="mb-1 fw-bold" style={{ color: '#4D3ACF' }}>{name}</h3>
              <p className="text-muted mb-1">{specialty}</p>
              <div className="d-flex align-items-center mb-2">
                <FaStar className="me-1" size={16} style={{ color: '#FFC107' }} />
                {loadingStats ? (
                  <span style={{ color: '#888', fontWeight: 500, fontSize: 15 }}>Loading...</span>
                ) : (
                  <>
                    <span style={{ color: '#4D3ACF', fontWeight: 700, fontSize: 17, marginRight: 2 }}>
                      {reviewStats.rating !== null ? reviewStats.rating.toFixed(1) : '0.0'}
                    </span>
                    <span style={{ color: '#888', fontWeight: 500, fontSize: 15 }}>
                      ({reviewStats.reviewsCount !== null ? reviewStats.reviewsCount : 0} {t('doctorInfo.reviews')})
                    </span>
                  </>
                )}
              </div>
              {experience > 0 && (
                <Badge pill className="px-3 py-1 d-flex align-items-center" style={{ 
                  background: 'rgba(109, 90, 207, 0.1)',
                  color: '#4D3ACF',
                  fontSize: '0.85rem',
                  width: 'fit-content'
                }}>
                  <FaAward className="me-1" size={12}/> 
                  {experience} {t('doctorInfo.yearsExperience')}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <Card.Body className="p-4">
          {/* About Section */}
          <div className="mb-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: '#4D3ACF' }}>
              <FaUserMd className="me-2" size={16} />
              {t('doctorInfo.aboutDr')} {name.split(' ')[0]}
            </h5>
            <p className="mb-0" style={{ lineHeight: '1.7' }}>{bio}</p>
          </div>

          {/* Details Section */}
          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 rounded" style={{ 
                background: 'rgba(109, 90, 207, 0.03)',
                border: '1px solid rgba(109, 90, 207, 0.08)'
              }}>
                <h6 className="fw-bold mb-3 d-flex align-items-center" style={{ color: '#4D3ACF' }}>
                  <FaGraduationCap className="me-2" size={14} />
                  {t('description')}
                </h6>
                <p className="small mb-3">{description || t('doctorInfo.noDescription')}</p>

                {education.length > 0 && (
                  <>
                    <h6 className="fw-bold mt-4 mb-3 d-flex align-items-center" style={{ color: '#4D3ACF' }}>
                      <FaGraduationCap className="me-2" size={14} />
                      {t('doctorInfo.education')}
                    </h6>
                    <ul className="list-unstyled small">
                      {education.map((edu, index) => (
                        <motion.li 
                          key={index} 
                          className="mb-2 ps-3 position-relative"
                          whileHover={{ x: 3 }}
                        >
                          <div style={{
                            position: 'absolute',
                            left: 0,
                            top: '8px',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#6D5ACF'
                          }}></div>
                          {edu}
                        </motion.li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 rounded" style={{ 
                background: 'rgba(109, 90, 207, 0.03)',
                border: '1px solid rgba(109, 90, 207, 0.08)'
              }}>
                <h6 className="fw-bold mb-3 d-flex align-items-center" style={{ color: '#4D3ACF' }}>
                  <FaLanguage className="me-2" size={14} />
                  Languages Spoken
                </h6>
                <div className="d-flex flex-column gap-1">
                  {languages.map((lang, index) => (
                    <div key={index} className="d-flex align-items-center">
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#6D5ACF',
                        marginRight: '8px'
                      }}></div>
                      <span style={{ color: '#555', fontSize: '0.9rem' }}>{lang}</span>
                    </div>
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