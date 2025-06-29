// DoctorChatRoomPage.js
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CustomNavbar from '../components/Navbar';
import Footer from "./../features/homePage/components/Footer";


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

  return (
    <>
    <CustomNavbar />
<div style={{  background: 'radial-gradient(circle at top left, #c6f4f1, #d4f1f7, #bdeff2)', minHeight: '100vh', width: '100vw', zIndex: 0}}>
      <div className="chat-box" style={{width:'100%',maxWidth:600,minWidth:320,height:'100vh',margin:'0 auto',display:'flex',flexDirection:'column',background:'#f0f0f0',boxShadow:'0 0 8px rgba(0,0,0,0.1)'}}>
        {/* Header with Back Button */}
        <div style={{background: 'linear-gradient(to right, #37ECBA, #72AFD3)',color:'#fff',padding:'16px 16px',fontSize:20,fontWeight:'bold',display:'flex',alignItems:'center',width:'100%',borderBottom:'2px solid #ddd'}}>
          <button onClick={() => window.history.back()} style={{background:'transparent',border:'none',color:'#fff',fontSize:40,cursor:'pointer',marginRight:16,fontWeight:'bolder'}}>
            ←
          </button>
          {patientName}
        </div>
        {/* Messages */}
        <div className="chat-messages" style={{flex:1,width:'100%',overflowY:'auto',padding:24,background: 'darkcyan'}}>
          {messages.map(msg => {
            const senderId = typeof msg.sender === 'object' ? msg.sender.id : msg.sender;
            const patientUserId = room?.patient?.user_id;
            const doctorUserId = room?.doctor?.user_id;
            const isPatient = senderId === patientUserId;
            const isDoctor = senderId === doctorUserId;
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: isPatient ? 'flex-end' : 'flex-start',
                  margin: '8px 0',
                }}
              >
                <span
                  style={{
                    background: isPatient ? '#dcf8c6' : '#fff',
                    color: '#222',
                    borderRadius: '16px',
                    padding: '10px 16px',
                    maxWidth: '75%',
                    wordBreak: 'break-word',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                    border: isPatient ? '1px solid #b2f5ea' : '1px solid #e0e0e0',
                    marginLeft: isPatient ? 'auto' : 0,
                    marginRight: isPatient ? 0 : 'auto',
                    alignSelf: 'flex-start',
                    textAlign: 'left',
                  }}
                >
                  {msg.text}
                  <div
                    style={{
                      fontSize: 10,
                      color: '#888',
                      marginTop: 4,
                      textAlign: 'right',
                    }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <form onSubmit={handleSend} style={{display:'flex',gap:8,padding:16,background: 'linear-gradient(to right, #37ECBA, #72AFD3)',borderTop:'1px solid #ccc',width:'100%',position:'sticky',bottom:0}}>
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message..." style={{flex:1,padding:12,borderRadius:20,border:'1px solid #ccc',outline:'none',fontSize:16}} />
          <button type="submit" style={{background: 'linear-gradient(to right, #37ECBA, #72AFD3)',color:'#fff',border:'1px solid green',borderRadius:20,padding:'8px 24px',fontWeight:'bold',fontSize:16,cursor:'pointer'}}>Send</button>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
}
