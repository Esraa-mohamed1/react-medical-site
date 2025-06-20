import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoctorById, updateDoctor } from './../services/doctors/DoctorServices';
import doctorPlaceholder from './../components/DoctorsListComponent/images/doctor-placeholder.jpg';
import doctorImage from './../components/DoctorsListComponent/images/doctor.png';
import AppointmentBooking from '../components/DoctorProfile/AppointmentBooking';
import CustomNavbar from './../components/Navbar';

const additionalStyles = {
    editButton: {
        position: 'absolute',
        top: '2rem',
        right: '2rem',
        padding: '0.75rem',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1.2rem',
        color: '#333',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    editInput: {
        width: '100%',
        padding: '0.5rem',
        fontSize: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginTop: '0.5rem',
    },
    saveButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '1rem',
        fontSize: '1rem',
    },
    buttonContainer: {
        position: 'absolute',
        top: '2rem',
        right: '2rem',
        display: 'flex',
        gap: '1rem'
    },
    cancelButton: {
        padding: '0.75rem',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1.2rem',
        color: '#dc3545',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    actionButton: {
        padding: '0.75rem',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1.2rem',
        color: '#333',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    }
};

const styles = {
    ...additionalStyles,
    doctorDetailsPage: {
        padding: '2rem',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
    },
    doctorDetailsContainer: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        margin: '0 auto',
        width: '100%'
    },
    doctorHeader: {
        backgroundColor: '#ffffff',
        padding: '3rem',
        borderBottom: '1px solid #e9ecef',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    },
    doctorProfile: {
        display: 'flex',
        gap: '3rem',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
    },
    doctorContent: {
        padding: '3rem',
        maxWidth: '1400px',
        margin: '0 auto'
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        width: '100%'
    },
    infoSection: {
        marginBottom: '3rem',
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    mapContainer: {
        height: '400px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    sectionTitle: {
        color: '#333',
        marginBottom: '1.5rem',
        paddingBottom: '0.75rem',
        borderBottom: '2px solid #f0f0f0',
        fontSize: '1.5rem',
        fontWeight: '600'
    },
    doctorImage: {
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '6px solid white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
    },
    title: {
        margin: 0,
        color: '#2d3748',
        fontSize: '2.5rem',
        fontWeight: '700'
    },
    subtitle: {
        margin: '0.75rem 0',
        color: '#4a5568',
        fontSize: '1.4rem',
        fontWeight: '500'
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        transition: 'transform 0.2s',
        ':hover': {
            transform: 'translateY(-2px)'
        }
    },
    label: {
        color: '#666',
        fontSize: '0.9rem'
    },
    value: {
        color: '#2d3748',
        fontSize: '1.2rem',
        fontWeight: '500'
    },
    availabilityBadge: {
        marginTop: '1rem'
    },
    status: {
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        fontSize: '0.9rem',
        fontWeight: 500
    },
    available: {
        backgroundColor: '#e7f5ea',
        color: '#0a8528'
    },
    unavailable: {
        backgroundColor: '#fee7e7',
        color: '#d32f2f'
    },
    loading: {
        textAlign: 'center',
        padding: '2rem',
        fontSize: '1.2rem',
        color: '#666'
    },
    error: {
        textAlign: 'center',
        padding: '2rem',
        fontSize: '1.2rem',
        color: '#d32f2f'
    },
    notFound: {
        textAlign: 'center',
        padding: '2rem',
        fontSize: '1.2rem',
        color: '#666'
    },
    backButton: {
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1rem',
        color: '#333',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        ':hover': {
            backgroundColor: '#f8f9fa',
            transform: 'translateY(-1px)'
        }
    },
    headerContainer: {
        position: 'relative',
        width: '100%'
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        position: 'relative'
    },
    changePhotoOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.45)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        transition: 'opacity 0.2s',
        cursor: 'pointer',
        fontSize: '1.1rem',
        zIndex: 2
    },
    imageContainerHover: {
        opacity: 1
    },
    cameraIcon: {
        fontSize: '2rem',
        marginBottom: '0.3rem'
    },
};

const DoctorDetailsPage = () => {
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDoctor, setEditedDoctor] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isHoveringImage, setIsHoveringImage] = useState(false);
    const { id } = useParams();
    const userRole = JSON.parse(localStorage.getItem('loggedUser'))['role']

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                console.log('Fetching doctor with id:', id); // Debug: log id
                const data = await getDoctorById(id);
                console.log('Fetched doctor data:', data); // Debug: log data
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
                console.error('Error:', err);
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
            console.error('Error:', err);
        }
    };

    const handleCancel = () => {
        setEditedDoctor(doctor);
        setIsEditing(false);
        setError(null);
        setImagePreview(null);
    };

    const handleChange = (field, value) => {
        setEditedDoctor(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle file input change for profile_image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedDoctor(prev => ({
                ...prev,
                profile_image: file
            }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (error) return <div style={styles.error}>{error}</div>;
    if (!doctor) return <div style={styles.notFound}>Doctor not found</div>;

    const renderValue = (field, label) => {
        if (isEditing) {
            return (
                <input
                    type="text"
                    value={editedDoctor[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    style={styles.editInput}
                    placeholder={label}
                />
            );
        }
        return <span style={styles.value}>{doctor[field]}</span>;
    };

    // Use imagePreview if available, otherwise use doctor.profile_image or placeholder
    const profileImageSrc = imagePreview
        ? imagePreview
        : (doctor.profile_image || doctorImage || doctorPlaceholder);

    return (
        <>
            <CustomNavbar />
            <div style={styles.doctorDetailsPage}>
                <div style={styles.doctorDetailsContainer}>
                    <div style={styles.headerContainer}>
                        {userRole === 'doctor' && (
                            <div style={styles.buttonContainer}>
                                {isEditing && (
                                    <button onClick={handleCancel} style={styles.cancelButton}>
                                        ❌
                                    </button>
                                )}
                                <button
                                    onClick={isEditing ? handleSave : handleEdit}
                                    style={styles.actionButton}
                                >
                                    {isEditing ? '💾' : '✏️'}
                                </button>
                            </div>
                        )}
                        <div style={styles.doctorHeader}>
                            <div style={styles.doctorProfile}>
                                <div
                                    style={styles.imageContainer}
                                    onMouseEnter={() => setIsHoveringImage(true)}
                                    onMouseLeave={() => setIsHoveringImage(false)}
                                >
                                    {isEditing ? (
                                        <>
                                            <label htmlFor="doctor-image-upload" style={{ cursor: 'pointer', position: 'relative' }}>
                                                <img
                                                    src={profileImageSrc}
                                                    alt={editedDoctor.full_name}
                                                    style={styles.doctorImage}
                                                />
                                                <div
                                                    style={{
                                                        ...styles.changePhotoOverlay,
                                                        ...(isHoveringImage ? styles.imageContainerHover : {})
                                                    }}
                                                >
                                                    <span style={styles.cameraIcon}>📷</span>
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
                                        <img
                                            src={profileImageSrc}
                                            alt={doctor.full_name}
                                            style={styles.doctorImage}
                                        />
                                    )}
                                </div>
                                <div style={styles.doctorBasicInfo}>
                                    <h1 style={styles.title}>{renderValue('full_name', 'Full Name')}</h1>
                                    <h2 style={styles.subtitle}>{renderValue('specialization', 'Specialization')}</h2>
                                    <div style={styles.availabilityBadge}>
                                        {isEditing ? (
                                            <select
                                                value={editedDoctor.available}
                                                onChange={(e) => handleChange('available', e.target.value === 'true')}
                                                style={styles.editInput}
                                            >
                                                <option value={true}>Available</option>
                                                <option value={false}>Unavailable</option>
                                            </select>
                                        ) : (
                                            <span style={{
                                                ...styles.status,
                                                ...(doctor.available ? styles.available : styles.unavailable)
                                            }}>
                                                {doctor.available ? 'Available' : 'Unavailable'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.doctorContent}>
                        <div style={styles.infoSection}>
                            <h3 style={styles.sectionTitle}>Contact Information</h3>
                            <div style={styles.infoGrid}>
                                <div style={styles.infoItem}>
                                    <span style={styles.label}>Email:</span>
                                    {renderValue('email', 'Email')}
                                </div>
                                <div style={styles.infoItem}>
                                    <span style={styles.label}>Phone:</span>
                                    {renderValue('phone', 'Phone')}
                                </div>
                            </div>
                        </div>

                        <div style={{ margin: '2rem 0' }}>
                            <h3 style={styles.sectionTitle}>Book Appointment</h3>
                            {doctor && doctor.doctor_id && (
                                <AppointmentBooking doctorId={doctor.doctor_id} />
                            )}
                        </div>

                        {isEditing && (
                            <>
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                    <button
                                        onClick={handleCancel}
                                        style={{ ...styles.saveButton, backgroundColor: '#dc3545' }}
                                    >
                                        Cancel
                                    </button>
                                    <button onClick={handleSave} style={styles.saveButton}>
                                        Save Changes
                                    </button>
                                    <div style={styles.infoSection}>
                                        <h3 style={styles.sectionTitle}>Clinic Details</h3>
                                        <div style={styles.infoGrid}>
                                            <div style={styles.infoItem}>
                                                <span style={styles.label}>Clinic Name:</span>
                                                {renderValue('clinic_name', 'Clinic Name')}
                                            </div>
                                            <div style={styles.infoItem}>
                                                <span style={styles.label}>City:</span>
                                                {renderValue('city', 'City')}
                                            </div>
                                            <div style={styles.infoItem}>
                                                <span style={styles.label}>Address:</span>
                                                {renderValue('clinic_address', 'Clinic Address')}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                    <button
                                        onClick={handleCancel}
                                        style={{ ...styles.saveButton, backgroundColor: '#dc3545' }}
                                    >
                                        Cancel
                                    </button>
                                    <button onClick={handleSave} style={styles.saveButton}>
                                        Save Changes
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorDetailsPage;