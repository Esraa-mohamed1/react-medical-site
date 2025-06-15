import { getData, updateData } from '../api';

export const getDoctors = async () => {
    try {
        const doctors = await getData('/medical/doctors/');
        return doctors;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return [];
    }
};

// If you need to get a specific doctor by ID
export const getDoctorById = async (doctorId) => {
    try {
        const doctor = await getData(`/medical/doctors/${doctorId}/`);
        return doctor;
    } catch (error) {
        console.error('Error fetching doctor:', error);
        return null;
    }
};

// Add this new function to update a doctor
export const updateDoctor = async (doctorId, doctorData) => {
    try {
        const updatedDoctor = await updateData(`/medical/doctors/${doctorId}/update/`, doctorData);
        return updatedDoctor;
    } catch (error) {
        console.error('Error updating doctor:', error);
        throw error; // Re-throw the error to handle it in the component
    }
};