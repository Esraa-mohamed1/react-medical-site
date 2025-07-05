import axios from 'axios';

export const getAvailableTimes = async (doctorId) => {
  const response = await axios.get('http://localhost:8000/api/medical/time-slots/available/', {
    params: { doctor_id: doctorId }
  });
  return response.data;
};

// For backward compatibility
export { getAvailableTimes as fetchAvailableTimes };
