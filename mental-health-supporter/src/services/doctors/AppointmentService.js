import axios from 'axios';

export const createAppointment = async (appointmentData, accessToken) => {
  const response = await axios.post(
    'http://127.0.0.1:8000/api/users/appointments/create/',
    appointmentData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
};
