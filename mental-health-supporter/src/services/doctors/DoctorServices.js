import { getData, updateData } from '../api';

export const getDoctors = async (queryParms = "") => {
    try {
        const doctors = await getData('/medical/doctors/' + queryParms);
        return doctors;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return [];
    }
};

// If you need to get a specific doctor by ID
export const getDoctorById = async (doctorId) => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const role = loggedUser?.role;
    let endpoint = `/medical/doctors/${doctorId}/`;
    // Always try /users/doctors/<id>/ first for doctors, fallback to /medical/doctors/<id>/ if not found
    if (role === 'doctor') {
        try {
            const doctor = await getData(`/users/doctors/${doctorId}/`);
            if (doctor && doctor.doctor_id) return doctor;
        } catch (err) {
            // fallback below
        }
    }
    try {
        const doctor = await getData(endpoint);
        return doctor;
    } catch (error) {
        console.error('Error fetching doctor:', error);
        return null;
    }
};

// Update doctor using FormData for file upload
export const updateDoctor = async (doctorId, doctorData) => {
    try {
        // ignore saving academic_degree_document as it's not maintained on the profile for now
        const { academic_degree_document, ...restDoctorData } = doctorData;
        const formData = new FormData();
        for (const key in restDoctorData) {
            if (restDoctorData[key] !== undefined && restDoctorData[key] !== null) {
                // If profile_image is a File, append it, otherwise skip if it's not a file
                if (key === 'profile_image' && restDoctorData[key] instanceof File) {
                    formData.append('profile_image', restDoctorData[key]);
                } else if (key !== 'profile_image') {
                    formData.append(key, restDoctorData[key]);
                }
            }
        }
        const updatedDoctor = await updateData(
            `/medical/doctors/${doctorId}/update/`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return updatedDoctor;
    } catch (error) {
        console.error('Error updating doctor:', error);
        throw error; // Re-throw the error to handle it in the component
    }
};