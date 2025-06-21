import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPatientById, updatePatient } from '../services/patients/PatientServices';
import patientPlaceholder from '../components/DoctorsListComponent/images/doctor-placeholder.jpg';
import CustomNavbar from '../components/Navbar';

// Enhanced professional styling
let styles = {
    container: {
        padding: '2rem',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
        fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", sans-serif'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        maxWidth: '1200px',
        margin: '0 auto',
        transition: 'box-shadow 0.3s ease',
        ':hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
        }
    },
    header: {
        background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
        color: 'white',
        padding: '2.5rem',
        position: 'relative'
    },
    profileSection: {
        display: 'flex',
        gap: '2.5rem',
        alignItems: 'center',
        '@media (max-width: 768px)': {
            flexDirection: 'column',
            textAlign: 'center',
            gap: '1.5rem'
        }
    },
    avatar: {
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        border: '4px solid rgba(255, 255, 255, 0.3)',
        objectFit: 'cover',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
        ':hover': {
            transform: 'scale(1.03)'
        }
    },
    profileInfo: {
        flex: 1
    },
    name: {
        fontSize: '2rem',
        fontWeight: '600',
        margin: '0 0 0.5rem 0',
        letterSpacing: '0.5px'
    },
    created: {
        fontSize: '0.875rem',
        color: 'rgba(255, 255, 255, 0.85)',
        marginTop: '0.5rem',
        fontWeight: '400'
    },
    mainContent: {
        padding: '2rem'
    },
    section: {
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '1.75rem',
        marginBottom: '1.75rem',
        border: '1px solid #e2e8f0'
    },
    sectionTitle: {
        fontSize: '1.25rem',
        color: '#1e293b',
        fontWeight: '600',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        letterSpacing: '0.3px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
    },
    field: {
        backgroundColor: 'white',
        padding: '1.25rem',
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        border: '1px solid #edf2f7',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
        }
    },
    label: {
        color: '#64748b',
        fontSize: '0.8125rem',
        marginBottom: '0.5rem',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    value: {
        color: '#0f172a',
        fontSize: '1rem',
        fontWeight: '500',
        lineHeight: '1.5'
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        fontSize: '1rem',
        transition: 'all 0.2s ease',
        backgroundColor: '#f8fafc',
        ':focus': {
            borderColor: '#3a7bd5',
            outline: 'none',
            boxShadow: '0 0 0 3px rgba(58, 123, 213, 0.1)',
            backgroundColor: 'white'
        }
    },
    buttonsContainer: {
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        display: 'flex',
        gap: '0.75rem'
    },
    button: {
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '600',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        letterSpacing: '0.5px'
    },
    editButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        color: 'white',
        backdropFilter: 'blur(5px)',
        ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.25)'
        }
    },
    saveButton: {
        backgroundColor: '#10b981',
        color: 'white',
        ':hover': {
            backgroundColor: '#0d9f6e',
            transform: 'translateY(-1px)'
        }
    },
    cancelButton: {
        backgroundColor: '#ef4444',
        color: 'white',
        ':hover': {
            backgroundColor: '#dc2626',
            transform: 'translateY(-1px)'
        }
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
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.5)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        fontSize: '0.9rem',
        zIndex: 2,
        ':hover': {
            opacity: 1
        }
    },
    cameraIcon: {
        fontSize: '1.75rem',
        marginBottom: '0.25rem'
    },
    loadingMessage: {
        textAlign: 'center',
        padding: '3rem',
        color: '#64748b',
        fontSize: '1.1rem'
    },
    errorMessage: {
        textAlign: 'center',
        padding: '3rem',
        color: '#ef4444',
        fontSize: '1.1rem',
        fontWeight: '500'
    }
};

const PatientDetailsPage = () => {
    const { t, i18n } = useTranslation();
    const [patient, setPatient] = useState(null);
    const [editedPatient, setEditedPatient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const { id } = useParams();

    const changeStylesDirection = (styles) => {
        if (i18n.language === 'ar') {
            return {
                ...styles,
                buttonsContainer: {
                    position: 'absolute',
                    top: '1.5rem',
                    left: '1.5rem',
                    display: 'flex',
                    gap: '0.75rem'
                },
            }
        }

        return {
            ...styles,
            buttonsContainer: {
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                display: 'flex',
                gap: '0.75rem'
            },
        }
    }

    const fetchPatientDetails = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getPatientById(id);
            setPatient(data);
            setEditedPatient(data);
            setImagePreview(null);
        } catch (err) {
            setError(t('patient.fetchError'));
            console.error('Error fetching patient:', err);
        } finally {
            setLoading(false);
        }
    }, [id, t]);

    useEffect(() => {
        fetchPatientDetails();
    }, [fetchPatientDetails]);

    const handleEdit = () => setIsEditing(true);

    const handleCancel = () => {
        setEditedPatient(patient);
        setIsEditing(false);
        setImagePreview(null);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const updatedData = await updatePatient(id, editedPatient);
            setPatient(updatedData);
            setIsEditing(false);
            setImagePreview(null);
        } catch (err) {
            setError(t('patient.updateError'));
            console.error('Error updating patient:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setEditedPatient(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedPatient(prev => ({ ...prev, profile_image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const renderField = (label, field, type = 'text', editable = true) => (
        <div style={styles.field}>
            <div style={styles.label}>{t(label)}</div>
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
                        : patient[field] || '-'}
                </div>
            )}
        </div>
    );

    if (loading) return <div style={styles.loadingMessage}>{t('patient.loading')}</div>;
    if (error) return <div style={styles.errorMessage}>{error}</div>;
    if (!patient) return <div style={styles.loadingMessage}>{t('patient.notFound')}</div>;

    const profileImageSrc = imagePreview || patient.profile_image || patientPlaceholder;

    // change direction of styles
    styles = changeStylesDirection(styles);

    return (
        <>
            <CustomNavbar />
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <div style={styles.buttonsContainer}>
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleCancel}
                                        style={{ ...styles.button, ...styles.cancelButton }}
                                    >
                                        {t('patient.cancel')}
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        style={{ ...styles.button, ...styles.saveButton }}
                                    >
                                        {t('patient.save')}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleEdit}
                                    style={{ ...styles.button, ...styles.editButton }}
                                >
                                    {t('patient.edit')}
                                </button>
                            )}
                        </div>

                        <div style={styles.profileSection}>
                            <div style={styles.imageContainer}>
                                {isEditing ? (
                                    <>
                                        <label htmlFor="profile-image-upload" style={{ cursor: 'pointer', position: 'relative' }}>
                                            <img
                                                src={profileImageSrc}
                                                alt={patient.full_name}
                                                style={styles.avatar}
                                            />
                                            <div style={styles.changePhotoOverlay}>
                                                <span style={styles.cameraIcon}>📷</span>
                                                <span>{t('patient.changePhoto')}</span>
                                            </div>
                                        </label>
                                        <input
                                            id="profile-image-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                        />
                                    </>
                                ) : (
                                    <img
                                        src={profileImageSrc}
                                        alt={patient.full_name}
                                        style={styles.avatar}
                                    />
                                )}
                            </div>

                            <div style={styles.profileInfo}>
                                <h1 style={styles.name}>{patient.full_name}</h1>
                                <div style={styles.created}>
                                    {t('patient.memberSince')}: {new Date(patient.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.mainContent}>
                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>👤 {t('patient.basicInfo')}</h2>
                            <div style={styles.grid}>
                                {renderField('patient.fullName', 'full_name')}
                                {renderField('patient.memberSince', 'created_at', 'datetime-local', false)}
                            </div>
                        </div>

                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>📞 {t('patient.contactInfo')}</h2>
                            <div style={styles.grid}>
                                {renderField('patient.email', 'email', 'email')}
                                {renderField('patient.phone', 'phone')}
                                {renderField('patient.address', 'address')}
                                {renderField('patient.city', 'city')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientDetailsPage;