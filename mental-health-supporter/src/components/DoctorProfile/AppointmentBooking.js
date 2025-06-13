import React, { useState } from 'react';
import { Card, Button, Badge, Accordion } from 'react-bootstrap';
import { motion } from 'framer-motion';
import BookingModal from './BookingModal';
import { FaCalendarAlt, FaClock, FaArrowDown } from 'react-icons/fa';

const AppointmentBooking = ({ slots }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeDay, setActiveDay] = useState('today');

  const handleBookClick = (slot) => {
    setSelectedSlot(slot);
    setShowModal(true);
  };

  const days = [
    { id: 'today', name: 'Today', date: 'June 25', slots: slots.slice(0, 4) },
    { id: 'tomorrow', name: 'Tomorrow', date: 'June 26', slots: slots.slice(2, 6) },
    { id: 'dayAfter', name: 'Day After', date: 'June 27', slots: slots.slice(1, 5) }
  ];

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

            <Accordion defaultActiveKey="today" className="mb-3">
              {days.map((day) => (
                <Accordion.Item eventKey={day.id} key={day.id}>
                  <Accordion.Header>
                    <div className="d-flex justify-content-between w-100 ps-2">
                      <span className="fw-bold">{day.name}, {day.date}</span>
                      <FaArrowDown />
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    <div className="d-grid gap-2 mt-2">
                      {day.slots.map((slot, index) => (
                        <Button
                          key={index}
                          variant="outline-primary"
                          className="time-slot-btn d-flex justify-content-between align-items-center"
                          onClick={() => handleBookClick(`${day.name} ${slot}`)}
                        >
                          <span>{slot}</span>
                          <Badge bg="light" text="primary" pill>Available</Badge>
                        </Button>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>

            <div className="text-center mt-3">
              <Button variant="light" className="text-primary w-100">
                Show More Appointments
              </Button>
            </div>
          </Card.Body>
        </Card>
      </motion.div>

      <BookingModal
        show={showModal}
        onHide={() => setShowModal(false)}
        selectedSlot={selectedSlot}
      />
    </>
  );
};

export default AppointmentBooking;
