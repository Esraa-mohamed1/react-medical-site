import { getData } from '../api';

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