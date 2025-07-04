import React, { useEffect, useState } from 'react';
import DoctorSidebar from '../components/DoctorSidebar';
import { getPaidPatients, getAppointmentRecords, createAppointmentRecord } from '../../../services/doctors/AppointmentService';
import { getPatientById } from '../../../services/patients/PatientServices';
import { FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaEdit, FaFileAlt, FaNotesMedical, FaPills, FaChevronDown } from 'react-icons/fa';
import '../../../features/doctors/style/style.css';
import { Link } from 'react-router-dom';

const DoctorPaidPatients = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);

  const [consultationNotes, setConsultationNotes] = useState('');
  const [consultationReport, setConsultationReport] = useState('');
  const [consultationDoc, setConsultationDoc] = useState(null);
  const [consultationDocUrl, setConsultationDocUrl] = useState('');
  const [consultationEdit, setConsultationEdit] = useState(false);

  const [diagnosisNotes, setDiagnosisNotes] = useState('');
  const [diagnosisReport, setDiagnosisReport] = useState('');
  const [diagnosisDoc, setDiagnosisDoc] = useState(null);
  const [diagnosisDocUrl, setDiagnosisDocUrl] = useState('');
  const [diagnosisEdit, setDiagnosisEdit] = useState(false);

  const [medicationNotes, setMedicationNotes] = useState('');
  const [medicationReport, setMedicationReport] = useState('');
  const [medicationDoc, setMedicationDoc] = useState(null);
  const [medicationDocUrl, setMedicationDocUrl] = useState('');
  const [medicationEdit, setMedicationEdit] = useState(false);

  // Section save states
  const [consultationSaving, setConsultationSaving] = useState(false);
  const [consultationError, setConsultationError] = useState('');
  const [diagnosisSaving, setDiagnosisSaving] = useState(false);
  const [diagnosisError, setDiagnosisError] = useState('');
  const [medicationSaving, setMedicationSaving] = useState(false);
  const [medicationError, setMedicationError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const appts = await getPaidPatients();
        setAppointments(appts);
        if (appts.length > 0) {
          setSelectedAppointment(appts[0]);
          // Fetch patient details
          const patientId = appts[0].patient_info?.id || appts[0].patient_info?.patient_id;
          if (patientId) {
            const patientData = await getPatientById(patientId);
            setPatient(patientData);
          } else {
            setPatient(appts[0].patient_info);
          }
          // Fetch appointment records
          const recs = await getAppointmentRecords(appts[0].id);
          setRecords(recs);
        }
      } catch (err) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Enhance: allow selecting other appointments/patients if needed

  // Handlers for file upload (simulate upload for now)
  const handleFileChange = (e, setDoc, setDocUrl) => {
    const file = e.target.files[0];
    setDoc(file);
    if (file) {
      setDocUrl(URL.createObjectURL(file));
    } else {
      setDocUrl('');
    }
  };

  // Save handlers
  const handleSaveSection = async (type) => {
    let notes, report, doc, setEdit, setSaving, setError, setDoc, setDocUrl;
    if (type === 'consultation') {
      notes = consultationNotes;
      report = consultationReport;
      doc = consultationDoc;
      setEdit = setConsultationEdit;
      setSaving = setConsultationSaving;
      setError = setConsultationError;
      setDoc = setConsultationDoc;
      setDocUrl = setConsultationDocUrl;
    } else if (type === 'diagnosis') {
      notes = diagnosisNotes;
      report = diagnosisReport;
      doc = diagnosisDoc;
      setEdit = setDiagnosisEdit;
      setSaving = setDiagnosisSaving;
      setError = setDiagnosisError;
      setDoc = setDiagnosisDoc;
      setDocUrl = setDiagnosisDocUrl;
    } else if (type === 'medication') {
      notes = medicationNotes;
      report = medicationReport;
      doc = medicationDoc;
      setEdit = setMedicationEdit;
      setSaving = setMedicationSaving;
      setError = setMedicationError;
      setDoc = setMedicationDoc;
      setDocUrl = setMedicationDocUrl;
    }
    setSaving(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('record_type', type);
      if (notes) formData.append('notes', notes);
      if (report) formData.append('medical_report', report);
      if (doc) formData.append('document', doc);
      await createAppointmentRecord(selectedAppointment.id, formData);
      setEdit(false);
      setDoc(null);
      setDocUrl('');
      // Refresh records
      const recs = await getAppointmentRecords(selectedAppointment.id);
      setRecords(recs);
    } catch (err) {
      setError('Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="enhanced-main-card" style={{ background: '#f7fafc', borderRadius: 16, boxShadow: '0 2px 8px rgba(44, 62, 80, 0.07)', padding: '2rem' }}>
          <div className="section-header mb-4" style={{ color: '#2a5c5f', fontWeight: 700, fontSize: '1.5rem' }}>My Patients</div>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
              <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center my-5">{error}</div>
          ) : appointments.length === 0 ? (
            <div className="alert alert-info text-center my-5">No patients found.</div>
          ) : (
            <div className="patients-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {appointments.map((appt) => {
                const patient = appt.patient_info;
                return (
                  <div key={patient.patient_id || patient.id || patient.username} className="patient-card" style={{ background: '#e0f7fa', borderRadius: 12, boxShadow: '0 2px 8px rgba(44, 62, 80, 0.07)', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={patient.profile_image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(patient.full_name || patient.username || 'Patient') + '&background=ede7f6&color=5e35b1&size=128'} alt="Patient" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '3px solid #b2dfdb' }} />
                    <div className="fw-bold fs-5 mb-1" style={{ color: '#2193b0' }}>{patient.full_name || patient.username}</div>
                    <div className="text-muted mb-2">{patient.email}</div>
                    <button
                      className="review-btn"
                      onClick={() => window.location.href = `/doctor/patient-details/${appt.id}`}
                    >
                      View Details
                    </button>
                  </div>
                );
              })}
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPaidPatients; 