import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import "./style.css";
import "../../../styles/global.css";
import CustomNavbar from '../../../components/Navbar';
import { FiUser, FiCalendar, FiClock, FiChevronLeft, FiCheckCircle, FiEdit2, FiFileText } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import DoctorSidebar from '../components/DoctorSidebar';
import '../../../features/doctors/style/style.css';

// Add getStatusBadge helper
const getStatusBadge = (status) => {
  if (!status) return 'bg-secondary';
  switch(status.toLowerCase()) {
    case 'scheduled':
      return 'bg-warning text-dark';
    case 'completed':
      return 'bg-success';
    case 'cancelled':
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
};

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
          `https://pearla.pythonanywhere.com/api/medical/appointments/doctor/`,
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
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Update Appointment Status?',
      text: `Are you sure you want to update this appointment status to "${status}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
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
          `https://pearla.pythonanywhere.com/api/medical/appointments/${id}/update/`,
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

        // Show success message with SweetAlert
        await Swal.fire({
          title: 'Success!',
          text: 'Appointment status updated successfully!',
          icon: 'success',
          confirmButtonColor: '#28a745'
        });

        // Refresh appointment data from doctor endpoint
        const response = await axios.get(
          `https://pearla.pythonanywhere.com/api/medical/appointments/doctor/`,
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
        // Show error message with SweetAlert
        await Swal.fire({
          title: 'Error!',
          text: error.response?.data?.detail || "Failed to update appointment status",
          icon: 'error',
          confirmButtonColor: '#dc3545'
        });
      } finally {
        setIsUpdating(false);
      }
    }
  };

  // Helper for avatar/initials
  const getInitials = (username) => {
    if (!username) return 'U';
    return username.slice(0, 2).toUpperCase();
  };

  // Map fields directly from API response
  const getDisplayDate = (appointment) => {
    return appointment?.date || 'No date';
  };
  const getDisplayTime = (appointment) => {
    if (!appointment?.start_time) return 'No time';
    if (appointment.end_time) {
      return `${appointment.start_time.slice(0,5)} - ${appointment.end_time.slice(0,5)}`;
    }
    return appointment.start_time.slice(0,5);
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
          <h3 className="fw-bold text-dark mb-3">Unable to load appointment details</h3>
          <p className="text-muted">Please try again later.</p>
          <button className="edit-btn mt-3" onClick={() => navigate('/doctor/appointments')}>
            <FiChevronLeft className="me-2" />Back to Appointments
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="enhanced-main-card">
          <div className="section-header mb-4">Appointment Details</div>
          <div className="d-flex flex-column flex-md-row align-items-center gap-3 mb-4">
            <span className={`badge rounded-pill px-3 py-2 fs-6 ${
              appointment.status === 'scheduled' ? 'bg-warning text-dark' :
              appointment.status === 'completed' ? 'bg-success' :
              appointment.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
            }`} title="Current Status">
              {appointment.status || 'Scheduled'}
            </span>
            <span className="text-muted d-flex align-items-center gap-2">
              <FiCalendar className="text-primary" />
              {getDisplayDate(appointment)} <FiClock className="ms-2 text-primary" /> {getDisplayTime(appointment)}
            </span>
          </div>
          <div className="section-card enhanced-section-card mb-4">
            <div className="section-header mb-3">Patient Information</div>
            <div className="d-flex flex-column flex-md-row align-items-center gap-4">
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: 64, height: 64, fontSize: 28}}>
                {appointment.patient_info ? getInitials(appointment.patient_info.username) : 'U'}
              </div>
              <div>
                <div className="fw-bold fs-5 mb-1">{getDisplayPatient(appointment)}</div>
                <div className="text-muted mb-1"><FiUser className="me-2" />{getDisplayEmail(appointment)}</div>
              </div>
            </div>
          </div>
          <div className="section-card enhanced-section-card mb-4">
            <div className="section-header mb-3">Appointment Information</div>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="mb-2"><span className="fw-semibold">Date:</span> {getDisplayDate(appointment)}</div>
                <div className="mb-2"><span className="fw-semibold">Time:</span> {getDisplayTime(appointment)}</div>
               
                <div className="mb-2"><span className="fw-semibold">Title:</span> {appointment.title}</div>
                <div className="mb-2"><span className="fw-semibold">Payment Status:</span> {appointment.payment_status}</div>
                <div className="mb-2"><span className="fw-semibold">Price:</span> {appointment.available_time_info?.price ? `$${appointment.available_time_info.price}` : (appointment.price ? `$${appointment.price}` : 'N/A')}</div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Doctor Notes</label>
                <textarea
                  value={notes || getDisplayNotes(appointment)}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-control"
                  placeholder="Add your notes here..."
                  rows={4}
                  disabled={isUpdating}
                  title="Add notes for this appointment"
                />
                <label className="form-label fw-semibold mt-3">Update Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-select"
                  disabled={isUpdating || appointment.payment_status === 'paid'}
                  title="Change appointment status"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="d-flex gap-3 mt-4 justify-content-end">
              <button 
                onClick={handleUpdate} 
                className="review-btn px-4"
                disabled={isUpdating || appointment.payment_status === 'paid'}
                title="Save changes"
              >
                {isUpdating ? 'Updating...' : 'Update Appointment'}
              </button>
              <button 
                onClick={() => navigate('/doctor/appointments')} 
                className="edit-btn px-4"
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
  );
}