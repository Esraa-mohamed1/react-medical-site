import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import "../../../styles/global.css";
import { FiUser, FiCalendar, FiClock, FiChevronLeft, FiCheckCircle, FiEdit2, FiFileText, FiDollarSign } from 'react-icons/fi';
import DoctorSidebar from '../components/DoctorSidebar';
import '../../../features/doctors/style/style.css';

export default function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { value: 'scheduled', label: 'Scheduled', color: 'warning' },
    { value: 'completed', label: 'Completed', color: 'success' },
    { value: 'cancelled', label: 'Cancelled', color: 'danger' },
    { value: 'confirmed', label: 'Confirmed', color: 'primary' },
    { value: 'no-show', label: 'No Show', color: 'secondary' }
  ];

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        setIsLoading(true);
        const userData = JSON.parse(localStorage.getItem("loggedUser"));
        const token = localStorage.getItem("access");
        
        if (!userData || userData.role !== 'doctor' || !token) {
          toast.error("You don't have permission to view this appointment");
          navigate('/login');
          return;
        }

        const response = await axios.get(
          `http://127.0.0.1:8000/api/medical/appointments/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        
        const data = response.data;
        setAppointment(data);
        setStatus(data.status || "scheduled");
        setNotes(data.notes || "");
      } catch (error) {
        console.error("Error fetching appointment details:", error);
        toast.error(error.response?.data?.detail || "Failed to load appointment details");
        navigate('/doctor/appointments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [id, navigate]);

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      const token = localStorage.getItem("access");
      
      await axios.patch(
        `http://127.0.0.1:8000/api/medical/appointments/${id}/update/`,
        { 
          status: status,
          notes: notes 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success("Appointment updated successfully!");
      // Refresh data
      const response = await axios.get(
        `http://127.0.0.1:8000/api/medical/appointments/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setAppointment(response.data);
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error(error.response?.data?.detail || "Failed to update appointment");
    } finally {
      setIsUpdating(false);
    }
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined) return 'Not set';
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not scheduled';
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      startTime: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      endTime: new Date(date.getTime() + (appointment?.duration || 30) * 60000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const getStatusBadge = (status) => {
    const statusText = status || 'scheduled';
    let badgeClass = '';
    switch(statusText.toLowerCase()) {
      case 'scheduled': badgeClass = 'bg-warning text-dark'; break;
      case 'completed': badgeClass = 'bg-success'; break;
      case 'cancelled': badgeClass = 'bg-danger'; break;
      case 'confirmed': badgeClass = 'bg-primary'; break;
      case 'no-show': badgeClass = 'bg-secondary'; break;
      default: badgeClass = 'bg-info text-dark';
    }
    return (
      <span className={`badge rounded-pill px-3 py-2 ${badgeClass}`}>{statusText.charAt(0).toUpperCase() + statusText.slice(1)}</span>
    );
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const statusText = paymentStatus || 'pending';
    let badgeClass = '';
    switch(statusText.toLowerCase()) {
      case 'paid': badgeClass = 'bg-success'; break;
      case 'pending': badgeClass = 'bg-warning text-dark'; break;
      case 'failed': badgeClass = 'bg-danger'; break;
      default: badgeClass = 'bg-secondary';
    }
    return (
      <span className={`badge rounded-pill px-3 py-2 ${badgeClass}`}>{statusText.charAt(0).toUpperCase() + statusText.slice(1)}</span>
    );
  };

  const getPatientDisplay = (patient) => {
    if (!patient) return { name: 'Walk-in Patient', initials: 'W' };
    const name = [patient.first_name, patient.last_name].filter(Boolean).join(' ') || patient.username;
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    return { name, initials };
  };

  if (isLoading) return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="enhanced-main-card d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (!appointment) return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="enhanced-main-card text-center p-5">
          <h3 className="fw-bold text-dark mb-3">Appointment Not Found</h3>
          <p className="text-muted">The requested appointment could not be loaded.</p>
          <button 
            className="btn btn-primary mt-3" 
            onClick={() => navigate('/doctor/appointments')}
          >
            <FiChevronLeft className="me-2" />Back to Appointments
          </button>
        </div>
      </div>
    </div>
  );

  const { date: displayDate, time: displayTime, startTime, endTime } = formatDateTime(appointment.appointment_date);
  const { name: patientName, initials: patientInitials } = getPatientDisplay(appointment.patient_info);

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="enhanced-main-card" style={{ background: '#f7fafc', borderRadius: 16, boxShadow: '0 2px 8px rgba(44, 62, 80, 0.07)', padding: '2rem' }}>
          <div className="section-header mb-4" style={{ color: '#2a5c5f', fontWeight: 700, fontSize: '1.5rem' }}>Appointment Details</div>
          <div className="d-flex flex-column flex-md-row align-items-center gap-3 mb-4">
            {getStatusBadge(appointment.status)}
            <span className="text-muted d-flex align-items-center gap-2">
              <FiCalendar className="text-primary" />
              {displayDate} <FiClock className="ms-2 text-primary" /> {startTime} - {endTime}
            </span>
          </div>
          <div className="section-card enhanced-section-card mb-4" style={{ background: '#e0f7fa', borderRadius: 12 }}>
            <div className="section-header mb-3" style={{ color: '#2193b0', fontWeight: 600 }}>Patient Information</div>
            <div className="d-flex flex-column flex-md-row align-items-center gap-4">
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: 64, height: 64, fontSize: 28}}>
                {patientInitials}
              </div>
              <div>
                <div className="fw-bold fs-5 mb-1">{patientName}</div>
                <div className="text-muted mb-1"><FiUser className="me-2" />{appointment.patient_info?.email || 'No email provided'}</div>
              </div>
            </div>
          </div>
          <div className="section-card enhanced-section-card mb-4" style={{ background: '#e0f7fa', borderRadius: 12 }}>
            <div className="section-header mb-3" style={{ color: '#2193b0', fontWeight: 600 }}>Appointment Information</div>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="mb-2"><span className="fw-semibold">Date:</span> {displayDate}</div>
                <div className="mb-2"><span className="fw-semibold">Time:</span> {displayTime}</div>
                <div className="mb-2"><span className="fw-semibold">Status:</span> {getStatusBadge(appointment.status)}</div>
                <div className="mb-2"><span className="fw-semibold">Payment Status:</span> {getPaymentStatusBadge(appointment.payment_status)}</div>
                <div className="mb-2"><span className="fw-semibold">Appointment ID:</span> #{appointment.id}</div>
                <div className="mb-2"><span className="fw-semibold">Title:</span> {appointment.title}</div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Doctor Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-control"
                  placeholder="Add your notes here..."
                  rows={4}
                  disabled={isUpdating}
                  title="Add notes for this appointment"
                  style={{ borderRadius: 8, border: '1px solid #b2dfdb', background: '#f7fafc' }}
                />
                <label className="form-label fw-semibold mt-3">Update Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-select"
                  disabled={isUpdating || appointment.payment_status === 'paid'}
                  title="Change appointment status"
                  style={{ borderRadius: 8, border: '1px solid #b2dfdb', background: '#f7fafc' }}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="d-flex gap-3 mt-4 justify-content-end">
              <button 
                onClick={handleUpdate} 
                className="review-btn px-4"
                disabled={isUpdating || appointment.payment_status === 'paid'}
                title="Save changes"
                style={{ background: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)', color: '#fff', border: 'none', borderRadius: '20px', fontWeight: 600 }}
              >
                {isUpdating ? 'Updating...' : 'Update Appointment'}
              </button>
              <button 
                onClick={() => navigate('/doctor/appointments')} 
                className="edit-btn px-4"
                disabled={isUpdating}
                title="Back to appointments"
                style={{ borderRadius: 8, border: '1px solid #b2dfdb', background: '#e0f7fa', color: '#2193b0' }}
              >
                <FiChevronLeft className="me-2" />Back to Appointments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}