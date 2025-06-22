import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import "../../../styles/global.css";

export default function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

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
            },
          }
        );

        setAppointment(response.data);
        setStatus(response.data.status || "scheduled");
        setNotes(response.data.notes || "");
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
      
      // Refresh appointment data
      const response = await axios.get(
        `http://127.0.0.1:8000/api/medical/appointments/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointment(response.data);
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error(error.response?.data?.detail || "Failed to update appointment status");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    if (!status) return 'status-badge scheduled';
    switch(status.toLowerCase()) {
      case 'scheduled':
        return 'status-badge scheduled';
      case 'completed':
        return 'status-badge completed';
      case 'cancelled':
        return 'status-badge cancelled';
      default:
        return 'status-badge scheduled';
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (!appointment) return <div className="loading">Unable to load appointment details</div>;

  return (
    <div className="appointment-container">
      <h1 className="appointment-header">Appointment Details</h1>

      <div className="appointment-info">
        <div className="info-card">
          <h2 className="info-title">Patient Information</h2>
          {appointment.patient_data ? (
            <>
              <p><strong>Name:</strong> {appointment.patient_data.name || 'Walk-in'}</p>
              <p><strong>Email:</strong> {appointment.patient_data.email || 'Not available'}</p>
              <p><strong>Phone:</strong> {appointment.patient_data.phone || 'Not available'}</p>
            </>
          ) : (
            <div className="not-booked-message">
              <p className="not-booked">Walk-in Appointment</p>
              <p className="booking-status">No patient information available</p>
            </div>
          )}
        </div>

        <div className="info-card">
          <h2 className="info-title">Appointment Information</h2>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          <p><strong>Status:</strong> 
            <span className={getStatusBadge(appointment.status)}>
              {appointment.status || 'Scheduled'}
            </span>
          </p>
          <p><strong>Appointment ID:</strong> #{appointment.id}</p>
        </div>
      </div>

      <div className="form-section">
        <div className="form-group">
          <label className="form-label">Update Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-select"
            disabled={isUpdating}
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Doctor Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="form-textarea"
            placeholder="Add your notes here..."
            rows={4}
            disabled={isUpdating}
          />
        </div>

        <div className="button-group">
          <button 
            onClick={handleUpdate} 
            className="submit-btn"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Appointment'}
          </button>
          <button 
            onClick={() => navigate('/doctor/appointments')} 
            className="cancel-btn"
            disabled={isUpdating}
          >
            Back to Appointments
          </button>
        </div>
      </div>
    </div>
  );
}
