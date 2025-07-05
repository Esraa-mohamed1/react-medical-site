import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Pagination, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaUserCircle, FaStar, FaComment } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const PatientReviews = ({ reviews: initialReviews = [], doctorId: propDoctorId }) => {
  const { t } = useTranslation();
  const { doctorId: paramDoctorId } = useParams();
  // Try to get doctorId from query string if not found in props or params
  let queryDoctorId = null;
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    queryDoctorId = params.get('doctorId');
  }
  const doctorId = propDoctorId || paramDoctorId || queryDoctorId;
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  // Try to get full_name from localStorage (if available)
  let localFullName = '';
  try {
    const loggedUserRaw = localStorage.getItem('loggedUser');
    if (loggedUserRaw) {
      const loggedUser = JSON.parse(loggedUserRaw);
      localFullName = loggedUser?.full_name || loggedUser?.fullName || '';
    }
  } catch (e) { localFullName = ''; }
  const [newReview, setNewReview] = useState({ patientName: localFullName, comment: '', rating: 0 });

  // Fetch reviews from API when doctorId changes
  useEffect(() => {
    if (!doctorId) return;
    setLoadingReviews(true);
    // Get token from localStorage (same logic as in handleSubmit)
    let token = null;
    try {
      token = localStorage.getItem('access');
      if (!token) {
        const loggedUserRaw = localStorage.getItem('loggedUser');
        const loggedUser = JSON.parse(loggedUserRaw);
        token = loggedUser?.access || loggedUser?.accessToken || loggedUser?.access_token || loggedUser?.token || null;
      }
    } catch (e) { token = null; }
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    fetch(`http://localhost:8000/api/medical/doctors/${doctorId}/reviews/`, { headers })
      .then(res => {
        if (!res.ok) throw new Error('Auth or fetch error');
        return res.json();
      })
      .then(data => {
        setReviews(Array.isArray(data) ? data : (data.results || []));
        setLoadingReviews(false);
      })
      .catch(err => {
        setReviews([]);
        setLoadingReviews(false);
        console.error('Failed to fetch reviews:', err);
      });
  }, [doctorId]);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const paginatedReviews = reviews.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handleStarClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async () => {
    // Always try to get full_name from localStorage before submit
    let fullName = newReview.patientName;
    try {
      const loggedUserRaw = localStorage.getItem('loggedUser');
      if (loggedUserRaw) {
        const loggedUser = JSON.parse(loggedUserRaw);
        fullName = loggedUser?.full_name || loggedUser?.fullName || fullName;
      }
    } catch (e) { /* ignore */ }
    if (!fullName || !newReview.comment || newReview.rating === 0) {
      alert(t('patientReviews.fillAllFields') || 'Please fill all fields and select a rating.');
      return;
    }

    if (!doctorId) {
      alert(t('patientReviews.doctorIdMissing') || 'Doctor ID is missing. Please try again later.');
      return;
    }

    // Get token from localStorage (adjust the key if your app uses a different one)
    let token = null;
    try {
      // Try to get access token directly from localStorage
      token = localStorage.getItem('access');
      if (!token) {
        // Fallback: try to get from loggedUser object
        const loggedUserRaw = localStorage.getItem('loggedUser');
        const loggedUser = JSON.parse(loggedUserRaw);
        token = loggedUser?.access || loggedUser?.accessToken || loggedUser?.access_token || loggedUser?.token || null;
      }
      console.log('Final extracted token:', token);
    } catch (e) { token = null; }
    if (!token) {
      alert(t('patientReviews.notLoggedIn') || 'You must be logged in to submit a review.');
      setSubmitting(false);
      return;
    }
    setSubmitting(true);
    try {
      // Debug log
      console.log('Submitting review for doctorId:', doctorId, newReview);
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Change to 'Token' if your backend expects that
      };
      const res = await fetch(`http://localhost:8000/api/medical/doctors/${doctorId}/reviews/create/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          patient_name: fullName,
          comment: newReview.comment,
          rating: newReview.rating
        })
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Review submit failed:', errorText);
        alert(t('patientReviews.submitFailed') || 'Failed to submit review.');
        setSubmitting(false);
        return;
      }
      const data = await res.json();
      setReviews([
        { ...data, response: null },
        ...reviews
      ]);
      setNewReview({ patientName: '', comment: '', rating: 0 });
      setShowForm(false);
      setActivePage(1);
    } catch (err) {
      console.error('Error submitting review:', err);
      alert(t('patientReviews.submitError') || 'Error submitting review.');
    } finally {
      setSubmitting(false);
    }
  };


  // Show a warning if doctorId is missing
  if (!doctorId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        dir="rtl"
      >
        <Card className="border-0 shadow-sm mb-4 text-end">
          <Card.Body className="p-4">
            <div className="alert alert-warning text-end mb-3" role="alert">
              {t('patientReviews.doctorIdMissing') || 'Doctor ID is missing. Please try again later.'}
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      dir="rtl"
    >
      <Card className="border-0 shadow-sm mb-4 text-end">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-row-reverse">
            <h4 className="section-title mb-0">{t('patientReviews.title')}</h4>
            <Button
              style={{ backgroundColor: '#2A5C5F', borderColor: '#2A5C5F', color: '#fff' }}
              size="sm"
              onClick={() => setShowForm(!showForm)}
            >
              <FaComment className="ms-2" />
              {showForm ? t('patientReviews.cancel') : t('patientReviews.addReview')}
            </Button>
          </div>

          {showForm && (
            <div className="mb-4 p-3 border rounded bg-light">
              {/* Removed full name field */}
              <Form.Group className="mb-3">
                <Form.Label>{t('patientReviews.review')}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newReview.comment}
                  onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>{t('patientReviews.rating')}</Form.Label>
                <div className="d-flex justify-content-end">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="ms-1"
                      size={20}
                      style={{ cursor: 'pointer' }}
                      color={i < newReview.rating ? '#ffc107' : '#e4e5e9'}
                      onClick={() => handleStarClick(i + 1)}
                    />
                  ))}
                </div>
              </Form.Group>

              <Button onClick={handleSubmit} variant="primary" disabled={submitting}>
                {submitting ? (t('patientReviews.submitting') || 'Submitting...') : t('patientReviews.publish')}
              </Button>
            </div>
          )}

          {loadingReviews ? (
            <div className="text-center my-4">{t('patientReviews.loading') || 'Loading reviews...'}</div>
          ) : paginatedReviews.length === 0 ? (
            <div className="text-center my-4 text-muted">{'No Reviews' || 'No reviews yet.'}</div>
          ) : (
            paginatedReviews.map((review, index) => (
              <motion.div
                key={index}
                className="review-card enhanced-review-card p-4 mb-4"
                whileHover={{ scale: 1.015, boxShadow: '0 6px 24px rgba(42,92,95,0.10)' }}
                transition={{ duration: 0.18 }}
                style={{
                  borderRadius: '18px',
                  boxShadow: '0 2px 12px rgba(42,92,95,0.08)',
                  background: '#fff',
                  border: '1px solid #f0f0f0',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Review comment first */}
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  marginBottom: '10px',
                  color: '#2A5C5F',
                  fontSize: '1.05em',
                  textAlign: 'end',
                  minHeight: '48px',
                  border: '1px solid #f0f0f0',
                }}>
                  {review.comment}
                </div>
                {/* Reviewer info and rating below */}
                <div style={{
                  background: 'linear-gradient(90deg, #e6f7f6 0%, #f7fafc 100%)',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  marginBottom: review.response ? '10px' : '0',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row-reverse',
                  boxShadow: '0 1px 4px rgba(42,92,95,0.04)'
                }}>
                  <div className="ms-3">
                    <FaUserCircle size={38} style={{ color: 'var(--primary-purple)' }} />
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold" style={{ color: '#2A5C5F' }}>{review.full_name || review.patientName || review.patient_name || (review.patient && review.patient.full_name) || 'Anonymous'}</h6>
                    <div className="d-flex align-items-center flex-row-reverse mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < (review.rating || 0) ? 'text-warning ms-1' : 'text-muted ms-1'}
                          size={16}
                        />
                      ))}
                      <small className="text-muted me-2" style={{ fontSize: '0.85em' }}>{review.date || review.created_at || ''}</small>
                    </div>
                  </div>
                </div>
                {review.response && (
                  <div style={{
                    background: '#e6f7f6',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    marginTop: '8px',
                    textAlign: 'end',
                    borderLeft: '4px solid #2A5C5F',
                  }}>
                    <small className="text-muted d-block mb-1" style={{ color: '#2A5C5F', fontWeight: 500 }}>{t('patientReviews.response')}:</small>
                    <p className="mb-0 small" style={{ color: '#2A5C5F' }}>{review.response}</p>
                  </div>
                )}
                {index < paginatedReviews.length - 1 && (
                  <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '22px 0 0 0' }} />
                )}
              </motion.div>
            ))
          )}

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination dir="ltr">
                <Pagination.Prev
                  onClick={() => setActivePage(p => Math.max(p - 1, 1))}
                  disabled={activePage === 1}
                />
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i + 1 === activePage}
                    onClick={() => setActivePage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => setActivePage(p => Math.min(p + 1, totalPages))}
                  disabled={activePage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default PatientReviews;