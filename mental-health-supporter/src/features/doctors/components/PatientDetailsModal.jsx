import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, ProgressBar, Card, Row, Col, Spinner } from 'react-bootstrap';
import { getAppointmentRecords, createAppointmentRecord, updateAppointmentRecord, deleteAppointmentRecord } from '../../../services/doctors/AppointmentService';

const allowedTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

const PatientDetailsModal = ({ show, onHide, appointment, onUpdate }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [form, setForm] = useState({ document: null, notes: '', medical_report: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ document: null, notes: '', medical_report: '' });
  const [editUploading, setEditUploading] = useState(false);
  const [editProgress, setEditProgress] = useState(0);
  const [editError, setEditError] = useState(null);
  const [editSuccess, setEditSuccess] = useState(null);

  useEffect(() => {
    if (show && appointment) {
      fetchRecords();
    }
    // eslint-disable-next-line
  }, [show, appointment]);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAppointmentRecords(appointment.id);
      setRecords(data);
    } catch (err) {
      setError('Failed to fetch records.');
    } finally {
      setLoading(false);
    }
  };

  if (!show || !appointment) return null;

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleCreateRecord = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    setUploadSuccess(null);
    const { document, notes, medical_report } = form;
    if (document && !allowedTypes.includes(document.type)) {
      setUploadError('Only PDF, Word (.doc, .docx), or text files are allowed.');
      setUploading(false);
      return;
    }
    const formData = new FormData();
    if (document) formData.append('document', document);
    if (notes) formData.append('notes', notes);
    if (medical_report) formData.append('medical_report', medical_report);
    try {
      await createAppointmentRecord(appointment.id, formData, (progressEvent) => {
        if (progressEvent && progressEvent.total) {
          setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      });
      setUploadSuccess('Record created successfully!');
      setForm({ document: null, notes: '', medical_report: '' });
      fetchRecords();
      if (onUpdate) onUpdate();
    } catch (err) {
      setUploadError('Failed to create record.');
    } finally {
      setUploading(false);
    }
  };

  const handleEditClick = (record) => {
    setEditId(record.id);
    setEditForm({ document: null, notes: record.notes || '', medical_report: record.medical_report || '' });
    setEditError(null);
    setEditSuccess(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value, files } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleUpdateRecord = async (e) => {
    e.preventDefault();
    setEditUploading(true);
    setEditProgress(0);
    setEditError(null);
    setEditSuccess(null);
    const { document, notes, medical_report } = editForm;
    if (document && !allowedTypes.includes(document.type)) {
      setEditError('Only PDF, Word (.doc, .docx), or text files are allowed.');
      setEditUploading(false);
      return;
    }
    const formData = new FormData();
    if (document) formData.append('document', document);
    if (notes) formData.append('notes', notes);
    if (medical_report) formData.append('medical_report', medical_report);
    try {
      await updateAppointmentRecord(editId, formData, (progressEvent) => {
        if (progressEvent && progressEvent.total) {
          setEditProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      });
      setEditSuccess('Record updated successfully!');
      setEditId(null);
      fetchRecords();
      if (onUpdate) onUpdate();
    } catch (err) {
      setEditError('Failed to update record.');
    } finally {
      setEditUploading(false);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await deleteAppointmentRecord(recordId);
      fetchRecords();
      if (onUpdate) onUpdate();
    } catch (err) {
      alert('Failed to delete record.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton style={{ background: '#e0f7fa' }}>
        <Modal.Title>Appointment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#f3e5f5' }}>
        <h5 className="mb-3">Patient: {appointment.patient_info?.first_name} {appointment.patient_info?.last_name}</h5>
        <div className="mb-2"><strong>Email:</strong> {appointment.patient_info?.email}</div>
        <div className="mb-2"><strong>Date:</strong> {new Date(appointment.appointment_date).toLocaleDateString()}</div>
        <div className="mb-2"><strong>Time:</strong> {new Date(appointment.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        <div className="mb-2"><strong>Contact:</strong> {appointment.patient_info?.phone || 'N/A'}</div>
        <hr />
        <Form onSubmit={handleCreateRecord} className="mb-4 p-3 rounded" style={{ background: '#e8eaf6' }}>
          <h6 className="mb-3">Add New Record</h6>
          <Row>
            <Col md={4} className="mb-2">
              <Form.Control type="file" name="document" accept=".pdf,.doc,.docx,.txt" onChange={handleFormChange} disabled={uploading} />
            </Col>
            <Col md={4} className="mb-2">
              <Form.Control as="textarea" name="notes" placeholder="Notes" value={form.notes} onChange={handleFormChange} rows={1} />
            </Col>
            <Col md={4} className="mb-2">
              <Form.Control as="textarea" name="medical_report" placeholder="Medical Report" value={form.medical_report} onChange={handleFormChange} rows={1} />
            </Col>
          </Row>
          <Button type="submit" variant="success" className="mt-2" disabled={uploading}>Add Record</Button>
          {uploading && <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} className="mt-2" />}
          {uploadError && <Alert variant="danger" className="mt-2">{uploadError}</Alert>}
          {uploadSuccess && <Alert variant="success" className="mt-2">{uploadSuccess}</Alert>}
        </Form>
        <h6 className="mb-3">Records History</h6>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '10vh' }}>
            <Spinner animation="border" variant="info" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : records.length === 0 ? (
          <Alert variant="info">No records found for this appointment.</Alert>
        ) : (
          <div className="records-list">
            {records.map((rec) => (
              <Card key={rec.id} className="mb-3 shadow-sm rounded-4 border-0" style={{ background: '#e0f7fa' }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <span className="fw-bold">{rec.uploader_name || 'Doctor'}</span>
                      <span className="text-muted ms-2" style={{ fontSize: 12 }}>{new Date(rec.created_at).toLocaleString()}</span>
                    </div>
                    <div>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditClick(rec)}>Edit</Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDeleteRecord(rec.id)}>Delete</Button>
                    </div>
                  </div>
                  {editId === rec.id ? (
                    <Form onSubmit={handleUpdateRecord} className="mb-2">
                      <Row>
                        <Col md={4} className="mb-2">
                          <Form.Control type="file" name="document" accept=".pdf,.doc,.docx,.txt" onChange={handleEditFormChange} disabled={editUploading} />
                        </Col>
                        <Col md={4} className="mb-2">
                          <Form.Control as="textarea" name="notes" placeholder="Notes" value={editForm.notes} onChange={handleEditFormChange} rows={1} />
                        </Col>
                        <Col md={4} className="mb-2">
                          <Form.Control as="textarea" name="medical_report" placeholder="Medical Report" value={editForm.medical_report} onChange={handleEditFormChange} rows={1} />
                        </Col>
                      </Row>
                      <Button type="submit" variant="success" className="me-2" disabled={editUploading}>Save</Button>
                      <Button variant="secondary" onClick={() => setEditId(null)} disabled={editUploading}>Cancel</Button>
                      {editUploading && <ProgressBar now={editProgress} label={`${editProgress}%`} className="mt-2" />}
                      {editError && <Alert variant="danger" className="mt-2">{editError}</Alert>}
                      {editSuccess && <Alert variant="success" className="mt-2">{editSuccess}</Alert>}
                    </Form>
                  ) : (
                    <div>
                      {rec.document && (
                        <div className="mb-2">
                          <a href={rec.document} target="_blank" rel="noopener noreferrer" className="fw-bold text-primary">Download/View Document</a>
                        </div>
                      )}
                      <div className="mb-1"><strong>Notes:</strong> {rec.notes || <span className="text-muted">No notes</span>}</div>
                      <div><strong>Medical Report:</strong> {rec.medical_report || <span className="text-muted">No report</span>}</div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer style={{ background: '#e0f7fa' }}>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PatientDetailsModal; 