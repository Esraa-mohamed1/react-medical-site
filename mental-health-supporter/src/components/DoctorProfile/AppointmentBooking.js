import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import BookingModal from './BookingModal';
import { FaCalendarAlt } from 'react-icons/fa';
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
      getAvailableTimes(doctorId)
        .then(setAvailableTimes)
        .catch(() => setError(t('appointmentBooking.fetchError')))
        .finally(() => setLoading(false));
    }
  }, [doctorId, t]);

  const handleBookClick = (slot) => {
    // Normalize slot fields for modal and API
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        dir="rtl"
      >
        <Card className="border-0 shadow-sm sticky-top" style={{ top: '20px', background: 'var(--light-teal)', borderColor: 'var(--secondary-teal)' }} id="booking">
          <Card.Body className="p-4">
            <div className="d-flex align-items-center mb-4 justify-content-end">
              <h4 className="mb-0 ms-2" style={{ color: 'var(--secondary-teal)' }}>
                {t('title')}
              </h4>
              <FaCalendarAlt size={24} style={{ color: 'var(--secondary-teal)' }} />
            </div>
            {loading && <div style={{ color: 'var(--secondary-teal)' }}>{t('loading')}</div>}
            {error && <div className="text-danger" style={{ color: 'var(--secondary-teal)' }}>{error}</div>}
            <div className="d-grid gap-2 mt-2">
              {availableTimes.length > 0 ? availableTimes.map((slot) => {
                // Normalize slot fields for display
                const date = slot.date || (slot.date_time ? slot.date_time.split('T')[0] : '');
                const start_time = slot.start_time || slot.startTime || slot.time || (slot.date_time ? slot.date_time.split('T')[1]?.slice(0,5) : '');
                const end_time = slot.end_time || slot.endTime || '';
                const isAvailable = slot.available !== false;
                return (
                  <Button
                    key={slot.id}
                    variant="outline-primary"
                    className="time-slot-btn d-flex flex-row align-items-center justify-content-between px-3 py-3 mb-2 shadow-sm"
                    onClick={() => isAvailable && handleBookClick(slot)}
                    disabled={!isAvailable}
                    style={{
                      background: isAvailable ? '#fff' : '#f5f5f5',
                      color: 'var(--secondary-teal)',
                      borderColor: 'var(--secondary-teal)',
                      borderRadius: 16,
                      fontWeight: 600,
                      minHeight: 64,
                      boxShadow: '0 2px 8px rgba(44, 62, 80, 0.07)',
                      opacity: isAvailable ? 1 : 0.6,
                      cursor: isAvailable ? 'pointer' : 'not-allowed'
                    }}
                  >
                    <div className="d-flex flex-column align-items-start">
                      <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--secondary-teal)' }}>
                        <span style={{ marginRight: 6, fontSize: 15, color: '#888' }}>{t('date')}</span> {date}
                      </div>
                      <div style={{ fontSize: 15, color: '#444', marginTop: 2 }}>
                        <span style={{ marginRight: 8 }}>{t('startTime')}: <span style={{ color: 'var(--primary-teal)', fontWeight: 600 }}>{start_time}</span></span>
                        <span>{t('endTime')}: <span style={{ color: 'var(--primary-teal)', fontWeight: 600 }}>{end_time}</span></span>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-end gap-2">
                      <span className="badge rounded-pill px-3 py-2" style={{ background: isAvailable ? 'var(--secondary-teal)' : '#bbb', color: '#fff', fontSize: 15, fontWeight: 600, letterSpacing: 0.5 }}>
                        {isAvailable ? t('available') : t('unavailable')}
                      </span>
                      <span className="badge rounded-pill px-3 py-2" style={{ background: '#f7fafc', color: 'var(--secondary-teal)', fontSize: 15, fontWeight: 600, border: '1px solid var(--secondary-teal)' }}>
                        {t('price')}: {slot.price ? slot.price : '-'}
                      </span>
                    </div>
                  </Button>
                );
              }) : !loading && <div style={{ color: 'var(--secondary-teal)' }}>{t('noTimes')}</div>}
            </div>
          </Card.Body>
        </Card>
      </motion.div>
      <BookingModal
        show={showModal}
        onHide={() => setShowModal(false)}
        selectedSlot={selectedSlot}
        doctorId={doctorId}
      />
    </>
  );
};

export default AppointmentBooking;
