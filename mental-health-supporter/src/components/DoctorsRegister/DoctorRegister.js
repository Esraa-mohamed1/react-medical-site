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
        username: '',
        email: '',
        phone: '',
        clinic_name: '',
        clinic_address: '',
        city: '',
        latitude: '',
        longitude: '',
        available: true,
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [degreeFile, setDegreeFile] = useState(null);

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

    const handleFileChange = (e) => {
        setDegreeFile(e.target.files[0]);
        if (errors.degreeFile) {
            setErrors({ ...errors, degreeFile: null });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
        if (!formData.username.trim()) newErrors.username = 'Username is required';
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
        if (!degreeFile) {
            newErrors.degreeFile = 'Academic degree document is required';
        } else {
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            if (!allowedTypes.includes(degreeFile.type)) {
                newErrors.degreeFile = 'Only PDF, JPG, or PNG files are allowed';
            }
            if (degreeFile.size > 5 * 1024 * 1024) {
                newErrors.degreeFile = 'File size must be less than 5MB';
            }
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.clinic_address.trim()) newErrors.clinic_address = 'Clinic address is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            let response;
            if (degreeFile) {
                // إذا كان هناك ملف، استخدم FormData وأرسل الحقول بأسمائها الصحيحة فقط
                const form = new FormData();
                form.set('full_name', String(formData.full_name || ''));
                form.set('phone', String(formData.phone || ''));
                form.set('address', String(formData.clinic_address || ''));
                form.set('specialization', String(formData.specialization || ''));
                form.set('username', String(formData.username || ''));
                form.set('email', String(formData.email || ''));
                form.set('clinic_name', String(formData.clinic_name || ''));
                form.set('city', String(formData.city || ''));
                form.set('latitude', String(formData.latitude || ''));
                form.set('longitude', String(formData.longitude || ''));
                form.set('available', String(formData.available));
                form.set('password', String(formData.password || ''));
                // إذا كان الباك اند يتوقع password2 أضف السطر التالي:
                // form.set('password2', String(formData.confirmPassword || ''));
                // لا ترسل confirmPassword ولا clinic_address نهائياً
                form.append('academic_degree_document', degreeFile);
                response = await registerDoctor(form, true);
            } else {
                // If no file, send JSON
                const jsonData = {
                    ...formData,
                    address: formData.clinic_address || '',
                };
                response = await registerDoctor(jsonData, false);
            }
            setSuccessMessage('Doctor registered successfully!');
            setFormData({
                full_name: '',
                specialization: 'Psychiatrist',
                username: '',
                email: '',
                phone: '',
                clinic_name: '',
                clinic_address: '',
                city: '',
                latitude: '',
                longitude: '',
                available: true,
                password: '',
                confirmPassword: ''
            });
            setDegreeFile(null);
            navigate('/login');
        } catch (error) {
            setErrors({});
            let fieldErrors = {};
            // Debugging: log all error details
            console.log('❌ error:', error);
            console.log('❌ error.response:', error.response);
            console.log('❌ error.response?.data:', error.response?.data);
            console.log('❌ error.message:', error.message);
            if (error.response && error.response.data) {
                const data = error.response.data;
                const keyMap = {
                    email: 'email',
                    username: 'username',
                    password: 'password',
                    full_name: 'full_name',
                    academic_degree_document: 'degreeFile',
                    specialization: 'specialization',
                    confirmPassword: 'confirmPassword',
                    clinic_name: 'clinic_name',
                    address: 'clinic_address',
                };
                // Ensure all error fields are mapped and set
                Object.keys(data).forEach((key) => {
                    const frontendKey = keyMap[key] || key;
                    let msg = data[key];
                    if (Array.isArray(msg)) msg = msg[0];
                    if (typeof msg === 'string') {
                        // Always set the error for the field
                        if (frontendKey === 'username' && (msg.toLowerCase().includes('exist') || msg.toLowerCase().includes('unique'))) {
                            fieldErrors.username = 'This username is already taken. Please choose another.';
                        } else if (frontendKey === 'email' && (msg.toLowerCase().includes('exist') || msg.toLowerCase().includes('unique'))) {
                            fieldErrors.email = 'This email is already registered. Please use another.';
                        } else {
                            fieldErrors[frontendKey] = msg;
                        }
                    }
                });
                // Fallback: if no field errors, show a generic error
                if (Object.keys(fieldErrors).length === 0) {
                    setErrorMessage('Registration failed. Please check your data.');
                } else {
                    setErrors(fieldErrors);
                }
                console.log('🛑 Server validation errors:', fieldErrors);
            } else {
                setErrorMessage('Unexpected error occurred. Please try again.');
                console.log('🟠 Fallback error object:', error);
                try {
                    const raw = JSON.stringify(error);
                    console.log('🟠 Raw error JSON:', raw);
                } catch (e) { }
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit} noValidate>
                <h2 className="auth-title">Doctor Registration</h2>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <div className="row mb-3">
                    <div className="col">
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
                    <div className="col">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
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
                    <div className="col">
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
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="clinic_name"
                            placeholder="Clinic Name"
                            className="form-control"
                            value={formData.clinic_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text"
                            name="clinic_address"
                            placeholder="Clinic Address"
                            className="form-control"
                            value={formData.clinic_address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            className="form-control"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="number"
                            name="latitude"
                            placeholder="Latitude"
                            className="form-control"
                            value={formData.latitude}
                            onChange={handleChange}
                            step="any"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            name="longitude"
                            placeholder="Longitude"
                            className="form-control"
                            value={formData.longitude}
                            onChange={handleChange}
                            step="any"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
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
                    <div className="col">
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
                </div>
                <div className="mb-3">
                    <label htmlFor="degreeFile" className="form-label" style={{ color: 'white', fontWeight: 'bold' }}>
                        Academic Degree Document (PDF, JPG, PNG, max 5MB)
                    </label>
                    <input
                        type="file"
                        id="degreeFile"
                        name="degreeFile"
                        className={`form-control ${errors.degreeFile ? 'is-invalid' : ''}`}
                        accept=".pdf, .jpg, .jpeg, .png"
                        onChange={handleFileChange}
                    />
                    {errors.degreeFile && <div className="invalid-feedback">{errors.degreeFile}</div>}
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
