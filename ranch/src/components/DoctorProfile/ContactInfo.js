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

const ContactInfo = ({ contact }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      dir="ltr"
    >
      <Card className="border-0 shadow-sm mb-4 text-start">
        <Card.Body className="p-4">
          <h4 className="section-title mb-4">Contact Information</h4>

          <ListGroup variant="flush" className="mb-4">
            <ListGroup.Item className="d-flex align-items-center py-3 border-bottom">
              <div className="icon-container me-3">
                <FaPhone size={20} style={{ color: 'var(--primary-purple)' }} />
              </div>
              <div>
                <h6 className="mb-1 fw-bold">Phone Number</h6>
                <p className="mb-0 text-muted">{contact.phone}</p>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 text-primary text-decoration-none"
                  onClick={() => window.location.href = `tel:${contact.phone}`}
                >
                  Call Now
                </Button>
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="d-flex align-items-center py-3 border-bottom">
              <div className="icon-container me-3">
                <FaEnvelope size={20} style={{ color: 'var(--primary-purple)' }} />
              </div>
              <div>
                <h6 className="mb-1 fw-bold">Email Address</h6>
                <p className="mb-0 text-muted">{contact.email}</p>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 text-primary text-decoration-none"
                  onClick={() => window.location.href = `mailto:${contact.email}`}
                >
                  Send Message
                </Button>
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="d-flex align-items-center py-3">
              <div className="icon-container me-3">
                <FaMapMarkerAlt size={20} style={{ color: 'var(--primary-purple)' }} />
              </div>
              <div>
                <h6 className="mb-1 fw-bold">Clinic Address</h6>
                <p className="mb-0 text-muted">{contact.address}</p>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 text-primary text-decoration-none"
                  onClick={() => window.open(contact.mapLink, '_blank')}
                >
                  View on Map
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>

          <div className="mt-4">
            <h6 className="fw-bold mb-3 d-flex justify-content-start align-items-center">
              Social Media
            </h6>
            <div className="d-flex justify-content-start gap-3">
              <Button
                variant="outline-primary"
                className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                onClick={() => window.open(contact.socialMedia.facebook, '_blank')}
              >
                <FaFacebook size={20} />
              </Button>
              <Button
                variant="outline-primary"
                className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                onClick={() => window.open(contact.socialMedia.twitter, '_blank')}
              >
                <FaTwitter size={20} />
              </Button>
              <Button
                variant="outline-primary"
                className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                onClick={() => window.open(contact.socialMedia.instagram, '_blank')}
              >
                <FaInstagram size={20} />
              </Button>
              <Button
                variant="outline-primary"
                className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                onClick={() => window.open(contact.socialMedia.whatsapp, '_blank')}
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
