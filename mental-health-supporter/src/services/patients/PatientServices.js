import { getData, updateData } from '../api';

export const getPatients = async () => {
    try {
        const doctors = await getData('/medical/patients/');
        return doctors;
    } catch (error) {
        console.error('Error fetching patients:', error);
        return [];
    }
};

// If you need to get a specific doctor by ID
export const getPatientById = async (patientId) => {
    try {
        const doctor = await getData(`/medical/patients/${patientId}/`);
        return doctor;
    } catch (error) {
        console.error('Error fetching patient:', error);
        return null;
    }
};

// Add this new function to update a doctor
export const updatePatient = async (patientId, doctorData) => {
    try {
        const updatedDoctor = await updateData(`/medical/patients/${patientId}/update/`, doctorData);
        return updatedDoctor;
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error; // Re-throw the error to handle it in the component
    }
};