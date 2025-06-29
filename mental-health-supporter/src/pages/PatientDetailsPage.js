import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientById, updatePatient } from './../services/patients/PatientServices';
import patientPlaceholder from './../components/DoctorsListComponent/images/doctor-placeholder.jpg';
import CustomNavbar from './../components/Navbar';
import './PatientDetailsPage.css';
import Footer from "./../features/homePage/components/Footer";
import { useTranslation } from 'react-i18next';

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
  const { id } = useParams();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const data = await getPatientById(id);
        setPatient(data);
        setEditedPatient(data);
        setImagePreview(null);
      } catch (err) {
        setError(t('patientDetails.fetchError'));
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatientDetails();
  }, [id, t]);

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
      setError(t('patientDetails.updateError'));
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

  if (loading) return <div className="statusMessage">{t('patientDetails.loading')}</div>;
  if (error) return <div className="statusMessage error">{error}</div>;
  if (!patient) return <div className="statusMessage">{t('patientDetails.notFound')}</div>;

  const renderField = (labelKey, field, type = 'text', editable = true) => (
    <div className="field">
      <div className="label">{t(`patientDetails.${labelKey}`)}</div>
      {isEditing && editable ? (
        <input
          type={type}
          value={editedPatient[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          className="input"
        />
      ) : (
        <div className="value">
          {field === 'created_at'
            ? new Date(patient[field]).toLocaleDateString()
            : patient[field]}
        </div>
      )}
    </div>
  );

  const profileImageSrc = imagePreview || patient.profile_image || patientPlaceholder;

  return (
    <>
      <CustomNavbar />
      <div className="containerr">
        <div className="card">
          <div className="header">
            <div className={`buttonsContainer-${i18n.language}`}>
              {isEditing ? (
                <>
                  <button onClick={handleCancel} className="button cancelButton">❎</button>
                  <button onClick={handleSave} className="button saveButton">✅</button>
                </>
              ) : (
                <button onClick={handleEdit} className="button editButton">🖍️</button>
              )}
            </div>
            <div className="profileSection">
              <div
                className="imageContainer"
                onMouseEnter={() => setIsHoveringImage(true)}
                onMouseLeave={() => setIsHoveringImage(false)}>
                {isEditing ? (
                  <>
                    <label htmlFor="profile-image-upload" style={{ cursor: 'pointer' }}>
                      <img src={profileImageSrc} alt={patient.full_name} className="avatar" />
                      <div className={`changePhotoOverlayy ${isHoveringImage ? 'imageContainerHover' : ''}`}>
                        <span className="cameraIcon">📷</span>
                        <span>{t('patientDetails.changePhoto')}</span>
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
                  <img src={profileImageSrc} alt={patient.full_name} className="avatar" />
                )}
              </div>
              <div className="profileInfo">
                <h1 className="name">{patient.full_name}</h1>
                <div className="created">@{loggedUser['username']}</div>
                <div className="created">{t('patientDetails.memberSince')}: {new Date(patient.created_at).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          <div className="mainContent">
            <div className="section">
              <h2 className="sectionTitle">{t('patientDetails.basicInfo')}</h2>
              <div className="grid">
                {renderField('fullName', 'full_name')}
                {renderField('memberSince', 'created_at', 'datetime-local', false)}
              </div>
            </div>

            <div className="section">
              <h2 className="sectionTitle">{t('patientDetails.contactInfo')}</h2>
              <div className="grid">
                {renderField('email', 'email', 'email', false)}
                {renderField('phone', 'phone')}
                {renderField('address', 'address')}
                {renderField('city', 'city')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientDetailsPage;
