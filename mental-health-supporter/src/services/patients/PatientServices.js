import { getData, patchData } from '../api';

export const getPatients = async () => {
    try {
        const doctors = await getData('/medical/patients/');
        return doctors;
    } catch (error) {
        console.error('Error fetching patients:', error);
        return [];
    }
};

export const getPatientById = async (patientId) => {
    try {
        const doctor = await getData(`/medical/patients/${patientId}/`);
        return doctor;
    } catch (error) {
        console.error('Error fetching patient:', error);
        return null;
    }
};

// Update patient using FormData for file upload
export const updatePatient = async (patientId, patientData) => {
    try {
        const formData = new FormData();
        for (const key in patientData) {
            if (patientData[key] !== undefined && patientData[key] !== null) {
                // If profile_image is a File, append it, otherwise skip if it's not a file
                if (key === 'profile_image' && patientData[key] instanceof File) {
                    formData.append('profile_image', patientData[key]);
                } else if (key !== 'profile_image') {
                    formData.append(key, patientData[key]);
                }
            }
        }
        const updatedPatient = await patchData(
            `/medical/patients/${patientId}/update/`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return updatedPatient;
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
};