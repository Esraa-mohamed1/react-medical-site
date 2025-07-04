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
        <div className="enhanced-main-card">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
              <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center my-5">{error}</div>
          ) : !selectedAppointment || !patient ? (
            <div className="alert alert-info text-center my-5">No paid patients found.</div>
          ) : (
            <>
              {/* Patient Avatar and Info */}
              <div className="enhanced-patient-header">
                <div className="patient-header-left">
                  <img src={patient.profile_image || patient.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(patient.full_name || patient.name || patient.username || 'Patient') + '&background=ede7f6&color=5e35b1&size=128'} alt="Patient" className="patient-photo" />
                  <div className="patient-info-block">
                    <div className="patient-name">{patient.full_name || patient.name || patient.username}</div>
                    <div className="patient-info-row"><FaVenusMars /> {patient.gender} <FaBirthdayCake className="ms-3" /> Age {patient.age || patient.dob}</div>
                    <div className="patient-info-row"><FaEnvelope /> {patient.email}</div>
                    <div className="patient-info-row"><FaPhone /> {patient.phone}</div>
                    {patient.allergies && <div className="patient-info-row"><b>Known Allergies:</b> {patient.allergies}</div>}
                  </div>
                </div>
              </div>
              {/* Past Records */}
              <div className="section-card enhanced-section-card">
                <div className="section-header"><FaFileAlt className="me-2" /> Past Records <FaChevronDown className="chevron-icon" /></div>
                <table className="records-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Notes</th>
                      <th>Document</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((rec) => (
                      <tr key={rec.id}>
                        <td>{rec.created_at ? new Date(rec.created_at).toLocaleDateString() : ''}</td>
                        <td>{rec.type || rec.record_type || '-'}</td>
                        <td>{rec.notes || rec.medical_report || '-'}</td>
                        <td>{rec.document ? <a href={rec.document} className="record-doc-link" target="_blank" rel="noopener noreferrer">View</a> : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Reasons for Consultati */}
              <div className="section-card enhanced-section-card">
                <div className="section-header"><FaNotesMedical className="me-2" /> Reasons for Consultati <FaChevronDown className="chevron-icon" />
                  {!consultationEdit ? (
                    <button className="edit-btn" onClick={() => setConsultationEdit(true)} style={{marginLeft: 'auto'}}>Edit</button>
                  ) : (
                    <button className="save-btn" onClick={() => handleSaveSection('consultation')} style={{marginLeft: 'auto'}} disabled={consultationSaving}>{consultationSaving ? 'Saving...' : 'Save'}</button>
                  )}
                </div>
                {consultationError && <div className="text-danger mb-2">{consultationError}</div>}
                <div className="form-group mb-2">
                  <label>Notes</label>
                  <textarea className="form-control" value={consultationNotes} onChange={e => setConsultationNotes(e.target.value)} disabled={!consultationEdit || consultationSaving} />
                </div>
                <div className="form-group mb-2">
                  <label>Medical Report</label>
                  <textarea className="form-control" value={consultationReport} onChange={e => setConsultationReport(e.target.value)} disabled={!consultationEdit || consultationSaving} />
                </div>
                <div className="form-group mb-2">
                  <label>Document</label>
                  <input type="file" className="form-control" accept=".pdf,.doc,.docx,.txt" disabled={!consultationEdit || consultationSaving} onChange={e => handleFileChange(e, setConsultationDoc, setConsultationDocUrl)} />
                  {consultationDocUrl && <div className="mt-2"><a href={consultationDocUrl} target="_blank" rel="noopener noreferrer">{consultationDoc?.name || 'View Document'}</a></div>}
                </div>
              </div>
              {/* Diagnosis */}
              <div className="section-card enhanced-section-card">
                <div className="section-header"><FaNotesMedical className="me-2" /> Diagnosis <FaChevronDown className="chevron-icon" />
                  {!diagnosisEdit ? (
                    <button className="edit-btn" onClick={() => setDiagnosisEdit(true)} style={{marginLeft: 'auto'}}>Edit</button>
                  ) : (
                    <button className="save-btn" onClick={() => handleSaveSection('diagnosis')} style={{marginLeft: 'auto'}} disabled={diagnosisSaving}>{diagnosisSaving ? 'Saving...' : 'Save'}</button>
                  )}
                </div>
                {diagnosisError && <div className="text-danger mb-2">{diagnosisError}</div>}
                <div className="form-group mb-2">
                  <label>Notes</label>
                  <textarea className="form-control" value={diagnosisNotes} onChange={e => setDiagnosisNotes(e.target.value)} disabled={!diagnosisEdit || diagnosisSaving} />
                </div>
                <div className="form-group mb-2">
                  <label>Medical Report</label>
                  <textarea className="form-control" value={diagnosisReport} onChange={e => setDiagnosisReport(e.target.value)} disabled={!diagnosisEdit || diagnosisSaving} />
                </div>
                <div className="form-group mb-2">
                  <label>Document</label>
                  <input type="file" className="form-control" accept=".pdf,.doc,.docx,.txt" disabled={!diagnosisEdit || diagnosisSaving} onChange={e => handleFileChange(e, setDiagnosisDoc, setDiagnosisDocUrl)} />
                  {diagnosisDocUrl && <div className="mt-2"><a href={diagnosisDocUrl} target="_blank" rel="noopener noreferrer">{diagnosisDoc?.name || 'View Document'}</a></div>}
                </div>
              </div>
              {/* Medication */}
              <div className="section-card enhanced-section-card">
                <div className="section-header"><FaPills className="me-2" /> Medication <FaChevronDown className="chevron-icon" />
                  {!medicationEdit ? (
                    <button className="edit-btn" onClick={() => setMedicationEdit(true)} style={{marginLeft: 'auto'}}>Edit</button>
                  ) : (
                    <button className="save-btn" onClick={() => handleSaveSection('medication')} style={{marginLeft: 'auto'}} disabled={medicationSaving}>{medicationSaving ? 'Saving...' : 'Save'}</button>
                  )}
                </div>
                {medicationError && <div className="text-danger mb-2">{medicationError}</div>}
                <div className="form-group mb-2">
                  <label>Notes</label>
                  <textarea className="form-control" value={medicationNotes} onChange={e => setMedicationNotes(e.target.value)} disabled={!medicationEdit || medicationSaving} />
                </div>
                <div className="form-group mb-2">
                  <label>Medical Report</label>
                  <textarea className="form-control" value={medicationReport} onChange={e => setMedicationReport(e.target.value)} disabled={!medicationEdit || medicationSaving} />
                </div>
                <div className="form-group mb-2">
                  <label>Document</label>
                  <input type="file" className="form-control" accept=".pdf,.doc,.docx,.txt" disabled={!medicationEdit || medicationSaving} onChange={e => handleFileChange(e, setMedicationDoc, setMedicationDocUrl)} />
                  {medicationDocUrl && <div className="mt-2"><a href={medicationDocUrl} target="_blank" rel="noopener noreferrer">{medicationDoc?.name || 'View Document'}</a></div>}
                </div>
              </div>
              {/* Follow Up */}
              <div className="section-card enhanced-section-card">
                <div className="section-header">Follow Up <FaChevronDown className="chevron-icon" /></div>
                <input type="date" className="followup-date-input" />
              </div>
              <div className="review-btn-row">
                <button className="review-btn">Review</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPaidPatients; 