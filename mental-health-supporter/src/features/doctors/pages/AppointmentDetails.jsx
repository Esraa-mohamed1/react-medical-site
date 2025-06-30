import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import "../../../styles/global.css";
import CustomNavbar from '../../../components/Navbar';
import { FiUser, FiCalendar, FiClock, FiChevronLeft, FiCheckCircle, FiEdit2, FiFileText } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';

export default function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const statusSteps = [
    { label: 'Scheduled', icon: <FiCalendar />, value: 'scheduled' },
    { label: 'Completed', icon: <FiCheckCircle />, value: 'completed' },
    { label: 'Cancelled', icon: <FiFileText />, value: 'cancelled' },
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
          `http://127.0.0.1:8000/api/medical/appointments/doctor/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { id },
          }
        );
        const data = Array.isArray(response.data) ? response.data : (response.data.results || []);
        let found = Array.isArray(data) ? data.find(a => String(a.id) === String(id)) : null;
        if (!found) {
          toast.error('Appointment not found for this doctor.');
          navigate('/doctor/appointments');
          return;
        }
        setAppointment(found);
        setStatus(found.status || "scheduled");
        setNotes(found.notes || "");
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
      const userData = JSON.parse(localStorage.getItem("loggedUser"));
      const token = localStorage.getItem("access");
      
      if (!userData || userData.role !== 'doctor' || !token) {
        toast.error("You don't have permission to update this appointment");
        navigate('/login');
        return;
      }
      // Use the doctor-specific update endpoint
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

      toast.success("Appointment status updated successfully!");
      // Refresh appointment data from doctor endpoint
      const response = await axios.get(
        `http://127.0.0.1:8000/api/medical/appointments/doctor/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { id },
        }
      );
      const data = Array.isArray(response.data) ? response.data : (response.data.results || []);
      const found = Array.isArray(data) ? data.find(a => String(a.id) === String(id)) : null;
      setAppointment(found || data || null);
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error(error.response?.data?.detail || "Failed to update appointment status");
    } finally {
      setIsUpdating(false);
    }
  };

  // Helper for avatar/initials
  const getInitials = (username) => {
    if (!username) return 'U';
    return username.slice(0, 2).toUpperCase();
  };

  // Map fields directly from API response
  const getDisplayDate = (appointment) => {
    if (!appointment?.appointment_date) return 'No date';
    const date = new Date(appointment.appointment_date);
    return date.toLocaleDateString();
  };
  const getDisplayTime = (appointment) => {
    if (!appointment?.appointment_date) return 'No time';
    const date = new Date(appointment.appointment_date);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const getDisplayPatient = (appointment) => {
    if (!appointment?.patient_info) return 'Walk-in';
    const { first_name, last_name, username } = appointment.patient_info;
    if (first_name || last_name) return `${first_name} ${last_name}`.trim();
    return username;
  };
  const getDisplayEmail = (appointment) => appointment.patient_info?.email || 'Not available';
  const getDisplayNotes = (appointment) => appointment.notes || '';

  if (isLoading) return (
    <div className="min-vh-100 bg-light d-flex justify-content-center align-items-center">
      <div className="spinner-border text-success" style={{width: '3rem', height: '3rem'}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  if (!appointment) return (
    <div className="min-vh-100 bg-light d-flex justify-content-center align-items-center">
      <div className="card shadow-sm p-5 text-center">
        <h3 className="fw-bold text-dark mb-3">Unable to load appointment details</h3>
        <p className="text-muted">Please try again later.</p>
        <button className="btn btn-outline-success mt-3" onClick={() => navigate('/doctor/appointments')}>
          <FiChevronLeft className="me-2" />Back to Appointments
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-vh-100 bg-light">
      <CustomNavbar />
      <div className="container py-5">
        {/* Summary Section */}
        <div className="row mb-4">
          <div className="col-lg-8 mx-auto text-center">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 mb-2">
              <span className={`badge rounded-pill px-3 py-2 fs-6 ${
                appointment.status === 'scheduled' ? 'bg-warning text-dark' :
                appointment.status === 'completed' ? 'bg-success' :
                appointment.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
              }`} title="Current Status">
                {appointment.status || 'Scheduled'}
              </span>
              <span className="text-muted d-flex align-items-center gap-2">
                <FiCalendar className="text-success" />
                {getDisplayDate(appointment)} <FiClock className="ms-2 text-success" /> {getDisplayTime(appointment)}
              </span>
            </div>
            <h1 className="fw-bold text-dark mb-1">Appointment Details</h1>
            <p className="text-muted mb-0">Review and update appointment information</p>
          </div>
        </div>
        {/* Status Stepper */}
        <div className="row mb-4">
          <div className="col-lg-8 mx-auto">
            <div className="d-flex justify-content-center align-items-center gap-4">
              {statusSteps.map((step, idx) => (
                <div key={step.value} className="d-flex flex-column align-items-center">
                  <div className={`rounded-circle d-flex align-items-center justify-content-center mb-1 ${
                    appointment.status === step.value ? 'bg-success text-white' : 'bg-light text-secondary border'
                  }`} style={{ width: 40, height: 40, fontSize: 20 }} title={step.label}>
                    {step.icon}
                  </div>
                  <span className={`small ${appointment.status === step.value ? 'text-success fw-bold' : 'text-muted'}`}>{step.label}</span>
                  {idx < statusSteps.length - 1 && (
                    <div style={{ width: 40, height: 2, background: '#e0e0e0', margin: '0 0 0 20px' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Info Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm border-0 rounded-3 position-relative hover-shadow transition">
              <div className="card-header bg-white border-bottom d-flex align-items-center gap-3">
                <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style={{width: 48, height: 48, fontSize: 22}}>
                  {appointment.patient_info ? getInitials(appointment.patient_info.username) : 'U'}
                </div>
                <div>
                  <h5 className="fw-bold text-dark mb-0"><FiUser className="me-2 text-success" />Patient</h5>
                  <span className="text-muted small">Patient Information</span>
                </div>
              </div>
              <div className="card-body">
                {appointment.patient_info ? (
                  <>
                    <p className="mb-2"><span className="fw-semibold">Username:</span> {appointment.patient_info.username}</p>
                    <p className="mb-2"><span className="fw-semibold">Email:</span> {getDisplayEmail(appointment)}</p>
                  </>
                ) : (
                  <div className="text-muted">
                    <p className="mb-1">Walk-in Appointment</p>
                    <p className="mb-0">No patient information available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 shadow-sm border-0 rounded-3 position-relative hover-shadow transition">
              <div className="card-header bg-white border-bottom d-flex align-items-center gap-3">
                <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style={{width: 48, height: 48, fontSize: 22}}>
                  <FiCalendar />
                </div>
                <div>
                  <h5 className="fw-bold text-dark mb-0">Appointment</h5>
                  <span className="text-muted small">Appointment Information</span>
                </div>
              </div>
              <div className="card-body">
                <p className="mb-2"><span className="fw-semibold">Date:</span> {getDisplayDate(appointment)}</p>
                <p className="mb-2"><span className="fw-semibold">Time:</span> {getDisplayTime(appointment)}</p>
                <p className="mb-2"><span className="fw-semibold">Status:</span> <span className={`badge rounded-pill px-3 py-2 ${
                  appointment.status === 'scheduled' ? 'bg-warning text-dark' :
                  appointment.status === 'completed' ? 'bg-success' :
                  appointment.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
                }`} title="Current Status">
                  {appointment.status || 'Scheduled'}
                </span></p>
                <p className="mb-0"><span className="fw-semibold">Appointment ID:</span> #{appointment.id}</p>
                <p className="mb-0"><span className="fw-semibold">Title:</span> {appointment.title}</p>
                <p className="mb-0"><span className="fw-semibold">Payment Status:</span> {appointment.payment_status}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Sticky Action Bar */}
        <div className="row justify-content-center" style={{zIndex: 10}}>
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 rounded-3 mb-4">
              <div className="card-body">
                <h5 className="fw-bold text-dark mb-3"><FiEdit2 className="me-2 text-success" />Update Appointment</h5>
                <div className="row g-3 align-items-end">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Update Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="form-select form-select-lg"
                      disabled={isUpdating}
                      title="Change appointment status"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Doctor Notes</label>
                    <textarea
                      value={notes || getDisplayNotes(appointment)}
                      onChange={(e) => setNotes(e.target.value)}
                      className="form-control form-control-lg"
                      placeholder="Add your notes here..."
                      rows={4}
                      disabled={isUpdating}
                      title="Add notes for this appointment"
                    />
                  </div>
                </div>
                <div className="d-flex gap-3 mt-4 justify-content-end">
                  <button 
                    onClick={handleUpdate} 
                    className="btn btn-success px-4"
                    disabled={isUpdating}
                    title="Save changes"
                  >
                    {isUpdating ? 'Updating...' : 'Update Appointment'}
                  </button>
                  <button 
                    onClick={() => navigate('/doctor/appointments')} 
                    className="btn btn-outline-secondary px-4"
                    disabled={isUpdating}
                    title="Back to appointments"
                  >
                    <FiChevronLeft className="me-2" />Back to Appointments
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
