import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000/api/chat';

export default function ChatWithDoctor({ doctorId, patientId }) {
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasNew, setHasNew] = useState(false);
  const user = useSelector(state => state.auth.user);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Create or get chat room
    axios.post(`${API_BASE}/rooms/`, { doctor: doctorId, patient: patientId })
      .then(res => {
        setRoom(res.data);
        setMessages(res.data.messages || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [doctorId, patientId]);

  useEffect(() => {
    // Poll for new messages every 3 seconds
    if (!room) return;
    const interval = setInterval(() => {
      axios.get(`${API_BASE}/rooms/${room.id}/`)
        .then(res => {
          if (res.data.messages.length > messages.length) {
            setMessages(res.data.messages);
            setHasNew(true);
            toast.info('New message received!');
          }
        });
    }, 3000);
    return () => clearInterval(interval);
  }, [room, messages.length]);

  useEffect(() => {
    if (hasNew && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setHasNew(false);
    }
  }, [messages, hasNew]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await axios.post(`${API_BASE}/messages/`, {
      room: room.id,
      sender: user.id,
      text,
    });
    setText('');
    // Fetch new messages
    const res = await axios.get(`${API_BASE}/rooms/${room.id}/`);
    setMessages(res.data.messages);
  };

  if (loading) return <div>Loading chat...</div>;
  if (!room) return <div>Unable to start chat.</div>;

  return (
    <div className="chat-box" style={{background:'#f7fafc',borderRadius:8,padding:16,maxWidth:500,margin:'auto',boxShadow:'0 2px 8px #eee'}}>
      <div className="chat-messages" style={{maxHeight:300,overflowY:'auto',marginBottom:8}}>
        {messages.map(msg => (
          <div key={msg.id} style={{textAlign: msg.sender === user.id ? 'right' : 'left',margin:'8px 0'}}>
            <span style={{display:'inline-block',background: msg.sender === user.id ? '#00bf6f' : '#699daa',color:'#fff',borderRadius:16,padding:'6px 16px',maxWidth:'80%',wordBreak:'break-word'}}>
              {msg.text}
            </span>
            <div style={{fontSize:10,color:'#888'}}>{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} style={{display:'flex',gap:8}}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message..." style={{flex:1,padding:8,borderRadius:8,border:'1px solid #ccc'}} />
        <button type="submit" style={{background:'#00bf6f',color:'#fff',border:'none',borderRadius:8,padding:'8px 16px'}}>Send</button>
      </form>
    </div>
  );
}
