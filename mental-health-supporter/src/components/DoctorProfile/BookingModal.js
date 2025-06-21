import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FaCalendarDay, FaInfoCircle } from 'react-icons/fa';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { createAppointment } from '../../services/doctors/AppointmentService';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSuccess = async (details, data) => {
    setPaymentCompleted(true);
    setSubmitStatus({
      type: 'success',
      message: t('bookingModal.paymentCompleted', { name: details.payer.name.given_name })
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
        appointment_date: selectedSlot?.dateTime || '',
        notes: formData.notes,
        paypal_transaction_id: transactionId
      };
      await createAppointment(appointmentData, accessToken);
      setSuccess(t('bookingModal.bookingSuccess'));
      setSubmitStatus({
        type: 'success',
        message: `${t('bookingModal.bookingSuccess')} (${appointmentData.appointment_date})`
      });
      setTimeout(() => {
        resetForm();
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
    if (e.currentTarget.checkValidity() === false) {
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
        appointment_date: selectedSlot?.dateTime || '',
        notes: formData.notes
      };
      await createAppointment(appointmentData, accessToken);
      setSuccess(t('bookingModal.bookingSuccess'));
      setSubmitStatus({
        type: 'success',
        message: `${t('bookingModal.bookingSuccess')} (${appointmentData.appointment_date})`
      });
      Swal.fire({
        icon: 'success',
        title: t('bookingModal.swalTitle'),
        text: t('bookingModal.swalText'),
        confirmButtonColor: '#6f42c1'
      });
      setTimeout(() => {
        resetForm();
        onHide();
      }, 2000);
    } catch (err) {
      setError(err.response?.data ? JSON.stringify(err.response.data) : 'Failed to book appointment.');
      console.error('Booking error:', err);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({ notes: '' });
    setValidated(false);
    setSubmitStatus(null);
    setPaymentCompleted(false);
  };

  return (
    <Modal show={show} onHide={onHide} centered className="purple-modal">
      <Modal.Header closeButton style={{ borderBottom: '1px solid var(--light-purple)' }}>
        <Modal.Title className="w-100 text-center" style={{ color: 'var(--primary-purple)' }}>
          <FaCalendarDay className="me-2" />
          {t('bookingModal.title')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-start">
        {submitStatus && (
          <Alert variant={submitStatus.type} className="d-flex align-items-center">
            <FaInfoCircle className="me-2" />
            {submitStatus.message}
          </Alert>
        )}

        <div className="text-start mb-4 p-3 bg-light rounded">
          <h5 style={{ color: 'var(--secondary-purple)' }}>
            {selectedSlot?.dateTime || t('bookingModal.slotNone')}
          </h5>
        </div>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>{t('bookingModal.notes')}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              placeholder={t('bookingModal.notesPlaceholder')}
              value={formData.notes}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              {t('bookingModal.notesInvalid')}
            </Form.Control.Feedback>
          </Form.Group>

          {!paymentCompleted && (
            <div className="mt-4">
              <PayPalScriptProvider options={{ "client-id": "AaJOaVlRFMUDizYhEvaYNeNv4Ewm_VUprTaeVqnPTA6yFFnsybdEIdHcVRdVupPRjluzJKDrP-dfVugd" }}>
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{ amount: { value: t('bookingModal.paypalAmount') } }],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) =>
                      handlePaymentSuccess(details, data)
                    );
                  }}
                />
              </PayPalScriptProvider>
            </div>
          )}

          <div className="d-grid gap-2 mt-3">
            <Button
              variant="primary"
              type="submit"
              disabled={submitStatus?.type === 'success' || loading}
            >
              {t('bookingModal.confirm')}
            </Button>
            <Button variant="outline-secondary" onClick={onHide}>
              {t('bookingModal.cancel')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;
