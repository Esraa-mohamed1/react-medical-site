import axios from 'axios';

export const getAvailableTimes = async (doctorId) => {
  const response = await axios.get('https://pearla.pythonanywhere.com/api/medical/time-slots/available/', {
    params: { doctor_id: doctorId }
  });
  return response.data;
};

// For backward compatibility
export { getAvailableTimes as fetchAvailableTimes };
