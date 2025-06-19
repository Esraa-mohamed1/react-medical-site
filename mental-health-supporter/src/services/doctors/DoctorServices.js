import { getData, patchData } from '../api';

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
        // ignore saving academic_degree_document as it's not maintained on the profile for now
        const { academic_degree_document, ...restDoctorData } = doctorData;
        const updatedDoctor = await patchData(`/medical/doctors/${doctorId}/update/`, restDoctorData);
        return updatedDoctor;
    } catch (error) {
        console.error('Error updating doctor:', error);
        throw error; // Re-throw the error to handle it in the component
    }
};