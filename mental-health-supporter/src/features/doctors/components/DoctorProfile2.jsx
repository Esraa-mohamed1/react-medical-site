import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import doctorImage from "../../../components/DoctorsListComponent/images/doctor-placeholder.jpg";
import {
  Mail,
  Phone,
  Calendar,
  Stethoscope,
  X,
  Edit3,
  User,
  AlertCircle,
  Clock,
  MessageCircle,
} from "lucide-react";
import "../../../components/DoctorProfile/DoctorProfile.css";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialtyName: "",
    bio: "",
  });

  const navigate = useNavigate();
  
  // MOCK DATA AND DISABLED API CALLS
  useEffect(() => {
    // We are now using mock data, so the API call is disabled.
    const mockDoctorData = {
      id: 'doc1',
      user: {
        name: 'Dr. John Doe',
        email: 'john.doe@example.com',
      },
      phone: '123-456-7890',
      bio: 'Experienced cardiologist with over 10 years in practice. Specializes in heart-related conditions and preventive care.',
      specialty: {
        name: 'Cardiology'
      },
      profile_picture: doctorImage
    };

    const mockAppointments = [
      { id: 1, patientName: 'Alice Smith', appointment_time: '2024-08-15T10:00:00Z', status: 'Scheduled' },
      { id: 2, patientName: 'Bob Johnson', appointment_time: '2024-08-15T11:30:00Z', status: 'Completed' },
    ];
    
    const mockPatients = [
        {id: 'p1', user: {name: 'Alice Smith'}},
        {id: 'p2', user: {name: 'Bob Johnson'}},
        {id: 'p3', user: {name: 'Charlie Brown'}},
    ];

    setDoctor(mockDoctorData);
    setUser(mockDoctorData.user);
    setAppointments(mockAppointments);
    setPatients(mockPatients);
    setLoading(false);

    setFormData({
      name: mockDoctorData.user.name,
      email: mockDoctorData.user.email,
      phone: mockDoctorData.phone,
      specialtyName: mockDoctorData.specialty.name,
      bio: mockDoctorData.bio,
    });
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "N/A";
    return new Date(timeStr).toLocaleTimeString(undefined, {
      hour: '2-digit', minute: '2-digit'
    });
  };
  
  const getPatientName = (patientId, appointment = null) => {
    if (appointment && appointment.patientName) return appointment.patientName;
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.user.name : 'Unknown Patient';
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "scheduled": return "text-primary";
      case "completed": return "text-success";
      case "cancelled": return "text-danger";
      default: return "text-muted";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, you'd make an API call here.
    // For now, we just update the state to show the changes instantly.
    const updatedDoctor = {
        ...doctor,
        user: { ...doctor.user, name: formData.name, email: formData.email },
        phone: formData.phone,
        bio: formData.bio,
        specialty: { name: formData.specialtyName }
    };
    setDoctor(updatedDoctor);
    setEditOpen(false);
  };

  if (loading) {
    return <div className="loading-container"><div>Loading Profile...</div></div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <AlertCircle size={48} className="text-danger" />
        <h2 className="mt-3">Error Loading Profile</h2>
        <p>{error}</p>
        <div className="d-flex gap-2 mt-3">
          <Button variant="outline-secondary" onClick={() => window.location.reload()}>Try Again</Button>
          <Button variant="primary" onClick={() => navigate('/login')}>Login Again</Button>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return <div className="loading-container"><div>No doctor profile found.</div></div>;
  }
  
  return (
    <>
      <div className="doctor-profile-container">
        {/* Profile Header */}
        <header className="profile-header">
          <div className="d-flex align-items-center">
            <img 
              src={doctor.profile_picture || doctorImage} 
              alt={doctor.user.name} 
              className="profile-picture" 
            />
            <div className="profile-info">
              <h1 className="doctor-name">{doctor.user.name}</h1>
              <p className="doctor-specialty">
                <Stethoscope size={16} className="me-2" />
                {doctor.specialty?.name || "N/A"}
              </p>
            </div>
          </div>
          <Button variant="outline-primary" onClick={() => setEditOpen(true)}>
            <Edit3 size={16} className="me-2" />
            Edit Profile
          </Button>
        </header>

        {/* Main Content */}
        <main className="profile-main">
          {/* Left Column */}
          <div className="profile-left">
            {/* Bio */}
            <div className="profile-card">
              <h3>About Me</h3>
              <p>{doctor.bio}</p>
            </div>
            {/* Contact */}
            <div className="profile-card">
              <h3>Contact Information</h3>
              <div className="contact-item">
                <Mail size={18} />
                <span>{doctor.user.email}</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>{doctor.phone}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="profile-right">
            {/* Upcoming Appointments */}
            <div className="profile-card">
              <h3>Upcoming Appointments</h3>
              <ul className="appointment-list">
                {appointments.length > 0 ? appointments.map(app => (
                  <li key={app.id} className="appointment-item">
                    <div className="appointment-details">
                      <User size={16} />
                      <span className="patient-name">{getPatientName(app.patient_id, app)}</span>
                    </div>
                    <div className="appointment-time">
                      <Clock size={16} />
                      <span>{formatDate(app.appointment_time)} at {formatTime(app.appointment_time)}</span>
                    </div>
                    <span className={`appointment-status ${getStatusColor(app.status)}`}>{app.status}</span>
                  </li>
                )) : <p>No upcoming appointments.</p>}
              </ul>
            </div>
            {/* Patient List */}
            <div className="profile-card">
                <h3>My Patients</h3>
                <ul className="patient-list">
                    {patients.length > 0 ? patients.map(p => (
                        <li key={p.id} className="patient-item">
                            <User size={16} />
                            <span>{p.user.name}</span>
                            <Button variant="link" size="sm">View History</Button>
                        </li>
                    )) : <p>No patients found.</p>}
                </ul>
            </div>
          </div>
        </main>
      </div>

      {/* Edit Profile Modal */}
      <Modal show={editOpen} onHide={() => setEditOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Specialty</Form.Label>
              <Form.Control type="text" name="specialtyName" value={formData.specialtyName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows={4} name="bio" value={formData.bio} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DoctorProfile;