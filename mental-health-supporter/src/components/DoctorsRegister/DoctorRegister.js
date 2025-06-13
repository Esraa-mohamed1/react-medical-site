import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';
import { registerDoctor } from '../../services/api';
import MapPicker from './MapPicker';

const DoctorRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        specialization: 'Psychiatrist',
        email: '',
        phone: '',
        clinic_name: '',
        clinic_address: '',
        city: '',
        latitude: '',
        longitude: '',
        available: true,
        profile_url: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showMap, setShowMap] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handlePickLocation = ({ lat, lng }) => {
        setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
        if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            await registerDoctor(formData);
            setSuccessMessage('Doctor registered successfully!');
            setFormData({
                full_name: '',
                specialization: 'Psychiatrist',
                email: '',
                phone: '',
                clinic_name: '',
                clinic_address: '',
                city: '',
                latitude: '',
                longitude: '',
                available: true,
                profile_url: '',
                password: '',
                confirmPassword: ''
            });
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setSuccessMessage(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData((prev) => ({
                        ...prev,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }));
                },
                (error) => {
                    alert('Unable to retrieve your location.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit} noValidate>
                <h2 className="auth-title">Doctor Registration</h2>
                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}
                <div className="mb-3">
                    <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                        value={formData.full_name}
                        onChange={handleChange}
                    />
                    {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="specialization"
                        placeholder="Specialization"
                        className={`form-control ${errors.specialization ? 'is-invalid' : ''}`}
                        value={formData.specialization}
                        onChange={handleChange}
                    />
                    {errors.specialization && <div className="invalid-feedback">{errors.specialization}</div>}
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="clinic_name"
                        placeholder="Clinic Name"
                        className="form-control"
                        value={formData.clinic_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="clinic_address"
                        placeholder="Clinic Address"
                        className="form-control"
                        value={formData.clinic_address}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="form-control"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex align-items-center gap-2">
                    <input
                        type="number"
                        name="latitude"
                        placeholder="Latitude"
                        className="form-control"
                        value={formData.latitude}
                        onChange={handleChange}
                        step="any"
                    />
                    <input
                        type="number"
                        name="longitude"
                        placeholder="Longitude"
                        className="form-control"
                        value={formData.longitude}
                        onChange={handleChange}
                        step="any"
                    />
                    <button type="button" className="btn btn-primary" onClick={() => setShowMap(true)} style={{whiteSpace:'nowrap'}}>
                        Pick on Map
                    </button>
                </div>
                <MapPicker
                    show={showMap}
                    onClose={() => setShowMap(false)}
                    onPick={handlePickLocation}
                    lat={formData.latitude}
                    lng={formData.longitude}
                />
                <div className="mb-3">
                    <input
                        type="text"
                        name="profile_url"
                        placeholder="Profile URL"
                        className="form-control"
                        value={formData.profile_url}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
                <button type="submit" className="btn btn-light w-100 mb-2" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
                <p className="auth-switch text-center">
                    Already have an account? <a href="/login">Log in</a>
                </p>
            </form>
        </div>
    );
};

export default DoctorRegister;