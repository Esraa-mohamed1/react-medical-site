import React, { useState } from 'react';
import { FaUserEdit, FaKey, FaEye, FaEyeSlash, FaUserMd } from 'react-icons/fa';
import { postData } from '../services/api';
import DoctorSidebar from '../features/doctors/components/DoctorSidebar';
import './AccountSettingsPage.css';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

const usernameMinLength = 3;
const passwordMinLength = 8;

const AccountSettingsPage = () => {
    const { t } = useTranslation();
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const [username, setUsername] = useState(loggedUser?.username || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [currentPasswordTouched, setCurrentPasswordTouched] = useState(false);
    const [newPasswordTouched, setNewPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const usernameValid = username.length >= usernameMinLength && /^[a-zA-Z0-9_]+$/.test(username);
    const newPasswordValid = newPassword.length >= passwordMinLength;
    const newPasswordHasNumber = /\d/.test(newPassword);
    const newPasswordHasUpper = /[A-Z]/.test(newPassword);
    const newPasswordHasLower = /[a-z]/.test(newPassword);
    const newPasswordHasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const passwordsMatch = newPassword === confirmPassword;

    const handleUsernameChange = async (e) => {
        e.preventDefault();
        
        if (!usernameValid) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Username',
                text: 'Please enter a valid username (minimum 3 characters, alphanumeric and underscore only).',
                confirmButtonColor: '#37ECBA'
            });
            return;
        }

        setLoading(true);
        try {
            await postData(`/users/change-username/`, { username });
            localStorage.setItem('loggedUser', JSON.stringify({ ...loggedUser, name: username }));
            
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Username updated successfully.',
                confirmButtonColor: '#37ECBA',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (err) {
            const errorMessage = err.response?.data?.username?.[0] || 'Failed to update username.';
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: errorMessage,
                confirmButtonColor: '#37ECBA'
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        if (!currentPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Current Password Required',
                text: 'Please enter your current password.',
                confirmButtonColor: '#37ECBA'
            });
            return;
        }

        if (!newPasswordValid || !newPasswordHasNumber || !newPasswordHasUpper || !newPasswordHasLower || !newPasswordHasSpecial) {
            Swal.fire({
                icon: 'error',
                title: 'Password Requirements Not Met',
                html: `
                    <div style="text-align: left;">
                        <div>Password must meet the following requirements:</div>
                        <div>• At least ${passwordMinLength} characters</div>
                        <div>• At least one number</div>
                        <div>• At least one uppercase letter</div>
                        <div>• At least one lowercase letter</div>
                        <div>• At least one special character</div>
                    </div>
                `,
                confirmButtonColor: '#37ECBA'
            });
            return;
        }

        if (!passwordsMatch) {
            Swal.fire({
                icon: 'error',
                title: 'Passwords Do Not Match',
                text: 'Please make sure your new password and confirmation password match.',
                confirmButtonColor: '#37ECBA'
            });
            return;
        }

        setLoading(true);
        try {
            await postData(`/users/change-password/`, {
                old_password: currentPassword,
                new_password: newPassword,
            });
            
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Password updated successfully.',
                confirmButtonColor: '#37ECBA',
                timer: 2000,
                showConfirmButton: false
            });
            
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setNewPasswordTouched(false);
            setCurrentPasswordTouched(false);
            setConfirmPasswordTouched(false);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Password Update Failed',
                text: 'Failed to update password. Please check your current password and try again.',
                confirmButtonColor: '#37ECBA'
            });
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = (type) => {
        switch(type) {
            case 'current':
                setShowCurrentPassword(!showCurrentPassword);
                break;
            case 'new':
                setShowNewPassword(!showNewPassword);
                break;
            case 'confirm':
                setShowConfirmPassword(!showConfirmPassword);
                break;
            default:
                break;
        }
    };

    return (
        <div className="doctor-dashboard-bg">
            <DoctorSidebar />
            <div className="doctor-dashboard-main settings-main">
                <div className="settings-flex-container">
                    {/* Profile Card */}
                    <div className="settings-profile-card">
                        <div className="profile-avatar">
                            {loggedUser?.profile_image ? (
                                <img src={loggedUser.profile_image} alt="Doctor" />
                            ) : (
                                <FaUserMd size={48} />
                            )}
                        </div>
                        <div className="profile-info">
                            <div className="profile-name">{loggedUser?.username || 'Doctor'}</div>
                            <div className="profile-role">{loggedUser?.role ? loggedUser.role.charAt(0).toUpperCase() + loggedUser.role.slice(1) : 'Doctor'}</div>
                        </div>
                    </div>
                    {/* Settings Card */}
                    <div className="settings-card enhanced-settings-card">
                        <div className="card-header">
                            <h2 className="card-title">
                                <FaUserEdit className="title-icon" />
                                {t('accountSettings.title')}
                            </h2>
                            <p className="card-subtitle">Manage your account settings and security</p>
                        </div>
                        <div className="settings-sections">
                            {/* Username Section */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h3 className="section-title">
                                        <FaUserEdit className="section-icon" />
                                        {t('accountSettings.changeUsername')}
                                    </h3>
                                    <p className="section-description">
                                        Update your username. This will be your display name across the platform.
                                    </p>
                                </div>
                                <form onSubmit={handleUsernameChange} className="settings-form">
                                    <div className="form-group">
                                        <label className="form-label">
                                            {t('accountSettings.changeUsername')}
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-input ${usernameTouched && !usernameValid ? 'error' : ''}`}
                                            value={username}
                                            onChange={e => { setUsername(e.target.value); setUsernameTouched(true); }}
                                            minLength={usernameMinLength}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="save-btn" disabled={loading || !usernameValid}>
                                        Save Username
                                    </button>
                                </form>
                            </div>
                            <hr className="settings-divider" />
                            {/* Password Section */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h3 className="section-title">
                                        <FaKey className="section-icon" />
                                        {t('accountSettings.resetPassword')}
                                    </h3>
                                    <p className="section-description">
                                        Change your password to keep your account secure.
                                    </p>
                                </div>
                                <form onSubmit={handlePasswordChange} className="settings-form">
                                    <div className="form-group">
                                        <label className="form-label">
                                            {t('accountSettings.currentPassword')}
                                        </label>
                                        <div className="password-input-wrapper">
                                            <input
                                                type={showCurrentPassword ? "text" : "password"}
                                                className={`form-input ${currentPasswordTouched && !currentPassword ? 'error' : ''}`}
                                                value={currentPassword}
                                                onChange={e => setCurrentPassword(e.target.value)}
                                                onBlur={() => setCurrentPasswordTouched(true)}
                                                required
                                                disabled={loading}
                                                placeholder="Enter current password"
                                            />
                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() => togglePasswordVisibility('current')}
                                            >
                                                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        <div className={`validation-message ${currentPasswordTouched && !currentPassword ? 'error' : ''}`}>
                                            {t('accountSettings.enterCurrentPassword')}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">
                                            {t('accountSettings.newPassword')}
                                        </label>
                                        <div className="password-input-wrapper">
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                className={`form-input ${newPasswordTouched && !newPasswordValid ? 'error' : ''}`}
                                                value={newPassword}
                                                onChange={e => setNewPassword(e.target.value)}
                                                onBlur={() => setNewPasswordTouched(true)}
                                                required
                                                disabled={loading}
                                                placeholder="Enter new password"
                                            />
                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() => togglePasswordVisibility('new')}
                                            >
                                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        <div className="password-requirements">
                                            <div className={`requirement ${newPasswordTouched && !newPasswordValid ? 'error' : ''}`}>
                                                {t('accountSettings.minimumCharacters', { count: passwordMinLength })}
                                            </div>
                                            <div className={`requirement ${newPasswordTouched && !newPasswordHasNumber ? 'error' : ''}`}>
                                                {t('accountSettings.atLeastOneNumber')}
                                            </div>
                                            <div className={`requirement ${newPasswordTouched && !newPasswordHasUpper ? 'error' : ''}`}>
                                                {t('accountSettings.atLeastOneUpper')}
                                            </div>
                                            <div className={`requirement ${newPasswordTouched && !newPasswordHasLower ? 'error' : ''}`}>
                                                {t('accountSettings.atLeastOneLower')}
                                            </div>
                                            <div className={`requirement ${newPasswordTouched && !newPasswordHasSpecial ? 'error' : ''}`}>
                                                {t('accountSettings.atLeastOneSpecial')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">
                                            {t('accountSettings.confirmPassword')}
                                        </label>
                                        <div className="password-input-wrapper">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                className={`form-input ${confirmPasswordTouched && !passwordsMatch ? 'error' : ''}`}
                                                value={confirmPassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                                onBlur={() => setConfirmPasswordTouched(true)}
                                                required
                                                disabled={loading}
                                                placeholder="Confirm new password"
                                            />
                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() => togglePasswordVisibility('confirm')}
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        <div className={`validation-message ${confirmPasswordTouched && !passwordsMatch ? 'error' : ''}`}>
                                            {confirmPasswordTouched && !passwordsMatch
                                                ? t('accountSettings.passwordsDoNotMatch')
                                                : t('accountSettings.repeatNewPassword')}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn-primary"
                                        disabled={
                                            loading ||
                                            !currentPassword ||
                                            !newPasswordValid ||
                                            !newPasswordHasNumber ||
                                            !newPasswordHasUpper ||
                                            !newPasswordHasLower ||
                                            !newPasswordHasSpecial ||
                                            !passwordsMatch
                                        }
                                    >
                                        {loading ? 'Updating...' : t('accountSettings.savePassword')}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettingsPage;
