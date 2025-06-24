import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoctorById, updateDoctor } from './../services/doctors/DoctorServices';
import doctorPlaceholder from './../components/DoctorsListComponent/images/doctor-placeholder.jpg';
import doctorImage from './../components/DoctorsListComponent/images/doctor.png';
// import AppointmentBooking from '../components/DoctorProfile/AppointmentBooking';
import CustomNavbar from './../components/Navbar';
import './DoctorDetailsPage.css';

const DoctorDetailsPage = () => {
    const nonEditableFields = ['email'];
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDoctor, setEditedDoctor] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isHoveringImage, setIsHoveringImage] = useState(false);
    const { id } = useParams();
    const userRole = JSON.parse(localStorage.getItem('loggedUser'))['role'];

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const data = await getDoctorById(id);
                if (!data || Object.keys(data).length === 0) {
                    setError('No doctor data found.');
                    setDoctor(null);
                    setEditedDoctor(null);
                    return;
                }
                setDoctor(data);
                setEditedDoctor(data);
                setImagePreview(null);
            } catch (err) {
                setError('Failed to fetch doctor details');
            } finally {
                setLoading(false);
            }
        };
        fetchDoctorDetails();
    }, [id]);

    const handleEdit = () => setIsEditing(true);

    const handleSave = async () => {
        try {
            const updatedData = await updateDoctor(id, editedDoctor);
            setDoctor(updatedData);
            setIsEditing(false);
            setImagePreview(null);
        } catch (err) {
            setError('Failed to update doctor details');
        }
    };

    const handleCancel = () => {
        setEditedDoctor(doctor);
        setIsEditing(false);
        setError(null);
        setImagePreview(null);
    };

    const handleChange = (field, value) => {
        setEditedDoctor(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedDoctor(prev => ({ ...prev, profile_image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!doctor) return <div className="notFound">Doctor not found</div>;

    const renderValue = (field, label) => {
        if (isEditing && !nonEditableFields.includes(field)) {
            return (
                <input
                    type="text"
                    value={editedDoctor[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="editInput"
                    placeholder={label}
                />
            );
        }
        return <span className="value">{doctor[field]}</span>;
    };

    const profileImageSrc = imagePreview
        ? imagePreview
        : (doctor.profile_image || doctorImage || doctorPlaceholder);

    return (
        <>
            <CustomNavbar />
            <div className="doctorDetailsPage">
                <div className="doctorDetailsContainer">
                    <div className="headerContainer">
                        {userRole === 'doctor' && (
                            <div className="buttonContainer">
                                {isEditing && (
                                    <button onClick={handleCancel} className="cancelButton">❎</button>
                                )}
                                <button
                                    onClick={isEditing ? handleSave : handleEdit}
                                    className="actionButton"
                                >
                                    {isEditing ? '✅' : '🖍️'}
                                </button>
                            </div>
                        )}
                        <div className="doctorHeader">
                            <div className="doctorProfile">
                                <div
                                    className="imageContainer"
                                    onMouseEnter={() => setIsHoveringImage(true)}
                                    onMouseLeave={() => setIsHoveringImage(false)}
                                >
                                    {isEditing ? (
                                        <>
                                            <label htmlFor="doctor-image-upload" style={{ cursor: 'pointer', position: 'relative' }}>
                                                <img src={profileImageSrc} alt={editedDoctor.full_name} className="doctorImage" />
                                                <div className={`changePhotoOverlay ${isHoveringImage ? 'imageContainerHover' : ''}`}>
                                                    <span className="cameraIcon">📷</span>
                                                    <span>Change Photo</span>
                                                </div>
                                            </label>
                                            <input
                                                id="doctor-image-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                style={{ display: 'none' }}
                                            />
                                        </>
                                    ) : (
                                        <img src={profileImageSrc} alt={doctor.full_name} className="doctorImage" />
                                    )}
                                </div>
                                <div className="doctorBasicInfo">
                                    <h1 className="title">{renderValue('full_name', 'Full Name')}</h1>
                                    <h2 className="subtitle">{renderValue('specialization', 'Specialization')}</h2>
                                    <div className="availabilityBadge">
                                        {isEditing ? (
                                            <select
                                                value={editedDoctor.available}
                                                onChange={(e) => handleChange('available', e.target.value === 'true')}
                                                className="editInput"
                                            >
                                                <option value={true}>Available</option>
                                                <option value={false}>Unavailable</option>
                                            </select>
                                        ) : (
                                            <span className={`status ${doctor.available ? 'available' : 'unavailable'}`}>
                                                {doctor.available ? 'Available' : 'Unavailable'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="doctorContent">
                        <div className="infoSection">
                            <h3 className="sectionTitle">Contact Information</h3>
                            <div className="infoGrid">
                                <div className="infoItem">
                                    <span className="label">Email:</span>
                                    {renderValue('email', 'Email')}
                                </div>
                                <div className="infoItem">
                                    <span className="label">Phone:</span>
                                    {renderValue('phone', 'Phone')}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="infoSection">
                                <h3 className="sectionTitle">Clinic Details</h3>
                                <div className="infoGrid">
                                    <div className="infoItem">
                                        <span className="label">Clinic Name:</span>
                                        {renderValue('clinic_name', 'Clinic Name')}
                                    </div>
                                    <div className="infoItem">
                                        <span className="label">City:</span>
                                        {renderValue('city', 'City')}
                                    </div>
                                    <div className="infoItem">
                                        <span className="label">Address:</span>
                                        {renderValue('clinic_address', 'Clinic Address')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <button onClick={handleCancel} className="saveButton" style={{ backgroundColor: '#dc3545' }}>Cancel</button>
                                <button onClick={handleSave} className="saveButton">Save Changes</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorDetailsPage;
