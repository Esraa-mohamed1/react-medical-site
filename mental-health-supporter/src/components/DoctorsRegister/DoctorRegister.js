import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { registerDoctor } from '../../services/api';
import MapPicker from './MapPicker';
import './DoctorRegister.css'; // Ensure the CSS is imported
import CustomNavbar from '../Navbar'; 
import Footer from "../../features/homePage/components/Footer";

const DoctorRegister = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        specialization: 'Psychiatrist',
        clinic_name: '',
        phone: '',
        clinic_address: '',
        city: '',
        latitude: '',
        longitude: '',
        available: true,
    });
    const [degreeFile, setDegreeFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleFileChange = (e) => {
        setDegreeFile(e.target.files[0]);
        if (errors.degreeFile) setErrors(prev => ({ ...prev, degreeFile: null }));
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!degreeFile) newErrors.degreeFile = 'Academic degree document is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (step === 1 && validateStep1()) {
            setStep(step + 1);
        } else if (step === 2 && validateStep2()) {
            setStep(step + 1);
        }
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formPayload = new FormData();
        Object.keys(formData).forEach(key => formPayload.append(key, formData[key]));
        formPayload.append('address', formData.clinic_address); // Backend expects 'address'
        if (degreeFile) {
            formPayload.append('academic_degree_document', degreeFile);
        }

        try {
            await registerDoctor(formPayload, true);
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'Admin must approve your account before you can log in.',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/login');
            });
        } catch (error) {
            const apiErrors = error.response?.data || {};
            const formattedErrors = {};
            let errorMsg = '';
            Object.keys(apiErrors).forEach(key => {
                let msg = Array.isArray(apiErrors[key]) ? apiErrors[key][0] : apiErrors[key];
                formattedErrors[key] = typeof msg === 'string' ? msg : JSON.stringify(msg);
                // Only show concise messages for email/username
                if (key.toLowerCase().includes('email') && msg.toLowerCase().includes('already exists')) {
                  errorMsg += `Email already exists.\n`;
                } else if (key.toLowerCase().includes('username') && msg.toLowerCase().includes('already exists')) {
                  errorMsg += `Username already exists.\n`;
                } else {
                  // Enhance field name for user-friendly message
                  let fieldLabel = key.replace(/_/g, ' ')
                    .replace('username', 'Username')
                    .replace('email', 'Email')
                    .replace('full name', 'Full Name')
                    .replace('phone', 'Phone Number')
                    .replace('specialization', 'Specialization')
                    .replace('degreeFile', 'Academic Degree Document')
                    .replace('clinic address', 'Clinic Address')
                    .replace('city', 'City');
                  errorMsg += `${fieldLabel}: ${formattedErrors[key]}\n`;
                }
            });
            errorMsg = errorMsg.trim();
            setErrors(formattedErrors);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: errorMsg || 'Please check the form for errors.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h3 className="step-title">Account Information</h3>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className={errors.full_name ? 'is-invalid' : ''} />
                            {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} className={errors.username ? 'is-invalid' : ''} />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'is-invalid' : ''} />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} className={errors.password ? 'is-invalid' : ''} />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? 'is-invalid' : ''} />
                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                        </div>
                        {Object.keys(errors).length > 0 && <div className="alert alert-danger mt-2">Please fix the highlighted errors above.</div>}
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3 className="step-title">Professional Details</h3>
                        <div className="form-group">
                            <label>Specialization</label>
                            <select name="specialization" value={formData.specialization} onChange={handleChange} className={errors.specialization ? 'is-invalid' : ''}>
                                <option>Clinical Psychology</option>
                                <option>Psychiatry</option>
                                <option>Psychotherapy</option>
                                <option>Counseling Psychology</option>
                                <option>Behavioral Therapy</option>
                            </select>
                            {errors.specialization && <div className="invalid-feedback">{errors.specialization}</div>}
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={errors.phone ? 'is-invalid' : ''} />
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>
                        <div className="form-group">
                            <label>Clinic Name (Optional)</label>
                            <input type="text" name="clinic_name" value={formData.clinic_name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Academic Degree Document</label>
                            <input type="file" onChange={handleFileChange} className={errors.degreeFile ? 'is-invalid' : ''} />
                            {errors.degreeFile && <div className="invalid-feedback">{errors.degreeFile}</div>}
                        </div>
                        {Object.keys(errors).length > 0 && <div className="alert alert-danger mt-2">Please fix the highlighted errors above.</div>}
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h3 className="step-title">Clinic Location</h3>
                        <div className="form-group">
                            <label>Clinic Address</label>
                            <input type="text" name="clinic_address" value={formData.clinic_address} onChange={handleChange} className={errors.clinic_address ? 'is-invalid' : ''} />
                            {errors.clinic_address && <div className="invalid-feedback">{errors.clinic_address}</div>}
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} className={errors.city ? 'is-invalid' : ''} />
                            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                        </div>
                        <div className="form-group">
                            <MapPicker onLocationSelect={({ lat, lng }) => setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }))} />
                        </div>
                        {Object.keys(errors).length > 0 && <div className="alert alert-danger mt-2">Please fix the highlighted errors above.</div>}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
        <CustomNavbar />
        <div className="doctor-register-page">
            <div className="doctor-register-card">
                <div className="progress-bar">
                    <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>1</div>
                    <div className="connector"></div>
                    <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>2</div>
                    <div className="connector"></div>
                    <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>3</div>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                    {renderStep()}
                    <div className="navigation-buttons">
                        {step > 1 && <button type="button" onClick={prevStep} className="btn-secondary">Back</button>}
                        {step < 3 && <button type="button" onClick={nextStep} className="btn-primary">Next</button>}
                        {step === 3 && <button type="submit" disabled={isSubmitting} className="btn-primary">{isSubmitting ? 'Submitting...' : 'Register'}</button>}
                    </div>

                    <p className="auth-switch text-center">
                          <>Already have an account? <a href="/login">Log in</a></>
                    </p>
                </form>
            </div>
        </div>
              <Footer />
        </>
    );
};

export default DoctorRegister;