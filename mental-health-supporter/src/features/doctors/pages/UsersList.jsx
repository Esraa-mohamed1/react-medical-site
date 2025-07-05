import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DoctorSidebar from '../components/DoctorSidebar';
import { FiUser, FiSearch, FiInbox, FiEye, FiCalendar, FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import Swal from 'sweetalert2';
import './UsersList.css';

export default function UsersList() {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [patientsData, setPatientsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const usersResponse = await axios.get("http://localhost:3001/users");
        const patients = usersResponse.data.filter(user => user.role === "patient");
        
        const enrichedPatients = await Promise.all(
          patients.map(async (user) => {
            try {
              const patientResponse = await axios.get(`http://localhost:3001/patients?user_id=${user.id}`);
              const patient = patientResponse.data[0];
              const appointmentsResponse = await axios.get(`http://localhost:3001/appointments?patient_id=${patient.id}`);
              const appointments = appointmentsResponse.data;
              
              const latestAppointment = appointments.length > 0 
                ? appointments.reduce((latest, current) => {
                    return new Date(current.date) > new Date(latest.date) ? current : latest;
                  })
                : null;

              return {
                ...user,
                patientId: patient.id,
                latestAppointment,
                patientInfo: patient
              };
            } catch (error) {
              console.error(`Error fetching data for patient ${user.id}:`, error);
              return {
                ...user,
                patientId: null,
                latestAppointment: null,
                patientInfo: null
              };
            }
          })
        );

        setUsers(patients);
        setFilteredUsers(patients);
        setPatientsData(enrichedPatients);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load patients data. Please try again.',
          confirmButtonColor: '#37ECBA'
        });
        setUsers([]);
        setFilteredUsers([]);
        setPatientsData([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  useEffect(() => {
    if (users) {
      const filtered = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, users]);

  const handleViewDetails = (userId) => {
    navigate(`/doctor/appointments/${userId}`);
  };

  const handleViewProfile = (patientData) => {
    if (!patientData.patientInfo) {
      Swal.fire({
        icon: 'warning',
        title: 'Patient Profile Unavailable',
        text: 'Patient profile information is not available.',
        confirmButtonColor: '#37ECBA'
      });
      return;
    }
    navigate(`/patients-list/${patientData.patientId}`);
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
        return 'status-pending';
      default:
        return 'status-default';
    }
  };

  const getInitials = (name) => {
    if (!name) return 'P';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="doctor-dashboard-bg">
        <DoctorSidebar />
        <div className="doctor-dashboard-main">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading patients...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main">
        <div className="patients-container">
          {/* Header and Search */}
          <div className="patients-header">
            <div className="header-content">
              <h1 className="page-title">Patients Management</h1>
              <p className="page-subtitle">Manage and view your patients</p>
            </div>
            <div className="search-container">
              <div className="search-input-wrapper">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Patients Grid */}
          {filteredUsers.length === 0 ? (
            <div className="empty-state">
              <FiInbox className="empty-icon" />
              <h3 className="empty-title">
                {searchTerm ? "No matching patients found." : "No patients available."}
              </h3>
              <p className="empty-subtitle">
                {searchTerm 
                  ? `No patients match your search for "${searchTerm}".` 
                  : "When you have patients, they will show up here."
                }
              </p>
            </div>
          ) : (
            <>
              <div className="patients-grid">
                {currentUsers.map(user => {
                  const patientInfo = patientsData.find(p => p.id === user.id) || {};
                  const latestAppointment = patientInfo.latestAppointment;
                  const patientData = patientInfo.patientInfo;
                  
                  return (
                    <div key={user.id} className="patient-card">
                      <div className="card-header">
                        <div className="patient-avatar">
                          {patientData?.profile_image ? (
                            <img 
                              src={patientData.profile_image} 
                              alt={user.username}
                              className="avatar-image"
                            />
                          ) : (
                            <div className="avatar-initials">
                              {getInitials(user.username)}
                            </div>
                          )}
                        </div>
                        <div className="patient-status">
                          <span className={`status-badge ${user.is_approved ? 'status-approved' : 'status-pending'}`}>
                            {user.is_approved ? "Active" : "Pending"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="card-body">
                        <h3 className="patient-name">{user.username}</h3>
                        <div className="patient-info">
                          <div className="info-item">
                            <FiMail className="info-icon" />
                            <span className="info-text">{user.email}</span>
                          </div>
                          {patientData?.phone && (
                            <div className="info-item">
                              <FiPhone className="info-icon" />
                              <span className="info-text">{patientData.phone}</span>
                            </div>
                          )}
                          {patientData?.address && (
                            <div className="info-item">
                              <FiMapPin className="info-icon" />
                              <span className="info-text">{patientData.address}</span>
                            </div>
                          )}
                          {latestAppointment && (
                            <div className="info-item">
                              <FiCalendar className="info-icon" />
                              <span className="info-text">
                                Last: {new Date(latestAppointment.date).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {latestAppointment && (
                          <div className="appointment-status">
                            <span className={`status-badge ${getStatusBadge(latestAppointment.status)}`}>
                              {latestAppointment.status?.charAt(0).toUpperCase() + latestAppointment.status?.slice(1) || 'Scheduled'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="card-actions">
                        <button 
                          className="btn-secondary"
                          onClick={() => handleViewProfile(patientInfo)}
                        >
                          <FiUser className="btn-icon" />
                          View Profile
                        </button>
                        <button 
                          className="btn-primary"
                          onClick={() => handleViewDetails(user.id)}
                        >
                          <FiEye className="btn-icon" />
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination-container">
                  <nav className="pagination-nav">
                    <button 
                      className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    
                    <div className="pagination-pages">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button 
                          key={i + 1} 
                          className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                          onClick={() => paginate(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}