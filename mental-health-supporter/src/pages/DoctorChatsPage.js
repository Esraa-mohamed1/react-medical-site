// DoctorChatsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import CustomNavbar from '../components/Navbar';
// import Footer from "./../features/homePage/components/Footer";


const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000/api/chat';

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

  if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}>Loading chats...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

  return (
    <>
      <CustomNavbar />
      <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Doctor Chats</h2>
        {paginatedRooms.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888' }}>No chats found.</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {paginatedRooms.map(room => {
              const patientName = room.patient?.full_name || room.patient?.user?.username || '---';
              const doctorName = room.doctor?.full_name || room.doctor?.user?.username || '---';
              const lastMsg = room.messages?.length ? room.messages[room.messages.length - 1] : null;
              const isDoctor = lastMsg && lastMsg.sender === room.doctor?.doctor_id;
              return (
                <li
                  key={room.id}
                  onClick={() => navigate(`/doctor-chat/${room.id}`)}
                  style={{
                    background: '#fff',
                    borderRadius: 12,
                    padding: '12px 16px',
                    marginBottom: 12,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: isDoctor ? 'flex-end' : 'flex-start',
                    alignItems: 'center',
                    transition: '0.2s',
                  }}
                >
                  <div style={{ textAlign: isDoctor ? 'right' : 'left', width: '100%' }}>
                    <div style={{ fontWeight: 'bold', fontSize: 16 }}>
                      {isDoctor ? doctorName : patientName}
                    </div>
                    <div style={{ fontSize: 14, color: '#666', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lastMsg ? lastMsg.text : 'No messages yet'}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: '#999', whiteSpace: 'nowrap', marginLeft: 8 }}>
                    {lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString() : ''}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Pagination only if needed */}
        {rooms.length > itemsPerPage && (
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
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
      {/* <Footer /> */}
    </>
  );
}
