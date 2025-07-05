import React from 'react';
import ChatWithDoctor from '../components/ChatWithDoctor';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomNavbar from '../components/Navbar';

export default function ChatPage() {
  // Assume patient is the logged-in user
  const user = useSelector(state => state.auth.user);
  const { doctorId } = useParams();

  if (!user) return <div>Please login to chat.</div>;
  if (!doctorId) return <div>No doctor selected.</div>;
  if (!user.profile_id) return <div>Patient profile_id missing. Please re-login or contact support.</div>;

  return (
    <>
    <CustomNavbar />
    <div>
      {/* <h2 style={{textAlign:'center',color:'#00bf6f'}}>Chat with Doctor</h2> */}
      {/* doctorId should be doctor.doctor_id, patientId should be user.profile_id */}
      <ChatWithDoctor doctorId={doctorId} patientId={user.profile_id} />
    </div>
    </>
  );
}
