import React, { useEffect, useState } from 'react';
import DoctorSidebar from '../components/DoctorSidebar';
import { FaBell, FaSearch, FaUserFriends, FaCalendarAlt, FaComments } from 'react-icons/fa';
import './style.css';
import axios from 'axios';

// Mock data for demonstration
const mockOverview = {
  appointments: 24,
  patients: 12,
  chats: 7,
};
const mockAppointments = [
  { id: '#876384', name: 'Jayarajan Kp', gender: 'Male', reason: 'Monthly checkup' },
  { id: '#384745', name: 'Varun P', gender: 'Male', reason: 'Consultation' },
  { id: '#234858', name: 'Nithya P', gender: 'Female', reason: 'Monthly checkup' },
  { id: '#452347', name: 'Jithesh', gender: 'Male', reason: 'Monthly checkup' },
  { id: '#097345', name: 'Vibha Ak', gender: 'Female', reason: 'Monthly checkup' },
  { id: '#123745', name: 'Manushi Pl', gender: 'Female', reason: 'Checkup' },
  { id: '#384725', name: 'Hari Raj', gender: 'Male', reason: 'Checkup' },
  { id: '#187345', name: 'Ravi Prasadh', gender: 'Male', reason: 'Monthly checkup' },
];
const mockSchedule = [
  { time: '8:30', patient: 'Vibha Jayarjan', purpose: 'General check-up' },
  { time: '9:00', patient: 'Consultation: Abdu Johnson', purpose: '' },
  { time: '9:30', patient: 'Rebecca Gifts', purpose: '' },
  { time: '10:00', patient: 'ERC Report', purpose: '' },
  { time: '10:30', patient: 'Consultation meeting', purpose: '' },
  { time: '11:00', patient: 'Victory Jones', purpose: '' },
  { time: '11:30', patient: 'Board meeting', purpose: '' },
  { time: '12:00', patient: 'Consultation', purpose: '' },
  { time: '12:30', patient: 'Team meeting', purpose: '' },
  { time: '12:40', patient: 'Break', purpose: '' },
  { time: '12:50', patient: 'Board meeting', purpose: '' },
];

const DoctorDashboard = () => {
  // Replace mock data with real API calls as needed
  const [overview, setOverview] = useState(mockOverview);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [schedule, setSchedule] = useState(mockSchedule);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotForm, setSlotForm] = useState({ date: '', start_time: '', end_time: '', available: true, price: '' });
  const [slotLoading, setSlotLoading] = useState(false);
  const [slotError, setSlotError] = useState(null);
  const [slotSuccess, setSlotSuccess] = useState(null);

  // Fetch available slots for the doctor
  const fetchAvailableSlots = async () => {
    setSlotLoading(true);
    setSlotError(null);
    try {
      const token = localStorage.getItem('access');
      const res = await axios.get('http://127.0.0.1:8000/api/time_slots/available/my/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAvailableSlots(res.data);
    } catch (err) {
      setSlotError('Failed to fetch available slots.');
    } finally {
      setSlotLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const handleSlotFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSlotForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSlotFormSubmit = async (e) => {
    e.preventDefault();
    setSlotLoading(true);
    setSlotError(null);
    setSlotSuccess(null);
    try {
      const token = localStorage.getItem('access');
      const payload = { ...slotForm };
      payload.available = Boolean(payload.available);
      const res = await axios.post('http://127.0.0.1:8000/api/time_slots/available/create/', payload, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      setSlotSuccess('Time slot created successfully!');
      setSlotForm({ date: '', start_time: '', end_time: '', available: true, price: '' });
      fetchAvailableSlots();
    } catch (err) {
      setSlotError('Failed to create time slot.');
    } finally {
      setSlotLoading(false);
    }
  };

  // Example: fetch data from API here
  useEffect(() => {
    // TODO: Replace with real API calls
  }, []);

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main">
        {/* Top Bar */}
        <div className="dashboard-topbar">
          <div className="dashboard-search">
            <FaSearch className="dashboard-search-icon" />
            <input type="text" placeholder="Search" className="dashboard-search-input" />
          </div>
          <div className="dashboard-topbar-icons">
            <FaBell className="dashboard-topbar-icon" />
            <FaBell className="dashboard-topbar-icon" />
          </div>
        </div>
        {/* Overview Cards */}
        <div className="dashboard-overview-cards">
          <div className="overview-card">
            <div className="overview-card-icon appointments"><FaCalendarAlt /></div>
            <div className="overview-card-info">
              <div className="overview-card-title">Appointments</div>
              <div className="overview-card-value">{overview.appointments}</div>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-card-icon patients"><FaUserFriends /></div>
            <div className="overview-card-info">
              <div className="overview-card-title">Patients</div>
              <div className="overview-card-value">{overview.patients}</div>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-card-icon chats"><FaComments /></div>
            <div className="overview-card-info">
              <div className="overview-card-title">Chats</div>
              <div className="overview-card-value">{overview.chats}</div>
            </div>
          </div>
        </div>
        {/* Add Available Time Slot Form */}
        <div className="dashboard-section-card" style={{ background: '#e0f7fa', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(44, 62, 80, 0.07)' }}>
          <h3 style={{ color: '#2a5c5f', marginBottom: '1rem' }}>Add Available Time Slot</h3>
          <form onSubmit={handleSlotFormSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <input type="date" name="date" value={slotForm.date} onChange={handleSlotFormChange} required placeholder="Date" style={{ borderRadius: '8px', border: '1px solid #b2dfdb', padding: '0.5rem' }} />
            <input type="time" name="start_time" value={slotForm.start_time} onChange={handleSlotFormChange} required placeholder="Start Time" style={{ borderRadius: '8px', border: '1px solid #b2dfdb', padding: '0.5rem' }} />
            <input type="time" name="end_time" value={slotForm.end_time} onChange={handleSlotFormChange} required placeholder="End Time" style={{ borderRadius: '8px', border: '1px solid #b2dfdb', padding: '0.5rem' }} />
            <input type="number" name="price" value={slotForm.price} onChange={handleSlotFormChange} required min="0" step="0.01" placeholder="Price (e.g. 100.00)" style={{ borderRadius: '8px', border: '1px solid #b2dfdb', padding: '0.5rem', width: '120px' }} />
            <select name="available" value={slotForm.available ? 'true' : 'false'} onChange={e => setSlotForm(prev => ({ ...prev, available: e.target.value === 'true' }))} style={{ borderRadius: '8px', border: '1px solid #b2dfdb', padding: '0.5rem' }}>
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
            <button type="submit" disabled={slotLoading} style={{ background: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)', color: '#fff', border: 'none', borderRadius: '20px', padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 6px rgba(44, 62, 80, 0.08)' }}>
              {slotLoading ? 'Saving...' : 'Add Slot'}
            </button>
          </form>
          {slotError && <div style={{ color: '#d32f2f', marginTop: '0.5rem' }}>{slotError}</div>}
          {slotSuccess && <div style={{ color: '#388e3c', marginTop: '0.5rem' }}>{slotSuccess}</div>}
        </div>
        {/* List of Available Time Slots */}
        <div className="dashboard-section-card" style={{ background: '#f7fafc', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(44, 62, 80, 0.07)' }}>
          <h3 style={{ color: '#2a5c5f', marginBottom: '1rem' }}>Your Available Time Slots</h3>
          {slotLoading ? (
            <div>Loading slots...</div>
          ) : availableSlots.length === 0 ? (
            <div>No available time slots yet.</div>
          ) : (
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Available</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {availableSlots.map((slot) => (
                  <tr key={slot.id}>
                    <td>{slot.date}</td>
                    <td>{slot.start_time}</td>
                    <td>{slot.end_time}</td>
                    <td>{slot.available ? 'Yes' : 'No'}</td>
                    <td>{slot.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Main Content */}
        <div className="dashboard-content-row">
          {/* Appointments Table */}
          <div className="dashboard-appointments">
            <div className="dashboard-appointments-header">
              <span>Appointments</span>
              <a href="#" className="dashboard-viewall">View All</a>
            </div>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Visit No.</th>
                  <th>Patient Name</th>
                  <th>Gender</th>
                  <th>Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>{appt.id}</td>
                    <td>{appt.name}</td>
                    <td>{appt.gender}</td>
                    <td>{appt.reason}</td>
                    <td><a href="#" className="dashboard-consult-link">Consult</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Upcoming Schedule */}
          <div className="dashboard-schedule">
            <div className="dashboard-schedule-header">
              <span>Upcoming schedule</span>
              <a href="#" className="dashboard-viewall">View All</a>
            </div>
            <div className="dashboard-schedule-list">
              {schedule.map((item, idx) => (
                <div className="dashboard-schedule-item" key={idx}>
                  <div className="dashboard-schedule-time">{item.time}</div>
                  <div className="dashboard-schedule-details">
                    <div className="dashboard-schedule-patient">{item.patient}</div>
                    {item.purpose && <div className="dashboard-schedule-purpose">{item.purpose}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard; 