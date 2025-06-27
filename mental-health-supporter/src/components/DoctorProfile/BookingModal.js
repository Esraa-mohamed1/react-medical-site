import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { FaUser, FaPhone, FaEnvelope, FaCalendarDay, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const BookingModal = ({ show, onHide, selectedSlot, doctorId }) => {
  const [formData, setFormData] = useState({
    notes: ''
  });
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
      message: `Payment completed by ${details.payer.name.given_name}`
    });
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const accessToken = localStorage.getItem('access');
      const transactionId = data.orderID || (details.purchase_units && details.purchase_units[0]?.payments?.captures[0]?.id);
      const appointmentData = {
        title: 'Consultation',
        doctor: doctorId,
        appointment_date: selectedSlot && selectedSlot.dateTime ? selectedSlot.dateTime : '',
        notes: formData.notes,
        paypal_transaction_id: transactionId
      };
      await axios.post(
        'http://127.0.0.1:8000/api/users/appointments/create/',
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
        message: `Appointment successfully booked for ${appointmentData.appointment_date}`
      });
      setTimeout(() => {
        setFormData({ notes: '' });
        setValidated(false);
        setSubmitStatus(null);
        setPaymentCompleted(false);
        onHide();
      }, 2000);
    } catch (err) {
      setError(err.response?.data ? JSON.stringify(err.response.data) : 'Failed to book appointment.');
      console.error('Booking error:', err);
    }
    setLoading(false);
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
      const appointmentData = {
        title: 'Consultation',
        doctor: doctorId,
        appointment_date: selectedSlot && selectedSlot.dateTime ? selectedSlot.dateTime : '',
        notes: formData.notes
      };
      await axios.post(
        'http://127.0.0.1:8000/api/users/appointments/create/',
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
        message: `Appointment successfully booked for ${appointmentData.appointment_date}`
      });
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your appointment has been booked successfully.',
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
      setError(err.response?.data ? JSON.stringify(err.response.data) : 'Failed to book appointment.');
      console.error('Booking error:', err);
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onHide} centered className="purple-modal">
      <Modal.Header closeButton style={{ borderBottom: '1px solid var(--light-teal)' }}>
        <Modal.Title className="w-100 text-center" style={{ color: 'var(--primary-purple)' }}>
          <FaCalendarDay className="me-2" />
          Confirm Appointment
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-start">
        {/* Show patient name */}
        {patientName && (
          <div className="mb-3 d-flex align-items-center">
            <FaUser className="me-2 text-primary" />
            <span className="fw-bold" style={{ color: 'var(--primary-purple)' }}>Patient: {patientName}</span>
          </div>
        )}
        {submitStatus && (
          <Alert variant={submitStatus.type} className="d-flex align-items-center">
            <FaInfoCircle className="me-2" />
            {submitStatus.message}
          </Alert>
        )}

        <div className="text-start mb-4 p-3 bg-light rounded">
          <h5 style={{ color: 'var(--secondary-teal)' }}>
            {selectedSlot && selectedSlot.dateTime
              ? `${selectedSlot.dateTime}`
              : 'No slot selected'}
          </h5>
        </div>

        <Form noValidate validated={validated}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              placeholder="Discuss symptoms, etc."
              value={formData.notes}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide notes for the appointment.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>

        {/* Remove PayPal button from modal */}
        {/* {!paymentCompleted && (
          <div className="mt-4">
            <PayPalScriptProvider options={{ "client-id": "AaJOaVlRFMUDizYhEvaYNeNv4Ewm_VUprTaeVqnPTA6yFFnsybdEIdHcVRdVupPRjluzJKDrP-dfVugd" }}>
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{ amount: { value: "10.00" } }],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => handlePaymentSuccess(details, data));
                }}
              />
            </PayPalScriptProvider>
          </div>
        )} */}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="d-grid gap-2 mt-3">
            <Button
              variant="primary"
              type="submit"
              disabled={submitStatus?.type === 'success' || loading}
            >
              Confirm Booking
            </Button>
            <Button variant="outline-secondary" onClick={onHide}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;
