import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaMoneyBillWave, FaProcedures, FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ClinicDetails = ({ clinic }) => {
  const { t } = useTranslation();

  const address = `${clinic?.clinic_address}, ${clinic.city}` || '';
  const fees = clinic?.fees || '';
  const services = Array.isArray(clinic?.services)
    ? clinic.services
    : clinic?.services
    ? String(clinic.services).split(',')
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0" style={{
        borderRadius: '12px',
        background: 'hsl(240, 6%, 97%)',
        boxShadow: '0 4px 20px rgba(109, 90, 207, 0.08)',
        overflow: 'hidden'
      }}>
        <Card.Body className="p-4">
          <div className="d-flex align-items-center mb-4">
            <FaProcedures className="me-2" size={20} style={{ color: '#6D5ACF' }} />
            <h4 className="m-0" style={{
              color: '#4D3ACF',
              fontWeight: '600',
              fontSize: '1.25rem'
            }}>
              Clinic Information
            </h4>
          </div>

          {/* Address Section */}
          <div className="mb-4">
            <div className="d-flex align-items-start">
              <FaMapMarkerAlt className="me-3 mt-1" size={18} style={{ color: '#6D5ACF', minWidth: '20px' }} />
              <div style={{ flex: 1 }}>
                <div className="d-flex align-items-center">
                  <h6 className="mb-1" style={{ 
                    color: '#555',
                    fontSize: '0.95rem',
                    fontWeight: '600'
                  }}>
                    Clinic Address
                  </h6>
                </div>
                <p className="mb-1" style={{ 
                  color: '#4D3ACF',
                  fontWeight: '500'
                }}>
                  {address || 'Not specified'}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  style={{
                    color: '#6D5ACF',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View on Map</span>
                  <FaExternalLinkAlt size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Consultation Fee */}
          <div className="mb-4">
            <div className="d-flex align-items-start">
              <FaMoneyBillWave className="me-3 mt-1" size={18} style={{ color: '#6D5ACF', minWidth: '20px' }} />
              <div style={{ flex: 1 }}>
                <div className="d-flex align-items-center">
                  <h6 className="mb-1" style={{ 
                    color: '#555',
                    fontSize: '0.95rem',
                    fontWeight: '600'
                  }}>
                    Consultation Fee
                  </h6>
                </div>
                <p className="mb-1" style={{ 
                  color: '#4D3ACF',
                  fontWeight: '500',
                  fontSize: '1.1rem'
                }}>
                  {fees || 'Not specified'}
                </p>
                <small style={{ 
                  color: '#888',
                  fontSize: '0.8rem'
                }}>
                  (Price may vary based on service)
                </small>
              </div>
            </div>
          </div>

          {/* Available Services */}
          <div>
            <div className="d-flex align-items-center mb-3">
              <FaProcedures className="me-3" size={18} style={{ color: '#6D5ACF' }} />
              <h6 className="fw-bold m-0" style={{ 
                color: '#555',
                fontSize: '0.95rem'
              }}>
                Available Services
              </h6>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {services.length > 0 ? (
                services.map((service, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      pill
                      className="px-3 py-1"
                      style={{
                        background: 'rgba(109, 90, 207, 0.08)',
                        color: '#4D3ACF',
                        fontWeight: '500',
                        fontSize: '0.85rem',
                        border: '1px solid rgba(109, 90, 207, 0.15)'
                      }}
                    >
                      {service.trim()}
                    </Badge>
                  </motion.div>
                ))
              ) : (
                <p className="text-muted small mb-0">No services listed</p>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ClinicDetails;