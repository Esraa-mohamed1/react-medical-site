import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { FaUser, FaPhone, FaEnvelope, FaCalendarDay, FaInfoCircle } from 'react-icons/fa';
import { PayPalButton } from 'react-paypal-button-v2';

const BookingModal = ({ show, onHide, selectedSlot }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [validated, setValidated] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setSubmitStatus({ type: 'info', message: 'Submitting your booking...' });

    setTimeout(() => {
      setSubmitStatus({
        type: 'success',
        message: `Appointment successfully booked for ${formData.name} at ${selectedSlot}`
      });

      setTimeout(() => {
        setFormData({ name: '', phone: '', email: '', notes: '' });
        setValidated(false);
        setSubmitStatus(null);
        setPaymentCompleted(false);
        onHide();
      }, 2000);
    }, 1000);
  };

  const handlePaymentSuccess = (details, data) => {
    setPaymentCompleted(true);
    setSubmitStatus({
      type: 'success',
      message: `Payment completed by ${details.payer.name.given_name}`
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered className="purple-modal">
      <Modal.Header closeButton style={{ borderBottom: '1px solid var(--light-purple)' }}>
        <Modal.Title className="w-100 text-center" style={{ color: 'var(--primary-purple)' }}>
          <FaCalendarDay className="me-2" />
          Confirm Appointment
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
          <h5 style={{ color: 'var(--secondary-purple)' }}>{selectedSlot}</h5>
          <p className="text-muted mb-0">
            {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
          </p>
        </div>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>
              <FaUser className="me-2" style={{ color: 'var(--primary-purple)' }} />
              Patient Name
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter patient name"
              value={formData.name}
              onChange={handleChange}
              className="text-start"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 text-start">
            <Form.Label>
              <FaPhone className="me-2" style={{ color: 'var(--primary-purple)' }} />
              Phone Number
            </Form.Label>
            <Row>
              <Col xs={4}>
                <Form.Select defaultValue="+1" name="countryCode">
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+971">🇦🇪 +971</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="text-start"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3 text-start">
            <Form.Label>
              <FaEnvelope className="me-2" style={{ color: 'var(--primary-purple)' }} />
              Email (Optional)
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              className="text-start"
            />
          </Form.Group>

          <Form.Group className="mb-3 text-start">
            <Form.Label>Additional Notes (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              placeholder="Any additional information..."
              value={formData.notes}
              onChange={handleChange}
              className="text-start"
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="submit"
              disabled={submitStatus?.type === 'success'}
            >
              Confirm Booking
            </Button>
            <Button variant="outline-secondary" onClick={onHide}>
              Cancel
            </Button>
          </div>
        </Form>

        {!paymentCompleted && (
          <div className="mt-4">
            <PayPalButton
              amount="10.00"
              onSuccess={handlePaymentSuccess}
              options={{
                clientId: 'AYxEkVx6AWNMRdcLDVReuhZLoGrn0aTzPPJG_9HjzPXWF9HXWxDJajJxfrtx8VKNOxgd5OUrvj77VKJT'
              }}
            />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;
