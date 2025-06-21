import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoctorById, updateDoctor } from '../services/doctors/DoctorServices';
import doctorPlaceholder from '../components/DoctorsListComponent/images/doctor-placeholder.jpg';
import doctorImage from '../components/DoctorsListComponent/images/doctor.png';
import AppointmentBooking from '../components/DoctorProfile/AppointmentBooking';
import CustomNavbar from '../components/Navbar';
import { useTranslation, withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Constants for colors and styles
const COLORS = {
    primaryBlue: '#007bff',
    lightBlue: '#e7f0fd',
    deepBlueText: '#004085',
    success: '#155724',
    danger: '#dc3545',
    warning: '#856404',
    info: '#0c5460',
    white: '#ffffff',
    lightGray: '#f8f9fa',
};

const BASE_STYLES = {
    borderRadius: {
        small: '4px',
        medium: '8px',
        large: '12px',
        circle: '50%',
    },
    padding: {
        small: '0.5rem',
        medium: '0.75rem',
        large: '1rem',
        xlarge: '1.5rem',
    },
    fontSize: {
        small: '0.9rem',
        medium: '1rem',
        large: '1.2rem',
        xlarge: '1.5rem',
        xxlarge: '2.5rem',
    },
    shadow: {
        small: '0 2px 4px rgba(0, 0, 0, 0.05)',
        medium: '0 2px 6px rgba(0, 123, 255, 0.2)',
        large: '0 4px 12px rgba(0, 123, 255, 0.1)',
    },
    transition: 'all 0.2s ease',
};

const getStyles = () => ({
    // Layout styles
    page: {
        padding: BASE_STYLES.padding.xlarge,
        width: '100%',
        minHeight: '100vh',
        backgroundColor: COLORS.lightBlue,
    },
    container: {
        backgroundColor: COLORS.white,
        borderRadius: BASE_STYLES.borderRadius.large,
        boxShadow: BASE_STYLES.shadow.large,
        overflow: 'hidden',
        margin: '0 auto',
        width: '100%',
    },
    header: {
        padding: BASE_STYLES.padding.xlarge,
        borderBottom: '1px solid #dee2e6',
        background: 'linear-gradient(135deg, #f0f7ff 0%, #d0e7fb 100%)',
    },
    content: {
        padding: BASE_STYLES.padding.xlarge,
        maxWidth: '1400px',
        margin: '0 auto',
    },
    profileContainer: {
        display: 'flex',
        gap: '3rem',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
        '@media (max-width: 768px)': {
            flexDirection: 'column',
            gap: '1.5rem',
        },
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        width: '100%',
    },
    section: {
        marginBottom: '3rem',
        backgroundColor: COLORS.white,
        padding: BASE_STYLES.padding.xlarge,
        borderRadius: BASE_STYLES.borderRadius.medium,
        boxShadow: BASE_STYLES.shadow.medium,
    },
    mapContainer: {
        height: '400px',
        backgroundColor: COLORS.white,
        borderRadius: BASE_STYLES.borderRadius.medium,
        overflow: 'hidden',
        boxShadow: BASE_STYLES.shadow.medium,
    },

    // Typography styles
    title: {
        margin: 0,
        color: COLORS.deepBlueText,
        fontSize: BASE_STYLES.fontSize.xxlarge,
        fontWeight: '700',
    },
    subtitle: {
        margin: '0.75rem 0',
        color: '#2b4f81',
        fontSize: BASE_STYLES.fontSize.xlarge,
        fontWeight: '500',
    },
    sectionTitle: {
        color: COLORS.deepBlueText,
        marginBottom: '1.5rem',
        paddingBottom: BASE_STYLES.padding.medium,
        borderBottom: `2px solid ${COLORS.lightBlue}`,
        fontSize: BASE_STYLES.fontSize.xlarge,
        fontWeight: '600',
    },
    label: {
        color: '#4d6fa5',
        fontSize: BASE_STYLES.fontSize.small,
    },
    value: {
        color: COLORS.deepBlueText,
        fontSize: BASE_STYLES.fontSize.large,
        fontWeight: '500',
    },

    // Component styles
    doctorImage: {
        width: '250px',
        height: '250px',
        borderRadius: BASE_STYLES.borderRadius.circle,
        objectFit: 'cover',
        border: `6px solid ${COLORS.primaryBlue}`,
        boxShadow: '0 4px 10px rgba(0, 123, 255, 0.3)',
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: BASE_STYLES.padding.medium,
        padding: BASE_STYLES.padding.large,
        backgroundColor: '#f0f7ff',
        borderRadius: BASE_STYLES.borderRadius.small,
        transition: 'transform 0.2s',
        ':hover': {
            transform: 'translateY(-2px)',
        },
    },
    statusBadge: {
        padding: BASE_STYLES.padding.small,
        borderRadius: '20px',
        fontSize: BASE_STYLES.fontSize.small,
        fontWeight: 500,
    },
    available: {
        backgroundColor: '#d1ecf1',
        color: COLORS.success,
    },
    unavailable: {
        backgroundColor: '#f8d7da',
        color: COLORS.danger,
    },

    // Button styles
    buttonContainer: {
        position: 'absolute',
        top: '2rem',
        right: '2rem',
        display: 'flex',
        gap: '1rem',
    },
    actionButton: {
        padding: BASE_STYLES.padding.medium,
        backgroundColor: COLORS.white,
        border: `1px solid ${COLORS.primaryBlue}`,
        borderRadius: BASE_STYLES.borderRadius.medium,
        cursor: 'pointer',
        fontSize: BASE_STYLES.fontSize.large,
        color: COLORS.primaryBlue,
        transition: BASE_STYLES.transition,
        boxShadow: BASE_STYLES.shadow.medium,
    },
    saveButton: {
        padding: `${BASE_STYLES.padding.medium} ${BASE_STYLES.padding.xlarge}`,
        backgroundColor: COLORS.primaryBlue,
        color: COLORS.white,
        border: 'none',
        borderRadius: BASE_STYLES.borderRadius.medium,
        cursor: 'pointer',
        marginTop: BASE_STYLES.padding.large,
        fontSize: BASE_STYLES.fontSize.medium,
        transition: BASE_STYLES.transition,
        ':hover': {
            opacity: 0.9,
        },
    },
    cancelButton: {
        padding: `${BASE_STYLES.padding.medium} ${BASE_STYLES.padding.xlarge}`,
        backgroundColor: COLORS.white,
        border: `1px solid ${COLORS.danger}`,
        borderRadius: BASE_STYLES.borderRadius.medium,
        cursor: 'pointer',
        fontSize: BASE_STYLES.fontSize.medium,
        color: COLORS.danger,
        transition: BASE_STYLES.transition,
        ':hover': {
            backgroundColor: '#f8d7da',
        },
    },

    // Form styles
    editInput: {
        width: '100%',
        padding: BASE_STYLES.padding.small,
        fontSize: BASE_STYLES.fontSize.medium,
        border: `1px solid ${COLORS.primaryBlue}`,
        borderRadius: BASE_STYLES.borderRadius.small,
        marginTop: BASE_STYLES.padding.small,
    },

    // Image upload styles
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: BASE_STYLES.padding.large,
        position: 'relative',
    },
    changePhotoOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '250px',
        height: '250px',
        borderRadius: BASE_STYLES.borderRadius.circle,
        background: 'rgba(0,0,0,0.45)',
        color: COLORS.white,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        transition: 'opacity 0.2s',
        cursor: 'pointer',
        fontSize: BASE_STYLES.fontSize.large,
        zIndex: 2,
    },
    imageContainerHover: {
        opacity: 1,
    },
    cameraIcon: {
        fontSize: BASE_STYLES.fontSize.xxlarge,
        marginBottom: '0.3rem',
    },

    // Status styles
    loading: {
        textAlign: 'center',
        padding: BASE_STYLES.padding.xlarge,
        fontSize: BASE_STYLES.fontSize.large,
        color: '#6c757d',
    },
    error: {
        textAlign: 'center',
        padding: BASE_STYLES.padding.xlarge,
        fontSize: BASE_STYLES.fontSize.large,
        color: COLORS.danger,
    },
    notFound: {
        textAlign: 'center',
        padding: BASE_STYLES.padding.xlarge,
        fontSize: BASE_STYLES.fontSize.large,
        color: '#6c757d',
    },
});

const DoctorDetailsPage = ({ t }) => {
    const styles = getStyles();
    const [language, setLanguage] = useState('en');
    const { i18n } = useTranslation();

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDoctor, setEditedDoctor] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isHoveringImage, setIsHoveringImage] = useState(false);

    const { id } = useParams();
    const userRole = JSON.parse(localStorage.getItem('loggedUser'))?.role || '';

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLanguage(lng);
        document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
    };

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
                setEditedDoctor({ ...data });
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
        setEditedDoctor({ ...doctor });
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

    const renderValue = (field, label) => {
        if (isEditing) {
            return (
                <input
                    type="text"
                    value={editedDoctor[field] || ''}
                    onChange={(e) => handleChange(field, e.target.value)}
                    style={styles.editInput}
                    placeholder={t(`doctorDetails.${label}`)}
                />
            );
        }
        return <span style={styles.value}>{doctor[field] || t('doctorDetails.notSpecified')}</span>;
    };

    const renderStatusBadge = () => {
        if (isEditing) {
            return (
                <select
                    value={editedDoctor.available}
                    onChange={(e) => handleChange('available', e.target.value === 'true')}
                    style={styles.editInput}
                >
                    <option value={true}>{t('doctorDetails.available')}</option>
                    <option value={false}>{t('doctorDetails.unavailable')}</option>
                </select>
            );
        }

        return (
            <span style={{
                ...styles.statusBadge,
                ...(doctor.available ? styles.available : styles.unavailable)
            }}>
                {doctor.available ? t('doctorDetails.available') : t('doctorDetails.unavailable')}
            </span>
        );
    };

    const profileImageSrc = imagePreview
        ? imagePreview
        : (doctor?.profile_image || doctorImage || doctorPlaceholder);

    if (loading) return <div style={styles.loading}>{t('doctorDetails.loading')}...</div>;
    if (error) return <div style={styles.error}>{t(error)}</div>;
    if (!doctor) return <div style={styles.notFound}>{t('doctorDetails.doctorNotFound')}</div>;

    return (
        <>
            <CustomNavbar />
            <div style={styles.page}>
                <div style={styles.container}>
                    <div style={{ position: 'relative' }}>
                        {userRole === 'doctor' && (
                            <div style={styles.buttonContainer}>
                                {isEditing && (
                                    <button
                                        onClick={handleCancel}
                                        style={{ ...styles.actionButton, color: COLORS.danger }}
                                    >
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

                        <div style={styles.header}>
                            <div style={styles.profileContainer}>
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
                                                    <span>{t('doctorDetails.changePhoto')}</span>
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

                                <div>
                                    <h1 style={styles.title}>{renderValue('full_name', 'fullName')}</h1>
                                    <h2 style={styles.subtitle}>{renderValue('specialization', 'specialization')}</h2>
                                    <div style={{ marginTop: '1rem' }}>
                                        {renderStatusBadge()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.content}>
                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>{t('doctorDetails.contactInformation')}</h3>
                            <div style={styles.infoGrid}>
                                <div style={styles.infoItem}>
                                    <span style={styles.label}>{t('doctorDetails.email')}:</span>
                                    {renderValue('email', 'email')}
                                </div>
                                <div style={styles.infoItem}>
                                    <span style={styles.label}>{t('doctorDetails.phone')}:</span>
                                    {renderValue('phone', 'phone')}
                                </div>
                            </div>
                        </div>

                        <div style={{ margin: '2rem 0' }}>
                            <h3 style={styles.sectionTitle}>{t('doctorDetails.bookAppointment')}</h3>
                            {doctor && doctor.doctor_id && (
                                <AppointmentBooking doctorId={doctor.doctor_id} />
                            )}
                        </div>

                        <div style={styles.section}>
                            <h3 style={styles.sectionTitle}>{t('doctorDetails.clinicDetails')}</h3>
                            <div style={styles.infoGrid}>
                                <div style={styles.infoItem}>
                                    <span style={styles.label}>{t('doctorDetails.clinicName')}:</span>
                                    {renderValue('clinic_name', 'clinicName')}
                                </div>
                                <div style={styles.infoItem}>
                                    <span style={styles.label}>{t('doctorDetails.city')}:</span>
                                    {renderValue('city', 'city')}
                                </div>
                                <div style={styles.infoItem}>
                                    <span style={styles.label}>{t('doctorDetails.clinicAddress')}:</span>
                                    {renderValue('clinic_address', 'clinicAddress')}
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'flex-end',
                                marginTop: '2rem'
                            }}>
                                <button
                                    onClick={handleCancel}
                                    style={styles.cancelButton}
                                >
                                    {t('doctorDetails.cancel')}
                                </button>
                                <button
                                    onClick={handleSave}
                                    style={styles.saveButton}
                                >
                                    {t('doctorDetails.saveChanges')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

DoctorDetailsPage.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation()(DoctorDetailsPage);