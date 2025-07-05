import React, { useState, useEffect } from 'react';
import { Card, Badge, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { motion } from 'framer-motion';
import BookingModal from './BookingModal';
import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { getAvailableTimes } from '../../services/doctors/AvailableTimeService';
import { useTranslation } from 'react-i18next';

const AppointmentBooking = ({ doctorId }) => {
  const { t } = useTranslation();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (doctorId) {
      setLoading(true);
      setError('');
      getAvailableTimes(doctorId)
        .then(setAvailableTimes)
        .catch(() => setError(t('fetchError')))
        .finally(() => setLoading(false));
    }
  }, [doctorId, t]);

  const handleBookClick = (slot) => {
    const date = slot.date || (slot.date_time ? slot.date_time.split('T')[0] : '');
    const start_time = slot.start_time || slot.startTime || slot.time || (slot.date_time ? slot.date_time.split('T')[1]?.slice(0,5) : '');
    const end_time = slot.end_time || slot.endTime || '';
    setSelectedSlot({
      ...slot,
      date,
      start_time,
      end_time,
      dateTime: slot.date_time || slot.dateTime || `${date}T${start_time}`
    });
    setShowModal(true);
  };

  const formatPrice = (price) => {
    if (!price) return t('free');
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      dir="rtl"
    >
      <Card className="border-0 sticky-top" style={{ 
        top: '20px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 12px 24px rgba(109, 90, 207, 0.1)',
        overflow: 'hidden'
      }} id="booking">
        <Card.Body className="p-4">
          <div className="d-flex align-items-center mb-4" style={{ borderBottom: '2px solid rgba(109, 90, 207, 0.1)', paddingBottom: '16px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(109, 90, 207, 0.08) 0%, rgba(77, 58, 207, 0.08) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '12px'
            }}>
              <FaCalendarAlt size={24} style={{ color: '#6D5ACF' }} />
            </div>
            <h4 className="mb-0 fw-bold" style={{ 
              color: '#4D3ACF',
              fontSize: '1.6rem',
              letterSpacing: '0.5px'
            }}>
              {t('bookingAppointments')}
            </h4>
          </div>

          {loading && (
            <div className="d-flex flex-column align-items-center justify-content-center my-5 py-3">
              <Spinner animation="border" style={{ color: '#6D5ACF', width: '3rem', height: '3rem' }} />
              <span className="mt-3" style={{ color: '#4a5568', fontSize: '1.1rem' }}>{t('loading')}</span>
            </div>
          )}

          {error && (
            <div className="text-center my-4 p-3 rounded" style={{ 
              background: 'rgba(255, 107, 107, 0.08)',
              border: '1px solid rgba(255, 107, 107, 0.3)',
              color: '#ff6b6b'
            }}>
              <FaTimesCircle className="me-2" />
              {error}
            </div>
          )}

          <div className="d-grid gap-4 mt-4">
            {availableTimes.length > 0 ? availableTimes.map((slot) => {
              const date = slot.date || (slot.date_time ? slot.date_time.split('T')[0] : '');
              const start_time = slot.start_time || slot.startTime || slot.time || (slot.date_time ? slot.date_time.split('T')[1]?.slice(0,5) : '');
              const end_time = slot.end_time || slot.endTime || '';
              const isAvailable = slot.available !== false;
              
              return (
                <OverlayTrigger
                  key={slot.id}
                  placement="left"
                  overlay={
                    <Tooltip id={`tooltip-${slot.id}`} style={{ 
                      borderRadius: '10px',
                      padding: '10px 14px',
                      fontSize: '14px',
                      background: '#6D5ACF'
                    }}>
                      {isAvailable ? t('clickToBook') : t('unavailable')}
                    </Tooltip>
                  }
                >
                  <motion.div
                    whileHover={isAvailable ? { y: -3, boxShadow: '0 8px 20px rgba(109, 90, 207, 0.2)' } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={`d-flex flex-column p-4 mb-3 ${isAvailable ? 'available-slot' : 'unavailable-slot'}`}
                      style={{
                        background: 'white',
                        borderRadius: '16px',
                        border: isAvailable ? '1px solid rgba(109, 90, 207, 0.2)' : '1px solid #edf2f7',
                        boxShadow: '0 4px 16px rgba(109, 90, 207, 0.08)',
                        opacity: isAvailable ? 1 : 0.7,
                        cursor: isAvailable ? 'pointer' : 'not-allowed',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => isAvailable && handleBookClick(slot)}
                    >
                      {/* Availability Indicator */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: isAvailable ? '#00C853' : '#ff3d00',
                        border: '2px solid white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}></div>

                      {/* Date and Price Row */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                          <FaCalendarAlt size={18} style={{ color: '#6D5ACF', marginLeft: '6px' }} />
                          <span className="ms-3 fw-bold" style={{ 
                            color: '#4D3ACF', 
                            fontSize: '16px',
                            letterSpacing: '0.3px'
                          }}>
                            {date} 苗
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <FaMoneyBillWave size={18} style={{ color: '#6D5ACF' }} />
                          <span className="ms-2 fw-bold" style={{ 
                            color: '#6D5ACF',
                            fontSize: '16px'
                          }}>
                            {formatPrice(slot.price)}
                          </span>
                        </div>
                      </div>

                      {/* Time Row */}
                      <div className="d-flex align-items-center mb-3">
                        <FaClock size={18} style={{ color: '#6D5ACF', marginLeft: '6px' }} />
                        <span className="ms-3 fw-medium" style={{ 
                          color: '#4a5568',
                          fontSize: '15px'
                        }}>
                          {start_time} - {end_time}
                        </span>
                      </div>

                      {/* Status Indicator */}
                      <div className="d-flex justify-content-end">
                        <Badge 
                          pill 
                          className="px-3 py-2" 
                          style={{ 
                            background: isAvailable ? 'rgba(0, 200, 83, 0.1)' : 'rgba(255, 61, 0, 0.1)',
                            border: isAvailable ? '1px solid rgba(0, 200, 83, 0.3)' : '1px solid rgba(255, 61, 0, 0.3)',
                            fontSize: '14px'
                          }}
                        >
                          {isAvailable ? (
                            <span style={{ color: '#00C853' }}>✓ Available</span>
                          ) : (
                            <span style={{ color: '#ff3d00' }}>✗ Unavailable</span>
                          )}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                </OverlayTrigger>
              );
            }) : !loading && (
              <div className="text-center py-5" style={{ 
                color: '#718096',
                background: 'rgba(237, 242, 247, 0.5)',
                borderRadius: '16px',
                border: '1px dashed #e2e8f0'
              }}>
                <FaCalendarAlt size={28} style={{ color: '#cbd5e0', marginBottom: '16px' }} />
                <div style={{ fontSize: '17px', fontWeight: 500 }}>{t('noAppointmentsAvailable')}</div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      <BookingModal
        show={showModal}
        onHide={() => setShowModal(false)}
        selectedSlot={selectedSlot}
        doctorId={doctorId}
      />
    </motion.div>
  );
};

export default AppointmentBooking;