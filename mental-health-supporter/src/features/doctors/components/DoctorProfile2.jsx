import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctorById, updateDoctor } from '../../../services/doctors/DoctorServices';
import doctorPlaceholder from '../../../components/DoctorsListComponent/images/doctor-placeholder.jpg';
import doctorImage from '../../../components/DoctorsListComponent/images/doctor.png';
// import AppointmentBooking from '../../components/DoctorProfile/AppointmentBooking';
import '../../../pages/DoctorDetailsPage.css';
import { useTranslation } from 'react-i18next';
import DoctorSidebar from './DoctorSidebar';

const DoctorDetailsPage = () => {
  const { t, i18n } = useTranslation();

  const nonEditableFields = ['email'];
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const doctorId = loggedUser?.id;
  const userRole = loggedUser ? loggedUser['role'] : null;
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const data = await getDoctorById(doctorId);
        if (!data || Object.keys(data).length === 0) {
          setError(t('doctorDetails.notFound'));
          setDoctor(null);
          setEditedDoctor(null);
          return;
        }
        setDoctor(data);
        setEditedDoctor(data);
        setImagePreview(null);
      } catch (err) {
        setError(t('doctorDetails.error'));
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorDetails();
  }, [doctorId, t]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const updatedData = await updateDoctor(doctorId, editedDoctor);
      setDoctor(updatedData);
      setIsEditing(false);
      setImagePreview(null);
    } catch (err) {
      setError(t('doctorDetails.error'));
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

  if (loading) return <div className="loading">{t('doctorDetails.loading')}</div>;
  if (error) return <div className="error">{error}</div>;
  if (!doctor) return <div className="notFound">{t('doctorDetails.notFound')}</div>;

  const renderValue = (field, label) => {
    if (isEditing && !nonEditableFields.includes(field)) {
      return (
        <input
          type="text"
          value={editedDoctor[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          className="editInput"
          placeholder={t(`doctorDetails.${label}`)}
        />
      );
    }
    return <span className="value">{doctor[field]}</span>;
  };

  const profileImageSrc = imagePreview
    ? imagePreview
    : (doctor.profile_image || doctorImage || doctorPlaceholder);

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="doctorDetailsPage enhanced-main-card">
          <div className="doctorDetailsContainer">
            <div className="headerContainer">
              {userRole === 'doctor' && (
                <div className={`buttonContainer-${i18n.language}`}> 
                  {isEditing && (
                    <button onClick={handleCancel} className="edit-btn btn-sm">❎</button>
                  )}
                  <button
                    onClick={isEditing ? handleSave : handleEdit}
                    className="review-btn btn-sm"
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
                          <div className={`changePhotoOverlayy ${isHoveringImage ? 'imageContainerHover' : ''}`}>
                            <span className="cameraIcon">📷</span>
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
                      <img src={profileImageSrc} alt={doctor.full_name} className="doctorImage" />
                    )}
                  </div>
                  <div className="doctorBasicInfo">
                    <h1 className="title">{renderValue('full_name', 'fullName')}</h1>
                    <h1 className="created">@{loggedUser['username']}</h1>
                    <h2 className="subtitle">{isEditing ? (
                      <select name="specialization" value={editedDoctor.specialization} onChange={e => handleChange('specialization', e.target.value)} className="form-select form-select-sm">
                        <option>Clinical Psychology</option>
                        <option>Psychiatry</option>
                        <option>Psychotherapy</option>
                        <option>Counseling Psychology</option>
                        <option>Behavioral Therapy</option>
                      </select>
                    ) : (<span className="value">{doctor.specialization}</span>)}</h2>
                    <div className="availabilityBadge">
                      {isEditing ? (
                        <select
                          value={editedDoctor.available}
                          onChange={(e) => handleChange('available', e.target.value === 'true')}
                          className="form-select form-select-sm"
                        >
                          <option value={true}>{t('doctorDetails.available')}</option>
                          <option value={false}>{t('doctorDetails.unavailable')}</option>
                        </select>
                      ) : (
                        <span className={`status ${doctor.available ? 'available' : 'unavailable'}`}>
                          {doctor.available ? t('doctorDetails.available') : t('doctorDetails.unavailable')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="doctorContent">
              {/* About the Doctor Section */}
              <div className="infoSection enhanced-section-card">
                <h3 className="sectionTitle">About the Doctor</h3>
                {isEditing ? (
                  <textarea
                    className="form-control mb-2"
                    rows={4}
                    value={editedDoctor.description || ''}
                    onChange={e => handleChange('description', e.target.value)}
                    maxLength={1000}
                    placeholder="Write something about yourself, your experience, and your specialties..."
                  />
                ) : (
                  <div className="text-muted" style={{ whiteSpace: 'pre-line' }}>
                    {doctor.description ? doctor.description : <span className="fst-italic">No description set yet.</span>}
                  </div>
                )}
              </div>
              <div className="infoSection enhanced-section-card">
                <h3 className="sectionTitle">{t('doctorDetails.contactInformation')}</h3>
                <div className="infoGrid">
                  <div className="infoItem">
                    <span className="label">{t('doctorDetails.email')}:</span>
                    {renderValue('email', 'email')}
                  </div>
                  <div className="infoItem">
                    <span className="label">{t('doctorDetails.phone')}:</span>
                    {renderValue('phone', 'phone')}
                  </div>
                </div>
              </div>
              <div>
                <div className="infoSection enhanced-section-card">
                  <h3 className="sectionTitle">{t('doctorDetails.clinicDetails')}</h3>
                  <div className="infoGrid">
                    <div className="infoItem">
                      <span className="label">{t('doctorDetails.clinicName')}:</span>
                      {renderValue('clinic_name', 'clinicName')}
                    </div>
                    <div className="infoItem">
                      <span className="label">{t('doctorDetails.city')}:</span>
                      {renderValue('city', 'city')}
                    </div>
                    <div className="infoItem">
                      <span className="label">{t('doctorDetails.clinicAddress')}:</span>
                      {renderValue('clinic_address', 'clinicAddress')}
                    </div>
                  </div>
                </div>
              </div>
              {isEditing && (
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button onClick={handleCancel} className="edit-btn btn-sm" style={{ backgroundColor: '#dc3545', color: '#fff' }}>
                    {t('doctorDetails.cancel')}
                  </button>
                  <button onClick={handleSave} className="review-btn btn-sm">
                    {t('doctorDetails.saveChanges')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;