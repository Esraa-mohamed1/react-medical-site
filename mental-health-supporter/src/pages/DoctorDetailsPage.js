import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctorById } from './../services/doctors/DoctorServices';
import doctorPlaceholder from './../components/DoctorsListComponent/images/doctor-placeholder.jpg';
import doctorImage from './../components/DoctorsListComponent/images/doctor.png';

const styles = {
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
    }
};

const DoctorDetailsPage = () => {
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const data = await getDoctorById(id);
                setDoctor(data);
            } catch (err) {
                setError('Failed to fetch doctor details');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [id]);

    const handleBack = () => {
        navigate('/doctors-list');
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (error) return <div style={styles.error}>{error}</div>;
    if (!doctor) return <div style={styles.notFound}>Doctor not found</div>;

    return (
        <div style={styles.doctorDetailsPage}>
            <div style={styles.doctorDetailsContainer}>
                <div style={styles.headerContainer}>
                    <button 
                        onClick={handleBack} 
                        style={styles.backButton}
                    >
                        ← Back to Doctors
                    </button>
                    <div style={styles.doctorHeader}>
                        <div style={styles.doctorProfile}>
                            <img
                                src={doctorImage || doctorPlaceholder}
                                // src={doctor.profile_url || doctorImage || doctorPlaceholder}
                                alt={doctor.full_name}
                                style={styles.doctorImage}
                            />
                            <div style={styles.doctorBasicInfo}>
                                <h1 style={styles.title}>{doctor.full_name}</h1>
                                <h2 style={styles.subtitle}>{doctor.specialization}</h2>
                                <div style={styles.availabilityBadge}>
                                    <span style={{
                                        ...styles.status,
                                        ...(doctor.available ? styles.available : styles.unavailable)
                                    }}>
                                        {doctor.available ? 'Available' : 'Unavailable'}
                                    </span>
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
                                <span style={styles.value}>{doctor.email}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.label}>Phone:</span>
                                <span style={styles.value}>{doctor.phone}</span>
                            </div>
                        </div>
                    </div>

                    <div style={styles.infoSection}>
                        <h3 style={styles.sectionTitle}>Clinic Details</h3>
                        <div style={styles.infoGrid}>
                            <div style={styles.infoItem}>
                                <span style={styles.label}>Clinic Name:</span>
                                <span style={styles.value}>{doctor.clinic_name}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.label}>City:</span>
                                <span style={styles.value}>{doctor.city}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.label}>Address:</span>
                                <span style={styles.value}>{doctor.clinic_address}</span>
                            </div>
                        </div>
                    </div>

                    <div style={styles.mapSection}>
                        <h3 style={styles.sectionTitle}>Location</h3>
                        <div style={styles.mapContainer}>
                            <div style={styles.mapPlaceholder}>
                                Map showing location at:
                                <br />
                                Lat: {doctor.latitude}
                                <br />
                                Long: {doctor.longitude}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetailsPage;