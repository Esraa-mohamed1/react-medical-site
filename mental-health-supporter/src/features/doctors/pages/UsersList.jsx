import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomNavbar from '../../../components/Navbar';
import { FiUser, FiSearch, FiInbox } from 'react-icons/fi';

export default function UsersList() {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [patientsData, setPatientsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
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
                latestAppointment
              };
            } catch (error) {
              console.error(`Error fetching data for patient ${user.id}:`, error);
              return {
                ...user,
                patientId: null,
                latestAppointment: null
              };
            }
          })
        );

        setUsers(patients);
        setFilteredUsers(patients);
        setPatientsData(enrichedPatients);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
        setFilteredUsers([]);
        setPatientsData([]);
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

  const handleClick = (userId) => {
    navigate(`/doctor/appointments/${userId}`);
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (users === null) {
    return (
      <div className="min-vh-100 bg-light d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <CustomNavbar />
      <div className="container py-5">
        {/* Header and Search */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
          <div>
            <h1 className="fw-bold text-dark mb-1">Patients Management</h1>
            <p className="text-muted mb-0">Manage and view your patients</p>
          </div>
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text bg-white"><FiSearch /></span>
            <input
              type="text"
              placeholder="Search patients..."
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {/* Users Grid */}
        {filteredUsers.length === 0 ? (
          <div className="card shadow-sm p-5 text-center">
            <FiInbox className="mx-auto h1 text-muted" style={{fontSize: '4rem'}}/>
            <h3 className="mt-4 fw-bold text-dark">{searchTerm ? "No matching patients found." : "No patients available."}</h3>
            <p className="mt-2 text-muted">{searchTerm ? `No patients match your search for "${searchTerm}".` : "When you have patients, they will show up here."}</p>
          </div>
        ) : (
          <>
            <div className="row g-4 mb-4">
              {currentUsers.map(user => {
                const patientInfo = patientsData.find(p => p.id === user.id) || {};
                const latestAppointment = patientInfo.latestAppointment;
                return (
                  <div key={user.id} className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm border-0 rounded-3 cursor-pointer hover-shadow" onClick={() => handleClick(user.id)}>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold text-dark mb-2 truncate"><FiUser className="me-2 text-primary" />{user.username}</h5>
                        <p className="text-muted mb-1"><span className="fw-semibold">Email:</span> {user.email}</p>
                        <p className={`mb-1 fw-semibold ${user.is_approved ? "text-success" : "text-danger"}`}>Status: {user.is_approved ? "Approved" : "Pending"}</p>
                        {latestAppointment && (
                          <p className={`text-sm mb-1 ${
                            latestAppointment.status === 'approved' ? 'text-success' : 
                            latestAppointment.status === 'rejected' ? 'text-danger' : 
                            'text-warning'
                          }`}>
                            Last Appointment: {latestAppointment.status.charAt(0).toUpperCase() + latestAppointment.status.slice(1)}
                            {latestAppointment.date && (
                              <span className="ms-1 text-muted">({new Date(latestAppointment.date).toLocaleDateString()})</span>
                            )}
                          </p>
                        )}
                        <div className="mt-auto">
                          <button className="btn btn-outline-primary btn-sm w-100 mt-2" onClick={e => {e.stopPropagation(); handleClick(user.id);}}>
                            View Appointments &rarr;
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-5">
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => paginate(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}