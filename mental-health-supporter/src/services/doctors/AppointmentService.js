import axios from 'axios';
import { getData, postData, updateData } from '../api';

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

// Fetch paid patients for the logged-in doctor
export const getPaidPatients = async () => {
  try {
    const data = await getData('/medical/appointments/paid/');
    return data;
  } catch (error) {
    console.error('Error fetching paid patients:', error);
    throw error;
  }
};

// New Appointment Records API
export const getAppointmentRecords = async (appointmentId) => {
  try {
    const token = localStorage.getItem('access');
    const response = await axios.get(
      `http://127.0.0.1:8000/api/medical/appointments/${appointmentId}/records/`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching appointment records:', error);
    throw error;
  }
};

export const createAppointmentRecord = async (appointmentId, formData, onUploadProgress) => {
  try {
    const token = localStorage.getItem('access');
    const response = await axios.post(
      `http://127.0.0.1:8000/api/medical/appointments/${appointmentId}/records/`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating appointment record:', error);
    throw error;
  }
};

export const updateAppointmentRecord = async (recordId, formData, onUploadProgress) => {
  try {
    const token = localStorage.getItem('access');
    const response = await axios.put(
      `http://127.0.0.1:8000/api/medical/appointments/records/${recordId}/`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating appointment record:', error);
    throw error;
  }
};

export const deleteAppointmentRecord = async (recordId) => {
  try {
    const token = localStorage.getItem('access');
    await axios.delete(
      `http://127.0.0.1:8000/api/medical/appointments/records/${recordId}/`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return true;
  } catch (error) {
    console.error('Error deleting appointment record:', error);
    throw error;
  }
};

export const getAppointmentRecord = async (recordId) => {
  try {
    const token = localStorage.getItem('access');
    const response = await axios.get(
      `http://127.0.0.1:8000/api/medical/appointments/records/${recordId}/`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching appointment record:', error);
    throw error;
  }
};
