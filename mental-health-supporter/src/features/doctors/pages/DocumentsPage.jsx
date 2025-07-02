import React, { useEffect, useState } from 'react';
import DoctorSidebar from '../components/DoctorSidebar';
import '../../../features/doctors/style/style.css';
import { getPaidPatients, getAppointmentRecords } from '../../../services/doctors/AppointmentService';
import { FaFileAlt, FaChevronDown } from 'react-icons/fa';

const DocumentsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchAllRecords = async () => {
      setLoading(true);
      setError('');
      try {
        // Get all paid appointments for the doctor
        const appointments = await getPaidPatients();
        let allRecords = [];
        for (const appt of appointments) {
          const recs = await getAppointmentRecords(appt.id);
          // Attach patient and appointment info to each record
          allRecords = allRecords.concat(
            recs.map(r => ({
              ...r,
              patient: appt.patient_info,
              appointment_date: appt.appointment_date
            }))
          );
        }
        setRecords(allRecords);
      } catch (err) {
        setError('Failed to fetch documents.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllRecords();
  }, []);

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="enhanced-main-card">
          <div className="section-header mb-4"><FaFileAlt className="me-2" />Documents <FaChevronDown className="chevron-icon" /></div>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
              <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center my-5">{error}</div>
          ) : records.length === 0 ? (
            <div className="alert alert-info text-center my-5">No documents found.</div>
          ) : (
            <div className="section-card enhanced-section-card">
              <div className="table-responsive">
                <table className="records-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Notes</th>
                      <th>Document</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.filter(r => r.document).map((rec) => (
                      <tr key={rec.id}>
                        <td>{rec.patient?.full_name || rec.patient?.username || rec.patient?.email || '-'}</td>
                        <td>{rec.appointment_date ? new Date(rec.appointment_date).toLocaleDateString() : ''}</td>
                        <td>{rec.type || rec.record_type || '-'}</td>
                        <td>{rec.notes || rec.medical_report || '-'}</td>
                        <td>{rec.document ? <a href={rec.document} className="record-doc-link" target="_blank" rel="noopener noreferrer">View</a> : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage; 