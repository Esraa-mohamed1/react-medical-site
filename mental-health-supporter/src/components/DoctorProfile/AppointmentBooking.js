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
                {t('appointmentBooking.title')}
              </h4>
              <FaCalendarAlt size={24} style={{ color: 'var(--secondary-teal)' }} />
            </div>
            {loading && <div style={{ color: 'var(--secondary-teal)' }}>{t('appointmentBooking.loading')}</div>}
            {error && <div className="text-danger" style={{ color: 'var(--secondary-teal)' }}>{error}</div>}
            <div className="d-grid gap-2 mt-2">
              {availableTimes.length > 0 ? availableTimes.map((slot) => {
                // Normalize slot fields for display
                const date = slot.date || (slot.date_time ? slot.date_time.split('T')[0] : '');
                const start_time = slot.start_time || slot.startTime || slot.time || (slot.date_time ? slot.date_time.split('T')[1]?.slice(0,5) : '');
                const end_time = slot.end_time || slot.endTime || '';
                return (
                  <Button
                    key={slot.id}
                    variant="outline-primary"
                    className="time-slot-btn d-flex flex-column align-items-start"
                    onClick={() => handleBookClick(slot)}
                    style={{ background: 'var(--extra-light-teal)', color: 'var(--secondary-teal)', borderColor: 'var(--secondary-teal)', fontWeight: 600 }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 16 }}>
                      {date}
                    </div>
                    <div style={{ fontSize: 15 }}>
                      <span style={{ marginRight: 8 }}>{t('appointmentBooking.startTime')}: {start_time}</span>
                      <span>{t('appointmentBooking.endTime')}: {end_time}</span>
                    </div>
                    <div className="mt-1">
                      <Badge bg="light" text="primary" pill style={{ background: 'var(--secondary-teal)', color: '#fff', border: 'none' }}>
                        {t('appointmentBooking.available')}
                      </Badge>
                    </div>
                  </Button>
                );
              }) : !loading && <div style={{ color: 'var(--secondary-teal)' }}>{t('appointmentBooking.noTimes')}</div>}
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
