// DoctorChatsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import CustomNavbar from '../components/Navbar';
import DoctorSidebar from '../features/doctors/components/DoctorSidebar';
import '../features/doctors/style/style.css';
// import Footer from "./../features/homePage/components/Footer";


const API_BASE = process.env.REACT_APP_API_BASE || 'https://pearla.pythonanywhere.com/api/chat';

export default function DoctorChatsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access');

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (!accessToken || !loggedUser || loggedUser.role !== 'doctor') {
      navigate('/login');
      return;
    }
    axios.get(`${API_BASE}/rooms/`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(res => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('access');
          localStorage.removeItem('loggedUser');
          navigate('/login');
          return;
        } else {
          setError('Failed to fetch chats');
        }
        setLoading(false);
      });
  }, [accessToken, navigate]);

  const pageCount = Math.ceil(rooms.length / itemsPerPage);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const paginatedRooms = rooms.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  if (loading) return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="enhanced-main-card d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
  if (error) return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="enhanced-main-card text-center p-5">
          <div style={{ color: 'red' }}>{error}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="enhanced-main-card">
          <div className="section-header mb-4">Doctor Chats</div>
          {paginatedRooms.length === 0 ? (
            <div className="text-center text-muted py-4">No chats found.</div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {paginatedRooms.map(room => {
                const patientName = room.patient?.full_name || room.patient?.user?.username || '---';
                const doctorName = room.doctor?.full_name || room.doctor?.user?.username || '---';
                const lastMsg = room.messages?.length ? room.messages[room.messages.length - 1] : null;
                const isDoctor = lastMsg && lastMsg.sender === room.doctor?.doctor_id;
                return (
                  <li
                    key={room.id}
                    onClick={() => navigate(`/doctor-chat/${room.id}`)}
                    className="section-card enhanced-section-card mb-3 chat-list-item"
                    style={{ cursor: 'pointer', transition: '0.2s', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #ede7f6', borderRadius: '1rem', boxShadow: '0 2px 8px rgba(80,80,160,0.06)' }}
                  >
                    <div className="flex-grow-1">
                      <div className="fw-bold fs-5 mb-1" style={{ color: '#4527a0' }}>{isDoctor ? doctorName : patientName}</div>
                      <div className="text-muted" style={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '1rem' }}>
                        {lastMsg ? lastMsg.text : 'No messages yet'}
                      </div>
                    </div>
                    <div className="text-muted small ms-3" style={{ whiteSpace: 'nowrap', fontSize: '0.95rem' }}>
                      {lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString() : ''}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {/* Pagination only if needed */}
          {rooms.length > itemsPerPage && (
            <div className="d-flex justify-content-center mt-4">
              <ReactPaginate
                previousLabel={'←'}
                nextLabel={'→'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName={'page-item'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                breakClassName={'page-item'}
                disabledClassName={'disabled'}
                pageLinkClassName={'page-link'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                breakLinkClassName={'page-link'}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
