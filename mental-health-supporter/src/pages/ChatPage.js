import React from 'react';
import ChatWithDoctor from '../components/ChatWithDoctor';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ChatPage() {
  // Assume patient is the logged-in user
  const user = useSelector(state => state.auth.user);
  const { doctorId } = useParams();

  if (!user) return <div>Please login to chat.</div>;
  if (!doctorId) return <div>No doctor selected.</div>;

  return (
    <div style={{padding:'2rem 0'}}>
      <h2 style={{textAlign:'center',color:'#00bf6f'}}>Chat with Doctor</h2>
      <ChatWithDoctor doctorId={doctorId} patientId={user.profile_id} />
    </div>
  );
}
