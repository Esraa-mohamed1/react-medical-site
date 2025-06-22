import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import doctorPlaceholder from "../../../components/DoctorsListComponent/images/doctor-placeholder.jpg";
import {
  LayoutDashboard,
  Calendar,
  Users,
  LogOut,
  Search,
  Bell,
} from "lucide-react";

import "../style/DoctorDashboard.css";

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const userData = JSON.parse(localStorage.getItem("loggedUser"));

      if (!userData || !userData.token) {
        setError("No authentication token found. Please login again.");
        setLoading(false);
          navigate("/login");
          return;
        }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      };

      try {
        const doctorResponse = await axios.get(`${API_BASE_URL}/doctor/profile/`, { headers });
        setDoctor(doctorResponse.data);

        const appointmentsResponse = await axios.get(`${API_BASE_URL}/appointments/doctor-appointments/`, { headers });
        setAppointments(appointmentsResponse.data || []);
        
      } catch (err) {
        console.error("Failed to load data:", err);
        setError(err.response?.data?.detail || "Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };
  
  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error} <button onClick={() => navigate('/login')}>Login Again</button></div>;

    return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <img 
            src={doctor?.user.image || doctorPlaceholder} 
            alt="Doctor" 
            className="doctor-avatar"
          />
          <h3 className="doctor-name">{doctor?.user.name || "Dr. Name"}</h3>
          <p className="doctor-specialty">{doctor?.specialty.name || "Specialty"}</p>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item">
              <Link to="/doctor/dashboard" className="nav-link active">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/doctor/appointments" className="nav-link">
                <Calendar size={20} />
                <span>Appointments</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/doctor/users" className="nav-link">
                <Users size={20} />
                <span>Patients</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
           <ul className="sidebar-nav">
             <li className="nav-item">
                <Link to="#" onClick={handleLogout} className="nav-link">
                    <LogOut size={20} />
                    <span>Logout</span>
                </Link>
             </li>
           </ul>
          <p>&copy; {new Date().getFullYear()} Pearla. All Rights Reserved.</p>
      </div>
      </aside>

      <main className="dashboard-main-content">
        <header className="dashboard-header">
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search" />
          </div>
          <div className="header-actions">
            <Bell size={22} />
            <img src={doctor?.user.image || doctorPlaceholder} alt="User" className="user-profile-icon" />
          </div>
        </header>

        <section className="summary-cards">
          <div className="summary-card">
            <p className="summary-card-title">Total Appointments</p>
            <h2 className="summary-card-value">{appointments.length}</h2>
            <p className="summary-card-trend"><span className="positive">+5.9%</span> last week</p>
          </div>
          <div className="summary-card">
            <p className="summary-card-title">Total Patients</p>
            <h2 className="summary-card-value">{patients.length}</h2>
            <p className="summary-card-trend"><span className="negative">-4.7%</span> last week</p>
          </div>
          <div className="summary-card">
            <p className="summary-card-title">Total Earnings</p>
            <h2 className="summary-card-value">$0</h2>
            <p className="summary-card-trend"><span className="positive">+8.2%</span> last week</p>
          </div>
        </section>

        <section className="activity-section">
          <div className="activity-header">
            <h2>Appointment Activity</h2>
          </div>
          <table className="activity-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Visit Time</th>
                <th>Status</th>
                  </tr>
                </thead>
                <tbody>
              {appointments.slice(0, 5).map(app => (
                <tr key={app.id}>
                  <td>
                    <div className="patient-name">
                      <img src={doctorPlaceholder} alt={app.patient_name} className="patient-avatar" />
                      <span>{app.patient_name || "N/A"}</span>
                    </div>
                      </td>
                  <td>{new Date(app.date).toLocaleDateString()}</td>
                  <td>{app.start_time} - {app.end_time}</td>
                  <td><span className={`status-${app.status}`}>{app.status}</span></td>
                    </tr>
              ))}
                </tbody>
              </table>
          <div className="pagination">
            <span>Showing 1 - {Math.min(5, appointments.length)} out of {appointments.length}</span>
            <div className="pagination-controls">
              <button>Prev</button>
              <button className="active">1</button>
              <button>Next</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DoctorDashboard;