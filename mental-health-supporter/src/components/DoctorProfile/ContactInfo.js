import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ContactInfo = ({ contact }) => {
  const { t } = useTranslation();

  // Fetch doctor info from localStorage if available
  let doctor = {};
  try {
    const doctorRaw = localStorage.getItem('doctor');
    if (doctorRaw) {
      doctor = JSON.parse(doctorRaw);
    }
  } catch (e) { /* ignore */ }
console.log(localStorage.getItem('doctor'))
  const social = doctor.socialMedia || {};
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      dir="ltr"
    >
      <Card className="border-0 shadow-sm mb-4 text-start">
        <Card.Body className="p-4">
          <h4 className="section-title mb-4">{t('contactInfo.title')}</h4>

          <ListGroup variant="flush" className="mb-4">
            <ListGroup.Item className="d-flex align-items-center py-3 border-bottom">
              <div className="icon-container me-3">
                <FaPhone size={20} style={{ color: 'var(--success-teal)' }} />
              </div>
              <div>
                <h6 className="mb-1 fw-bold">Phone Number</h6>
                <p className="mb-0 text-primary fw-bold" style={{ color: '#2A5C5F', wordBreak: 'break-all' }}>{doctor.phone || '-'}</p>
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="d-flex align-items-center py-3 border-bottom">
              <div className="icon-container me-3">
                <FaEnvelope size={20} style={{ color: 'var(--success-teal)' }} />
              </div>
              <div>
                <h6 className="mb-1 fw-bold">Email Address</h6>
                <p className="mb-0 text-primary fw-bold" style={{ color: '#2A5C5F', wordBreak: 'break-all' }}>{doctor.email || '-'}</p>
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="d-flex align-items-center py-3">
              <div className="icon-container me-3">
                <FaMapMarkerAlt size={20} style={{ color: 'var(--success-teal)' }} />
              </div>
              <div>
                <h6 className="mb-1 fw-bold">Clinic Address</h6>
                <p className="mb-0 text-primary fw-bold" style={{ color: '#2A5C5F', wordBreak: 'break-all' }}>{doctor.clinic_address || '-'}</p>
              </div>
            </ListGroup.Item>
          </ListGroup>

          <div className="mt-4">
            <h6 className="fw-bold mb-3 d-flex justify-content-start align-items-center">
              {t('contactInfo.social')}
            </h6>
            <div className="d-flex justify-content-start gap-3">
              <Button
                variant="outline-success"
                className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ color: '#2A5C5F' }}
                onClick={() => social.facebook && window.open(social.facebook, '_blank')}
                disabled={!social.facebook}
              >
                <FaFacebook size={20} />
              </Button>
              <Button
                variant="outline-success"
                className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ color: '#2A5C5F' }}
                onClick={() => social.twitter && window.open(social.twitter, '_blank')}
                disabled={!social.twitter}
              >
                <FaTwitter size={20} />
              </Button>
              <Button
                variant="outline-success"
                className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ color: '#2A5C5F' }}
                onClick={() => social.instagram && window.open(social.instagram, '_blank')}
                disabled={!social.instagram}
              >
                <FaInstagram size={20} />
              </Button>
              <Button
                variant="outline-success"
                className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ color: '#2A5C5F' }}
                onClick={() => social.whatsapp && window.open(social.whatsapp, '_blank')}
                disabled={!social.whatsapp}
              >
                <FaWhatsapp size={20} />
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ContactInfo;
