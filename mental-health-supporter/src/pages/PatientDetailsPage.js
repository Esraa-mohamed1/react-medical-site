import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientById, updatePatient } from './../services/patients/PatientServices';
import patientPlaceholder from './../components/DoctorsListComponent/images/doctor-placeholder.jpg';
import CustomNavbar from './../components/Navbar';

const styles = {
    container: {
        padding: '2rem',
        backgroundColor: '#f0f7ff',
        minHeight: '100vh'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(149, 157, 165, 0.2)',
        overflow: 'hidden',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    header: {
        background: 'linear-gradient(135deg, #6B8DD6 0%, #8E37D7 100%)',
        color: 'white',
        padding: '2.5rem',
        position: 'relative'
    },
    profileSection: {
        display: 'flex',
        gap: '2.5rem',
        alignItems: 'center'
    },
    avatar: {
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        border: '4px solid rgba(255, 255, 255, 0.3)',
        objectFit: 'cover'
    },
    profileInfo: {
        flex: 1
    },
    name: {
        fontSize: '2.5rem',
        fontWeight: '700',
        margin: '0 0 0.5rem 0'
    },
    id: {
        fontSize: '1rem',
        opacity: '0.9',
        fontWeight: '500'
    },
    created: {
        fontSize: '0.875rem',
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: '0.5rem'
    },
    mainContent: {
        padding: '2rem'
    },
    section: {
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem'
    },
    sectionTitle: {
        fontSize: '1.25rem',
        color: '#1e293b',
        fontWeight: '600',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
    },
    field: {
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    label: {
        color: '#64748b',
        fontSize: '0.875rem',
        marginBottom: '0.5rem'
    },
    value: {
        color: '#0f172a',
        fontSize: '1rem',
        fontWeight: '500'
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '6px',
        border: '1px solid #cbd5e1',
        fontSize: '1rem',
        transition: 'border-color 0.2s',
        '&:focus': {
            borderColor: '#6B8DD6',
            outline: 'none'
        }
    },
    buttonsContainer: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        display: 'flex',
        gap: '0.5rem'
    },
    button: {
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'all 0.2s'
    },
    editButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }
    },
    saveButton: {
        backgroundColor: '#10b981',
        color: 'white',
        '&:hover': {
            backgroundColor: '#059669'
        }
    },
    cancelButton: {
        backgroundColor: '#ef4444',
        color: 'white',
        '&:hover': {
            backgroundColor: '#dc2626'
        }
    },
    backButton: {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }
    },
    imageInput: {
        marginTop: '1rem',
        width: '100%',
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        fontSize: '0.875rem'
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
    },
    showDoctorsButton: {
        backgroundColor: '#4f46e5',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        marginLeft: '1rem',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: '#4338ca'
        }
    }
};

const PatientDetailsPage = () => {
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [editedPatient, setEditedPatient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // For local preview
    const { id } = useParams();

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const data = await getPatientById(id);
                setPatient(data);
                setEditedPatient(data);
                setImagePreview(null);
            } catch (err) {
                setError('Failed to fetch patient details');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPatientDetails();
    }, [id]);

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => {
        setEditedPatient(patient);
        setIsEditing(false);
        setImagePreview(null);
    };

    const handleSave = async () => {
        try {
            const updatedData = await updatePatient(id, editedPatient);
            setPatient(updatedData);
            setIsEditing(false);
            setImagePreview(null);
        } catch (err) {
            setError('Failed to update patient details');
        }
    };

    const handleChange = (field, value) => {
        setEditedPatient(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle file input change for profile_image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedPatient(prev => ({
                ...prev,
                profile_image: file
            }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
    if (error) return <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>{error}</div>;
    if (!patient) return <div style={{ textAlign: 'center', padding: '2rem' }}>Patient not found</div>;

    const renderField = (label, field, type = 'text', editable = true) => (
        <div style={styles.field}>
            <div style={styles.label}>{label}</div>
            {isEditing && editable ? (
                <input
                    type={type}
                    value={editedPatient[field] || ''}
                    onChange={(e) => handleChange(field, e.target.value)}
                    style={styles.input}
                />
            ) : (
                <div style={styles.value}>
                    {field === 'created_at'
                        ? new Date(patient[field]).toLocaleDateString()
                        : patient[field]
                    }
                </div>
            )}
        </div>
    );

    // Use imagePreview if available, otherwise use patient.profile_image or placeholder
    const profileImageSrc = imagePreview
        ? imagePreview
        : (patient.profile_image || patientPlaceholder);

    return (
        <>
            <CustomNavbar />
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <div style={styles.buttonsContainer}>
                            {isEditing ? (
                                <>
                                    <button onClick={handleCancel} style={{ ...styles.button, ...styles.cancelButton }}>
                                        Cancel
                                    </button>
                                    <button onClick={handleSave} style={{ ...styles.button, ...styles.saveButton }}>
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleEdit} style={{ ...styles.button, ...styles.editButton }}>
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={() => navigate('/doctors-list')}
                                        style={{ ...styles.button, ...styles.showDoctorsButton }}
                                    >
                                        Show All Doctors
                                    </button>
                                </>
                            )}
                        </div>
                        <div style={styles.profileSection}>
                            <div style={styles.imageContainer}>
                                <img
                                    src={profileImageSrc}
                                    alt={patient.full_name}
                                    style={styles.avatar}
                                />
                                {isEditing && (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={styles.imageInput}
                                    />
                                )}
                            </div>
                            <div style={styles.profileInfo}>
                                <h1 style={styles.name}>{patient.full_name}</h1>
                                <div style={styles.created}>
                                    Member since: {new Date(patient.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.mainContent}>
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>👤 Basic Information</h2>
                            <div style={styles.grid}>
                                {renderField('Full Name', 'full_name')}
                                {renderField('Member Since', 'created_at', 'datetime-local', false)}
                            </div>
                        </div>

                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>📞 Contact Information</h2>
                            <div style={styles.grid}>
                                {renderField('Email', 'email', 'email')}
                                {renderField('Phone', 'phone')}
                                {renderField('Address', 'address')}
                                {renderField('City', 'city')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientDetailsPage;