import React, { useEffect, useState } from 'react';
import DoctorSidebar from '../components/DoctorSidebar';
import '../../../features/doctors/style/style.css';
import { getPaidPatients, getAppointmentRecords } from '../../../services/doctors/AppointmentService';
import { FaFileAlt, FaChevronDown, FaFilePdf, FaFileImage, FaFileWord, FaFileExcel, FaFileMedical, FaUser } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';

const DocumentsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [records, setRecords] = useState([]);
  const [expandedPatient, setExpandedPatient] = useState(null);

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

  const togglePatientExpand = (patientId) => {
    setExpandedPatient(expandedPatient === patientId ? null : patientId);
  };

  const getFileIcon = (url) => {
    if (!url) return <FaFileAlt />;
    
    const extension = url.split('.').pop().toLowerCase();
    switch(extension) {
      case 'pdf':
        return <FaFilePdf className="text-danger" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FaFileImage className="text-primary" />;
      case 'doc':
      case 'docx':
        return <FaFileWord className="text-info" />;
      case 'xls':
      case 'xlsx':
        return <FaFileExcel className="text-success" />;
      default:
        return <FaFileMedical className="text-secondary" />;
    }
  };

  // Group records by patient
  const groupedRecords = records.reduce((acc, record) => {
    const patientId = record.patient?.id || 'unknown';
    if (!acc[patientId]) {
      acc[patientId] = {
        patient: record.patient,
        records: []
      };
    }
    acc[patientId].records.push(record);
    return acc;
  }, {});

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="enhanced-main-card">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-header mb-0">
              <FaFileAlt className="me-2" />Patient Documents
            </h2>
          </div>
          
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
            <div className="patient-documents-container">
              {Object.values(groupedRecords).map((group, index) => (
                <div key={index} className="patient-document-card mb-4">
                  <div 
                    className="patient-header d-flex justify-content-between align-items-center p-3"
                    onClick={() => togglePatientExpand(group.patient?.id || index)}
                  >
                    <div className="d-flex align-items-center">
                      <div className="patient-avatar me-3">
                        {group.patient?.profile_picture ? (
                          <img 
                            src={group.patient.profile_picture} 
                            alt={group.patient.full_name || 'Patient'} 
                            className="rounded-circle"
                            width="40"
                            height="40"
                          />
                        ) : (
                          <div className="avatar-placeholder rounded-circle">
                            <FaUser size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <h5 className="mb-0">{group.patient?.full_name || 'Unknown Patient'}</h5>
                        <small className="text-muted">
                          {group.records.length} document{group.records.length !== 1 ? 's' : ''}
                        </small>
                      </div>
                    </div>
                    <FaChevronDown 
                      className={`chevron-icon ${expandedPatient === (group.patient?.id || index) ? 'rotate-180' : ''}`} 
                    />
                  </div>
                  
                  {expandedPatient === (group.patient?.id || index) && (
                    <div className="patient-documents-content p-3">
                      <div className="table-responsive">
                        <table className="table table-hover documents-table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Document Type</th>
                              <th>Notes</th>
                              <th>File</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.records.filter(r => r.document).map((rec, idx) => (
                              <tr key={idx}>
                                <td>{new Date(rec.created_at).toLocaleDateString()}</td>
                                <td>{rec.document_type || 'Medical Report'}</td>
                                <td className="notes-cell">
                                  <div className="notes-content">
                                    {rec.notes || rec.medical_report || '-'}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    {getFileIcon(rec.document)}
                                    <span className="ms-2">
                                      {rec.document?.split('/').pop() || 'Document'}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <a 
                                    href={rec.document} 
                                    className="btn btn-sm btn-outline-primary"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    download
                                  >
                                    <FiDownload className="me-1" /> Download
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;