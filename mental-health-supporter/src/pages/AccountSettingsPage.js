import React, { useState } from 'react';
import { FaUserEdit, FaKey } from 'react-icons/fa';
import { postData } from '../services/api';
import CustomNavbar from '../components/Navbar';
import './AccountSettingsPage.css'; // ✅ Import the new CSS
import Footer from "./../features/homePage/components/Footer";
import { useTranslation } from 'react-i18next';
import DoctorSidebar from './../features/doctors/components/DoctorSidebar';



const usernameMinLength = 3;
const passwordMinLength = 8;

const AccountSettingsPage = () => {
    const { t } = useTranslation();

    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const [username, setUsername] = useState(loggedUser?.username || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameMsg, setUsernameMsg] = useState('');
    const [passwordMsg, setPasswordMsg] = useState('');
    const [loading, setLoading] = useState(false);

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
        setUsernameMsg('');
        if (!usernameValid) {
            setUsernameMsg(t('accountSettings.Pleaseenteravalidusername'));
            return;
        }
        setLoading(true);
        try {
            await postData(`/users/change-username/`, { username });
            localStorage.setItem('loggedUser', JSON.stringify({ ...loggedUser, name: username }));
            setUsernameMsg(t('accountSettings.usernameUpdated'));
        } catch (err) {
            // setUsernameMsg(`Failed to update username. ${err.response.data.username[0]}`);
            setUsernameMsg(t('accountSettings.usernameFailed') + err.response.data.username[0]);

        }
        setLoading(false);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordMsg('');
        if (!currentPassword) {
            setPasswordMsg(t('accountSettings.enterCurrentPassword'));

            return;
        }
        if (!newPasswordValid || !newPasswordHasNumber || !newPasswordHasUpper || !newPasswordHasLower || !newPasswordHasSpecial) {
            setPasswordMsg(t('accountSettings.passwordRequirements'));
            return;
        }
        if (!passwordsMatch) {
            setPasswordMsg(t('accountSettings.passwordsNotMatch'));
            return;
        }
        setLoading(true);
        try {
            await postData(`/users/change-password/`, {
                old_password: currentPassword,
                new_password: newPassword,
            });
            setPasswordMsg(t('accountSettings.passwordUpdated'));
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setNewPasswordTouched(false);
            setCurrentPasswordTouched(false);
            setConfirmPasswordTouched(false);
        } catch (err) {
            setPasswordMsg(t('accountSettings.passwordFailed'));
        }
        setLoading(false);
    };

    return (
        <>
            {loggedUser && loggedUser.role === 'doctor' &&
                <div className="doctor-dashboard-bg">
                    <DoctorSidebar />
                    <div className="doctor-dashboard-main enhanced-main-container">
                        <div className="accountSettingsPage">
                            <div className="accountCard">
                                <h2 className="accountTitle">
                                    <FaUserEdit /> {t('accountSettings.title')}
                                </h2>

                                <form onSubmit={handleUsernameChange}>
                                    <label className="form-label fw-bold classchangeusername">{t('accountSettings.changeUsername')}</label>
                                    <input
                                        type="text"
                                        className="accountInput"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={() => setUsernameTouched(true)}
                                        required
                                        disabled={loading}
                                    />
                                    <div className={`validationMsg ${usernameTouched && !usernameValid ? 'validationError' : ''}`}>
                                        {t('accountSettings.usernameValidation', { count: usernameMinLength })}
                                    </div>
                                    {usernameMsg && (
                                        <div className={`feedbackMsg ${usernameMsg.includes('success') ? 'feedbackSuccess' : ''}`}>
                                            {usernameMsg}
                                        </div>
                                    )}
                                    <button type="submit" className="accountButton" disabled={loading || !usernameValid}>
                                        {t('accountSettings.saveUsername')}
                                    </button>
                                </form>

                                <form onSubmit={handlePasswordChange} style={{ marginTop: '2rem' }}>
                                    <label className="form-label fw-bold classchangeusername">{t('accountSettings.resetPassword')}</label>
                                    <input
                                        type="password"
                                        className="accountInput"
                                        placeholder={t('accountSettings.currentPassword')}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        onBlur={() => setCurrentPasswordTouched(true)}
                                        required
                                        disabled={loading}
                                    />
                                    <div className={`validationMsg ${currentPasswordTouched && !currentPassword ? 'validationError' : ''}`}>
                                        {t('accountSettings.enterCurrentPassword')}
                                    </div>
                                    <input
                                        type="password"
                                        className="accountInput"
                                        placeholder={t('accountSettings.newPassword')}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        onBlur={() => setNewPasswordTouched(true)}
                                        required
                                        disabled={loading}
                                    />
                                    <div className="validationMsg">
                                        <div className={newPasswordTouched && !newPasswordValid ? 'validationError' : ''}>
                                            {t('accountSettings.minimumCharacters', { count: passwordMinLength })}
                                        </div>
                                        <div className={newPasswordTouched && !newPasswordHasNumber ? 'validationError' : ''}>
                                            {t('accountSettings.atLeastOneNumber')}
                                        </div>
                                        <div className={newPasswordTouched && !newPasswordHasUpper ? 'validationError' : ''}>
                                            {t('accountSettings.atLeastOneUpper')}
                                        </div>
                                        <div className={newPasswordTouched && !newPasswordHasLower ? 'validationError' : ''}>
                                            {t('accountSettings.atLeastOneLower')}
                                        </div>
                                        <div className={newPasswordTouched && !newPasswordHasSpecial ? 'validationError' : ''}>
                                            {t('accountSettings.atLeastOneSpecial')}
                                        </div>
                                    </div>

                                    <input
                                        type="password"
                                        className="accountInput"
                                        placeholder={t('accountSettings.confirmPassword')}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onBlur={() => setConfirmPasswordTouched(true)}
                                        required
                                        disabled={loading}
                                    />
                                    <div className={`validationMsg ${confirmPasswordTouched && !passwordsMatch ? 'validationError' : ''}`}>
                                        {confirmPasswordTouched && !passwordsMatch
                                            ? t('accountSettings.passwordsDoNotMatch')
                                            : t('accountSettings.repeatNewPassword')}
                                    </div>
                                    {passwordMsg && (
                                        <div className={`feedbackMsg ${passwordMsg.includes('success') ? 'feedbackSuccess' : ''}`}>
                                            {passwordMsg}
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        className="accountButton"
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
                                        <FaKey /> {t('accountSettings.resetPasswordButton')}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>}
            {loggedUser && loggedUser.role === 'patient' && <><CustomNavbar />
                <div className="accountSettingsPage">
                    <div className="accountCard">
                        <h2 className="accountTitle">
                            <FaUserEdit /> {t('accountSettings.title')}
                        </h2>

                        <form onSubmit={handleUsernameChange}>
                            <label className="form-label fw-bold classchangeusername">{t('accountSettings.changeUsername')}</label>
                            <input
                                type="text"
                                className="accountInput"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onBlur={() => setUsernameTouched(true)}
                                required
                                disabled={loading}
                            />
                            <div className={`validationMsg ${usernameTouched && !usernameValid ? 'validationError' : ''}`}>
                                {t('accountSettings.usernameValidation', { count: usernameMinLength })}
                            </div>
                            {usernameMsg && (
                                <div className={`feedbackMsg ${usernameMsg.includes('success') ? 'feedbackSuccess' : ''}`}>
                                    {usernameMsg}
                                </div>
                            )}
                            <button type="submit" className="accountButton" disabled={loading || !usernameValid}>
                                {t('accountSettings.saveUsername')}
                            </button>
                        </form>

                        <form onSubmit={handlePasswordChange} style={{ marginTop: '2rem' }}>
                            <label className="form-label fw-bold classchangeusername">{t('accountSettings.resetPassword')}</label>
                            <input
                                type="password"
                                className="accountInput"
                                placeholder={t('accountSettings.currentPassword')}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                onBlur={() => setCurrentPasswordTouched(true)}
                                required
                                disabled={loading}
                            />
                            <div className={`validationMsg ${currentPasswordTouched && !currentPassword ? 'validationError' : ''}`}>
                                {t('accountSettings.enterCurrentPassword')}
                            </div>
                            <input
                                type="password"
                                className="accountInput"
                                placeholder={t('accountSettings.newPassword')}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                onBlur={() => setNewPasswordTouched(true)}
                                required
                                disabled={loading}
                            />
                            <div className="validationMsg">
                                <div className={newPasswordTouched && !newPasswordValid ? 'validationError' : ''}>
                                    {t('accountSettings.minimumCharacters', { count: passwordMinLength })}
                                </div>
                                <div className={newPasswordTouched && !newPasswordHasNumber ? 'validationError' : ''}>
                                    {t('accountSettings.atLeastOneNumber')}
                                </div>
                                <div className={newPasswordTouched && !newPasswordHasUpper ? 'validationError' : ''}>
                                    {t('accountSettings.atLeastOneUpper')}
                                </div>
                                <div className={newPasswordTouched && !newPasswordHasLower ? 'validationError' : ''}>
                                    {t('accountSettings.atLeastOneLower')}
                                </div>
                                <div className={newPasswordTouched && !newPasswordHasSpecial ? 'validationError' : ''}>
                                    {t('accountSettings.atLeastOneSpecial')}
                                </div>
                            </div>

                            <input
                                type="password"
                                className="accountInput"
                                placeholder={t('accountSettings.confirmPassword')}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={() => setConfirmPasswordTouched(true)}
                                required
                                disabled={loading}
                            />
                            <div className={`validationMsg ${confirmPasswordTouched && !passwordsMatch ? 'validationError' : ''}`}>
                                {confirmPasswordTouched && !passwordsMatch
                                    ? t('accountSettings.passwordsDoNotMatch')
                                    : t('accountSettings.repeatNewPassword')}
                            </div>
                            {passwordMsg && (
                                <div className={`feedbackMsg ${passwordMsg.includes('success') ? 'feedbackSuccess' : ''}`}>
                                    {passwordMsg}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="accountButton"
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
                                <FaKey /> {t('accountSettings.resetPasswordButton')}
                            </button>
                        </form>
                    </div>
                </div>
                <Footer /></>}
        </>
    );
};

export default AccountSettingsPage;