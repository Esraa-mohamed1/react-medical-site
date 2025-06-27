import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaProcedures, FaWifi } from 'react-icons/fa';

const ClinicDetails = ({ clinic }) => {
  // Defensive checks for undefined/null fields
  const address = clinic?.address || '';
  const openingHours = clinic?.openingHours || '';
  const fees = clinic?.fees || '';
  const services = Array.isArray(clinic?.services) ? clinic.services : (clinic?.services ? String(clinic.services).split(',') : []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      dir="rtl"
    >
      <Card className="border-0 shadow-sm mb-4 text-start">
        <Card.Body className="p-4">
          <h4 className="section-title">Clinic Information</h4>
          <ListGroup variant="flush" className="mb-4">
            <ListGroup.Item className="d-flex align-items-center py-3 border-bottom flex-row-reverse">
              <div className="icon-container ms-3">
                <FaMapMarkerAlt size={20} style={{ color: 'var(--primary-purple)' }} />
              </div>
              <div>
                <h6 className="mb-1 fw-bold">Clinic Address</h6>
                <p className="mb-0 text-muted">{address}</p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} 
                  className="small" style={{ color: '#2A5C5F' }} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View on Map
                </a>
              </div>
            </ListGroup.Item>
            
            <ListGroup.Item className="d-flex align-items-center py-3 border-bottom flex-row-reverse">
              <div className="icon-container ms-3">
                <FaClock size={20} style={{ color: 'var(--primary-purple)' }} />
              </div>
              <div>
                <h6 className="mb-1 fw-bold">Working Hours</h6>
                <p className="mb-0 text-muted">{openingHours}</p>
              </div>
            </ListGroup.Item>
            
            <ListGroup.Item className="d-flex align-items-center py-3 flex-row-reverse">
              <div className="icon-container ms-3">
                <FaMoneyBillWave size={20} style={{ color: 'var(--primary-purple)' }} />
              </div>
              <div>
                <h6 className="mb-1 fw-bold">Consultation Fee</h6>
                <p className="mb-0 text-muted">{fees}</p>
                <small className="text-muted">(Price may vary based on service)</small>
              </div>
            </ListGroup.Item>
          </ListGroup>
          
          <div className="mt-4">
            <h6 className="fw-bold mb-3 d-flex align-items-center justify-content-end">
              <FaProcedures className="ms-2" style={{ color: 'var(--primary-purple)' }} />
              Available Services
            </h6>
            <div className="d-flex flex-wrap gap-2 justify-content-end">
              {services.map((service, index) => (
                <Badge 
                  key={index} 
                  pill 
                  bg="light" 
                  text="primary" 
                  className="px-3 py-2 d-flex align-items-center flex-row-reverse"
                >
                  <FaWifi className="ms-1" size={12} />
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ClinicDetails;
