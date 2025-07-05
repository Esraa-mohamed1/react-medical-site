import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ContactInfo = () => {
  const { t } = useTranslation();
  const { doctor_id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchDoctor() {
      setLoading(true);
      setError(null);
      let doctorId = doctor_id;
      if (!doctorId) {
        setDoctor({});
        setLoading(false);
        setError('No doctor ID provided in URL.');
        return;
      }
      try {
        const token = localStorage.getItem('access');
        const res = await fetch(`https://pearla.pythonanywhere.com/api/users/doctors/${doctorId}/`, {
          headers: token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch doctor');
        const data = await res.json();
        if (!cancelled) setDoctor(data);
      } catch (e) {
        if (!cancelled) setDoctor({});
        setError('Failed to fetch doctor data.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchDoctor();
    return () => { cancelled = true; };
  }, [doctor_id]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-0" style={{
          borderRadius: '12px',
          background: 'hsl(240, 6%, 97%)',
          boxShadow: '0 4px 20px rgba(109, 90, 207, 0.08)'
        }}>
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="m-0" style={{
                color: '#4D3ACF',
                fontWeight: '600',
                fontSize: '1.25rem'
              }}>
                {t('contactInfo.title')}
              </h4>
              <div style={{
                width: '40px',
                height: '4px',
                background: 'linear-gradient(135deg, #6D5ACF 0%, #4D3ACF 100%)',
                borderRadius: '2px'
              }}></div>
            </div>
            <p className="text-muted mb-0">Loading doctor information...</p>
          </Card.Body>
        </Card>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-0" style={{
          borderRadius: '12px',
          background: 'hsl(240, 6%, 97%)',
          boxShadow: '0 4px 20px rgba(109, 90, 207, 0.08)'
        }}>
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="m-0" style={{
                color: '#4D3ACF',
                fontWeight: '600',
                fontSize: '1.25rem'
              }}>
                {t('contactInfo.title')}
              </h4>
              <div style={{
                width: '40px',
                height: '4px',
                background: 'linear-gradient(135deg, #6D5ACF 0%, #4D3ACF 100%)',
                borderRadius: '2px'
              }}></div>
            </div>
            <p className="text-danger mb-0">{error}</p>
          </Card.Body>
        </Card>
      </motion.div>
    );
  }

  if (!doctor || Object.keys(doctor).length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-0" style={{
          borderRadius: '12px',
          background: 'hsl(240, 6%, 97%)',
          boxShadow: '0 4px 20px rgba(109, 90, 207, 0.08)'
        }}>
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="m-0" style={{
                color: '#4D3ACF',
                fontWeight: '600',
                fontSize: '1.25rem'
              }}>
                {t('contactInfo.title')}
              </h4>
              <div style={{
                width: '40px',
                height: '4px',
                background: 'linear-gradient(135deg, #6D5ACF 0%, #4D3ACF 100%)',
                borderRadius: '2px'
              }}></div>
            </div>
            <p className="text-muted mb-0">No doctor information available.</p>
          </Card.Body>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0" style={{
        borderRadius: '12px',
        background: 'hsl(240, 6%, 97%)',
        boxShadow: '0 4px 20px rgba(109, 90, 207, 0.08)'
      }}>
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="m-0" style={{
              color: '#4D3ACF',
              fontWeight: '600',
              fontSize: '1.25rem'
            }}>
              {t('contactInfo.title')}
            </h4>
            <div style={{
              width: '40px',
              height: '4px',
              background: 'linear-gradient(135deg, #6D5ACF 0%, #4D3ACF 100%)',
              borderRadius: '2px'
            }}></div>
          </div>

          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex align-items-center py-3 px-0 border-bottom" style={{
              borderColor: 'rgba(109, 90, 207, 0.1)'
            }}>
              <div className="me-3" style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'rgba(109, 90, 207, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FaPhone size={18} style={{ color: '#6D5ACF' }} />
              </div>
              <div>
                <h6 className="mb-1" style={{ color: '#555', fontSize: '0.95rem', fontWeight: '600' }}>
                  Phone Number
                </h6>
                <p className="mb-0" style={{ color: '#4D3ACF', fontWeight: '500' }}>
                  {doctor.phone || '-'}
                </p>
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="d-flex align-items-center py-3 px-0 border-bottom" style={{
              borderColor: 'rgba(109, 90, 207, 0.1)'
            }}>
              <div className="me-3" style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'rgba(109, 90, 207, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FaEnvelope size={18} style={{ color: '#6D5ACF' }} />
              </div>
              <div>
                <h6 className="mb-1" style={{ color: '#555', fontSize: '0.95rem', fontWeight: '600' }}>
                  Email Address
                </h6>
                <p className="mb-0" style={{ color: '#4D3ACF', fontWeight: '500', wordBreak: 'break-all' }}>
                  {doctor.email || '-'}
                </p>
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="d-flex align-items-center py-3 px-0" style={{
              borderColor: 'rgba(109, 90, 207, 0.1)'
            }}>
              <div className="me-3" style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'rgba(109, 90, 207, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FaMapMarkerAlt size={18} style={{ color: '#6D5ACF' }} />
              </div>
              <div>
                <h6 className="mb-1" style={{ color: '#555', fontSize: '0.95rem', fontWeight: '600' }}>
                  Clinic Address
                </h6>
                <p className="mb-0" style={{ color: '#4D3ACF', fontWeight: '500', wordBreak: 'break-all' }}>
                  {doctor.clinic_address || '-'}
                </p>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ContactInfo;