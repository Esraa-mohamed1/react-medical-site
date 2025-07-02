// DoctorChatRoomPage.js
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CustomNavbar from '../components/Navbar';
import Footer from "./../features/homePage/components/Footer";
import DoctorSidebar from '../features/doctors/components/DoctorSidebar';
import '../features/doctors/style/style.css';


const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000/api/chat';

export default function DoctorChatRoomPage() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const accessToken = localStorage.getItem('access');
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE}/rooms/${roomId}/`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(res => {
        setRoom(res.data);
        setMessages(res.data.messages || []);
        setLoading(false);
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          navigate('/login');
          return;
        }
        setLoading(false);
      });
  }, [roomId, navigate]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await axios.post(
        `${API_BASE}/messages/`,
        {
          room: room.id,
          sender: user?.user_id,
          text,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setText('');
      // Fetch new messages
      const res = await axios.get(
        `${API_BASE}/rooms/${room.id}/`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setMessages(res.data.messages);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate('/login');
        return;
      }
      // Optionally handle other errors
    }
  };

  if (loading) return <div style={{textAlign:'center',marginTop:40}}>Loading messages...</div>;
  if (!room) return <div style={{textAlign:'center',color:'red'}}>Failed to load chat room.</div>;

  // Get patient name from room.patient if available
  const patientName = room?.patient?.full_name || '---';
  const roomName = room?.name || 'Chat Room';

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="enhanced-main-card">
          <div className="section-header mb-4">{roomName}</div>
          <div className="chat-room-area" style={{ height: 500, maxHeight: 500, background: 'linear-gradient(135deg, #e0f7fa 60%, #e8eaf6 100%)', borderRadius: '1rem', padding: '2rem', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(80,80,160,0.06)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div className="chat-messages" style={{width:'100%', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              {messages.map((msg, idx) => {
                const senderId = typeof msg.sender === 'object' ? msg.sender.id : msg.sender;
                const isMe = senderId === user?.user_id;
                return (
                  <div
                    key={msg.id || idx}
                    style={{
                      display: 'flex',
                      justifyContent: isMe ? 'flex-end' : 'flex-start',
                      alignItems: 'flex-end',
                      width: '100%'
                    }}
                  >
                    <div
                      style={{
                        background: isMe ? 'linear-gradient(90deg, #b2dfdb 60%, #80cbc4 100%)' : '#fff',
                        color: isMe ? '#222' : '#333',
                        borderRadius: isMe ? '1.2rem 1.2rem 0.2rem 1.2rem' : '1.2rem 1.2rem 1.2rem 0.2rem',
                        boxShadow: '0 2px 8px rgba(80,80,160,0.10)',
                        padding: '0.75rem 1.25rem',
                        maxWidth: '70%',
                        fontSize: '1.05rem',
                        marginBottom: '0.2rem',
                        marginLeft: isMe ? 'auto' : undefined,
                        marginRight: !isMe ? 'auto' : undefined,
                        position: 'relative',
                      }}
                    >
                      {msg.text}
                      <div style={{ fontSize: '0.85rem', color: '#888', marginTop: 4, textAlign: isMe ? 'right' : 'left' }}>
                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form onSubmit={handleSend} style={{display:'flex',gap:8,padding:16,background: 'linear-gradient(to right, #37ECBA, #72AFD3)',borderTop:'1px solid #ccc',width:'100%',position:'sticky',bottom:0}}>
            <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message..." style={{flex:1,padding:12,borderRadius:20,border:'1px solid #ccc',outline:'none',fontSize:16}} />
            <button type="submit" style={{background: 'linear-gradient(to right, #37ECBA, #72AFD3)',color:'#fff',border:'1px solid green',borderRadius:20,padding:'8px 24px',fontWeight:'bold',fontSize:16,cursor:'pointer'}}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
