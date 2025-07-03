import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientById, updatePatient } from './../services/patients/PatientServices';
import patientPlaceholder from './../components/DoctorsListComponent/images/doctor-placeholder.jpg';
import CustomNavbar from './../components/Navbar';
import './PatientDetailsPage.css';
import Footer from "./../features/homePage/components/Footer";
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit3, FiSave, FiX, FiCamera } from 'react-icons/fi';

const PatientDetailsPage = () => {
  const { t, i18n } = useTranslation();
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [editedPatient, setEditedPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        setLoading(true);
        const data = await getPatientById(id);
        if (!data) {
          throw new Error('Patient not found');
        }
        setPatient(data);
        setEditedPatient(data);
        setImagePreview(null);
      } catch (err) {
        setError(t('patientDetails.fetchError'));
        console.error('Error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load patient details. Please try again.',
          confirmButtonColor: '#37ECBA'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPatientDetails();
  }, [id, t]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPatient({ ...patient });
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Discard Changes?',
      text: 'Are you sure you want to discard your changes?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#37ECBA',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, discard',
      cancelButtonText: 'Keep editing'
    }).then((result) => {
      if (result.isConfirmed) {
        setEditedPatient(patient);
        setIsEditing(false);
        setImagePreview(null);
      }
    });
  };

  const validateForm = () => {
    const errors = [];
    
    if (!editedPatient.full_name?.trim()) {
      errors.push('Full name is required');
    }
    
    if (!editedPatient.email?.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedPatient.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (editedPatient.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(editedPatient.phone.replace(/\s/g, ''))) {
      errors.push('Please enter a valid phone number');
    }
    
    return errors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    
    if (validationErrors.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        html: validationErrors.map(error => `<div>• ${error}</div>`).join(''),
        confirmButtonColor: '#37ECBA'
      });
      return;
    }

    try {
      setSaving(true);
      const updatedData = await updatePatient(id, editedPatient);
      setPatient(updatedData);
      setIsEditing(false);
      setImagePreview(null);
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Patient information updated successfully.',
        confirmButtonColor: '#37ECBA',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (err) {
      console.error('Update error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update patient information. Please try again.',
        confirmButtonColor: '#37ECBA'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setEditedPatient(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please select an image file.',
          confirmButtonColor: '#37ECBA'
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: 'Please select an image smaller than 5MB.',
          confirmButtonColor: '#37ECBA'
        });
        return;
      }
      
      setEditedPatient(prev => ({ ...prev, profile_image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      document.getElementById('profile-image-input').click();
    }
  };

  if (loading) {
    return (
      <div className="patient-details-page">
        <CustomNavbar />
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading patient details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="patient-details-page">
        <CustomNavbar />
        <div className="error-container">
          <div className="error-content">
            <h2>Error</h2>
            <p>{error || 'Patient not found'}</p>
            <button className="btn-primary" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const profileImageSrc = imagePreview || patient.profile_image || patientPlaceholder;

  return (
    <>
      <CustomNavbar />
      <div className="patient-details-page">
        <div className="patient-card">
          <div className="header">
            <div className={`buttonsContainer-${i18n.language === 'ar' ? 'ar' : 'en'}`}>
              {isEditing ? (
                <>
                  <button 
                    className="saveButton" 
                    onClick={handleSave}
                    disabled={saving}
                  >
                    <FiSave className="btn-icon" />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button className="cancelButton" onClick={handleCancel}>
                    <FiX className="btn-icon" />
                    Cancel
                  </button>
                </>
              ) : (
                <button className="editButton" onClick={handleEdit}>
                  <FiEdit3 className="btn-icon" />
                  Edit Profile
                </button>
              )}
            </div>
            <div className="profileSection">
              <div 
                className={`imageContainer ${isEditing ? 'editable' : ''} ${isHoveringImage ? 'hover' : ''}`}
                onMouseEnter={() => setIsHoveringImage(true)}
                onMouseLeave={() => setIsHoveringImage(false)}
                onClick={handleImageClick}
              >
                <img src={profileImageSrc} alt="Patient" className="avatar" />
                {isEditing && (
                  <div className="changePhotoOverlay">
                    <FiCamera className="cameraIcon" />
                    <span>Change Photo</span>
                  </div>
                )}
                <input
                  id="profile-image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
              <div className="profileInfo">
                <h1 className="name">{patient.full_name || patient.name || patient.username}</h1>
                <div className="created">@{loggedUser['username']}</div>
                <div className="created">
                  {t('patientDetails.memberSince')}: {new Date(patient.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          <div className="mainContent">
            <div className="section">
              <h2 className="sectionTitle">
                <FiUser className="section-icon" />
                {t('patientDetails.basicInfo')}
              </h2>
              <div className="grid">
                {renderField('fullName', 'full_name')}
                {renderField('memberSince', 'created_at', 'datetime-local', false)}
              </div>
            </div>

            <div className="section">
              <h2 className="sectionTitle">
                <FiMail className="section-icon" />
                {t('patientDetails.contactInfo')}
              </h2>
              <div className="grid">
                {renderField('email', 'email', 'email', false)}
                {renderField('phone', 'phone')}
                {renderField('address', 'address')}
                {renderField('city', 'city')}
              </div>
            </div>

            {patient.medical_history && (
              <div className="section">
                <h2 className="sectionTitle">
                  <FiCalendar className="section-icon" />
                  Medical Information
                </h2>
                <div className="grid">
                  {renderField('age', 'age', 'number')}
                  {renderField('gender', 'gender')}
                  {renderField('bloodType', 'blood_type')}
                  {renderField('allergies', 'allergies')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

  function renderField(labelKey, field, type = 'text', editable = true) {
    const value = editedPatient?.[field] || patient[field];
    const displayValue = field === 'created_at' 
      ? new Date(patient[field]).toLocaleDateString()
      : value;

    return (
      <div className="field">
        <div className="label">{t(`patientDetails.${labelKey}`)}</div>
        {isEditing && editable ? (
          <input
            type={type}
            value={value || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            className="input"
            placeholder={`Enter ${t(`patientDetails.${labelKey}`).toLowerCase()}`}
          />
        ) : (
          <div className="value">
            {displayValue || 'Not provided'}
          </div>
        )}
      </div>
    );
  }
};

export default PatientDetailsPage;
