import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import BookingModal from './BookingModal';
import { FaCalendarAlt } from 'react-icons/fa';
import { getAvailableTimes } from '../../services/doctors/AvailableTimeService';

const AppointmentBooking = ({ doctorId }) => {
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
        .catch(() => setError('Failed to fetch available times'))
        .finally(() => setLoading(false));
    }
  }, [doctorId]);

  const handleBookClick = (slot) => {
    setSelectedSlot({
      ...slot,
      dateTime: slot.date_time || slot.dateTime || `${slot.date}T${slot.time}` // ensure ISO format
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
        <Card className="border-0 shadow-sm sticky-top" style={{ top: '20px' }} id="booking">
          <Card.Body className="p-4">
            <div className="d-flex align-items-center mb-4 justify-content-end">
              <h4 className="mb-0 ms-2" style={{ color: 'var(--primary-purple)' }}>Book Appointment</h4>
              <FaCalendarAlt size={24} style={{ color: 'var(--primary-purple)' }} />
            </div>
            {loading && <div>Loading available times...</div>}
            {error && <div className="text-danger">{error}</div>}
            <div className="d-grid gap-2 mt-2">
              {availableTimes.length > 0 ? availableTimes.map((slot) => (
                <Button
                  key={slot.id}
                  variant="outline-primary"
                  className="time-slot-btn d-flex justify-content-between align-items-center"
                  onClick={() => handleBookClick(slot)}
                >
                  <span>{slot.time}</span>
                  <Badge bg="light" text="primary" pill>Available</Badge>
                </Button>
              )) : !loading && <div>No available times for this doctor.</div>}
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
