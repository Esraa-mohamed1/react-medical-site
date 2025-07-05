import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctorById, updateDoctor } from './../services/doctors/DoctorServices';
import doctorPlaceholder from './../components/DoctorsListComponent/images/doctor-placeholder.jpg';
import doctorImage from './../components/DoctorsListComponent/images/doctor.png';
// import AppointmentBooking from '../components/DoctorProfile/AppointmentBooking';
import CustomNavbar from './../components/Navbar';
import './DoctorDetailsPage.css';
import Footer from "./../features/homePage/components/Footer";
import { useTranslation } from 'react-i18next';

const DoctorDetailsPage = () => {
  const { t, i18n } = useTranslation();

  const nonEditableFields = ['email'];
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const userRole = loggedUser ? loggedUser['role'] : null;
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const data = await getDoctorById(id);
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
  }, [id, t]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const updatedData = await updateDoctor(id, editedDoctor);
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
    return <span className="value">{doctor[field] || t(`doctorDetails.${label}NotAvailable`)}</span>;
  };

  const profileImageSrc = imagePreview
    ? imagePreview
    : (doctor.profile_image || doctorImage || doctorPlaceholder);

  return (
    <>
      <CustomNavbar />
      <div className="doctorDetailsPage">
        <div className="doctorDetailsContainer">
          <div className="headerContainer">
            {userRole === 'doctor' && (
              <div className={`buttonContainer-${i18n.language}`}>
                {isEditing && (
                  <button onClick={handleCancel} className="cancelButton">❎</button>
                )}
                <button
                  onClick={isEditing ? handleSave : handleEdit}
                  className="actionButton"
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
                  {/* renderValue('specialization', 'specialization') */}
                  <h2 className="subtitle">{isEditing ? (
                    <select name="specialization" value={editedDoctor.specialization} onChange={e => handleChange('specialization', e.target.value)} className="editInput">
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
                        className="editInput"
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
            <div className="infoSection">
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
              <div className="infoSection">
                <h3 className="sectionTitle">{t('clinicDetails.title')}</h3>
                <div className="infoGrid">
                  <div className="infoItem">
                    <span className="label">{t('clinicDetails.addressTitle')}:</span>
                    {renderValue('clinic_address', 'addressTitle')}
                  </div>
                  <div className="infoItem">
                    <span className="label">{t('clinicDetails.consultationFee')}:</span>
                    {doctor.consultation_fee ? doctor.consultation_fee : t('clinicDetails.notSpecified')}
                  </div>
                  <div className="infoItem">
                    <span className="label">{t('clinicDetails.availableServices')}:</span>
                    {doctor.available_services && doctor.available_services.length > 0 ? doctor.available_services.join(', ') : t('clinicDetails.noServicesListed')}
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button onClick={handleCancel} className="saveButton" style={{ backgroundColor: '#dc3545' }}>
                  {t('doctorDetails.cancel')}
                </button>
                <button onClick={handleSave} className="saveButton">
                  {t('doctorDetails.saveChanges')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorDetailsPage;
