import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { FaUser, FaPhone, FaEnvelope, FaCalendarDay, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const BookingModal = ({ show, onHide, selectedSlot, doctorId }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ notes: '' });
  const [validated, setValidated] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get patient name from localStorage
  let patientName = '';
  try {
    const userDataRaw = localStorage.getItem('loggedUser');
    if (userDataRaw) {
      const userData = JSON.parse(userDataRaw);
      if (userData && typeof userData === 'object') {
        patientName = userData.name || userData.full_name || userData.username || '';
      }
    }
  } catch (e) {
    patientName = '';
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSuccess = async (details, data) => {
    setPaymentCompleted(true);
    setSubmitStatus({
      type: 'success',
      message: t('bookingModal.paymentSuccess', { name: details.payer.name.given_name })
    });
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const accessToken = localStorage.getItem('access');
      const transactionId = data.orderID || (details.purchase_units && details.purchase_units[0]?.payments?.captures[0]?.id);
      const appointmentData = {
        title: t('bookingModal.consultation'),
        doctor: doctorId,
        appointment_date: selectedSlot?.dateTime || '',
        notes: formData.notes,
        paypal_transaction_id: transactionId
      };
      await axios.post(
        'https://pearla.pythonanywhere.com/api/users/appointments/create/',
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setSuccess('Appointment booked successfully!');
      setSubmitStatus({
        type: 'success',
        message: t('bookingModal.bookedFor', { date: appointmentData.appointment_date })
      });
      setTimeout(() => {
        setFormData({ notes: '' });
        setValidated(false);
        setSubmitStatus(null);
        setPaymentCompleted(false);
        onHide();
      }, 2000);
    } catch (err) {
      setError(err.response?.data ? JSON.stringify(err.response.data) : t('bookingModal.failed'));
    }
    setLoading(false);
  };

  const formatDate = (dateObj) => {
    // Returns YYYY-MM-DD
    return dateObj.toISOString().slice(0, 10);
  };

  const formatTime = (dateObj) => {
    // Returns HH:MM:00 (no seconds/milliseconds unless present in slot)
    const h = String(dateObj.getUTCHours()).padStart(2, '0');
    const m = String(dateObj.getUTCMinutes()).padStart(2, '0');
    return `${h}:${m}:00`;
  };

  const parseSlotDateTime = (dateTimeStr) => {
    // Accepts ISO string or 'YYYY-MM-DDTHH:MM' or 'YYYY-MM-DDTHH:MM:SS'
    // Returns { date: 'YYYY-MM-DD', time: 'HH:MM:00' }
    const d = new Date(dateTimeStr);
    return {
      appointment_date: formatDate(d),
      time: formatTime(d)
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const accessToken = localStorage.getItem('access');
      const slotDateTime = selectedSlot?.dateTime || '';
      const { appointment_date, time } = parseSlotDateTime(slotDateTime);
      // Try to get available_time from slot, fallback to id or dateTime
      const available_time = selectedSlot.available_time || selectedSlot.id || slotDateTime;
      const appointmentData = {
        title: t('bookingModal.consultation'),
        doctor: doctorId,
        appointment_date,
        time,
        notes: formData.notes,
        available_time
      };
      await axios.post(
        'https://pearla.pythonanywhere.com/api/users/appointments/create/',
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setSuccess('Appointment booked successfully!');
      setSubmitStatus({
        type: 'success',
        message: t('bookingModal.bookedFor', { date: appointmentData.appointment_date })
      });
      Swal.fire({
        icon: 'success',
        title: t('bookingModal.successTitle'),
        text: t('bookingModal.successText'),
        confirmButtonColor: '#6f42c1'
      });
      setTimeout(() => {
        setFormData({ notes: '' });
        setValidated(false);
        setSubmitStatus(null);
        setPaymentCompleted(false);
        onHide();
      }, 2000);
    } catch (err) {
      setError(err.response?.data ? JSON.stringify(err.response.data) : t('bookingModal.failed'));
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onHide} centered className="purple-modal">
      <Modal.Header closeButton style={{ borderBottom: '1px solid var(--primary-purple)', background: 'var(--light-teal, #e3e6f3)' }}>
        <Modal.Title className="w-100 text-center" style={{ color: 'var(--primary-purple)' }}>
          <FaCalendarDay className="me-2" />
          {t('bookingModal.confirmAppointment')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-start" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e3e6f3 100%)' }}>
        {/* Show patient name */}
        {patientName && (
          <div className="mb-3 d-flex align-items-center">
            <FaUser className="me-2" style={{ color: 'var(--primary-purple)' }} />
            <span className="fw-bold" style={{ color: 'var(--primary-purple)' }}>Patient: {patientName}</span>
          </div>
        )}
        {submitStatus && (
          <Alert variant={submitStatus.type} className="d-flex align-items-center" style={{ background: 'var(--light-teal, #e3e6f3)', color: 'var(--primary-purple)' }}>
            <FaInfoCircle className="me-2" />
            {submitStatus.message}
          </Alert>
        )}

        {/* Show slot date, start time, and end time */}
        {selectedSlot && (
          <div className="text-start mb-4 p-3 rounded" style={{ background: 'var(--light-teal, #e3e6f3)' }}>
            <div style={{ color: 'var(--primary-purple)', fontWeight: 600 }}>
              <div>
                <span>{t('bookingModal.date', 'date')}:</span> {selectedSlot.date || (selectedSlot.dateTime ? selectedSlot.dateTime.split('T')[0] : '')}
              </div>
              <div>
                <span>{t('bookingModal.startTime', 'startTime')}:</span> {selectedSlot.start_time || selectedSlot.startTime || (selectedSlot.dateTime ? (selectedSlot.dateTime.split('T')[1]?.slice(0,5) || '') : '')}
              </div>
              <div>
                <span>{t('bookingModal.endTime', 'endTime')}:</span> {selectedSlot.end_time || selectedSlot.endTime || ''}
              </div>
            </div>
          </div>
        )}

        <Form noValidate validated={validated}>
          <Form.Group className="mb-3 text-start">
            <Form.Label style={{ color: 'var(--primary-purple)' }}>{t('bookingModal.notes')}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              placeholder={t('bookingModal.notesPlaceholder')}
              value={formData.notes}
              onChange={handleChange}
              required
              style={{ borderColor: 'var(--primary-purple)', background: 'var(--light-teal, #e3e6f3)', color: 'var(--primary-purple)' }}
            />
            <Form.Control.Feedback type="invalid">
              {t('bookingModal.notesRequired')}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="d-grid gap-2 mt-3">
            <Button
              variant="primary"
              type="submit"
              disabled={submitStatus?.type === 'success' || loading}
              style={{
                background: 'var(--light-teal, #e3e6f3)',
                borderColor: 'var(--primary-purple)',
                color: 'var(--primary-purple)',
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(111,66,193,0.10)'
              }}
            >
              {t('bookingModal.confirmBooking')}
            </Button>
            <Button variant="outline-secondary" onClick={onHide} style={{ color: 'var(--primary-purple)', borderColor: 'var(--primary-purple)' }}>
              {t('bookingModal.cancel')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;
