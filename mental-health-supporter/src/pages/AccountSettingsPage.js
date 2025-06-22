import React, { useState } from 'react';
import { FaUserEdit, FaKey } from 'react-icons/fa';
import { postData } from '../services/api';
import CustomNavbar from '../components/Navbar';
import { useTranslation } from 'react-i18next';

const usernameMinLength = 3;
const passwordMinLength = 8;

const AccountSettingsPage = () => {
    const { t } = useTranslation();
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const [username, setUsername] = useState(loggedUser?.name || '');
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
            setUsernameMsg(t('account.invalidUsername'));
            return;
        }
        setLoading(true);
        try {
            await postData(`/users/change-username/`, { username });
            localStorage.setItem('loggedUser', JSON.stringify({ ...loggedUser, name: username }));
            setUsernameMsg(t('account.usernameUpdated'));
        } catch (err) {
            setUsernameMsg(t('account.usernameFailed', { error: err.response?.data?.username?.[0] || '' }));
        }
        setLoading(false);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordMsg('');
        if (!currentPassword) {
            setPasswordMsg(t('account.enterCurrentPassword'));
            return;
        }
        if (!newPasswordValid || !newPasswordHasNumber || !newPasswordHasUpper || !newPasswordHasLower || !newPasswordHasSpecial) {
            setPasswordMsg(t('account.passwordInvalid'));
            return;
        }
        if (!passwordsMatch) {
            setPasswordMsg(t('account.passwordsMismatch'));
            return;
        }
        setLoading(true);
        try {
            await postData(`/users/change-password/`, {
                old_password: currentPassword,
                new_password: newPassword,
            });
            setPasswordMsg(t('account.passwordUpdated'));
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setNewPasswordTouched(false);
            setCurrentPasswordTouched(false);
            setConfirmPasswordTouched(false);
        } catch (err) {
            setPasswordMsg(t('account.passwordFailed'));
        }
        setLoading(false);
    };

    return (
        <>
            <CustomNavbar />
            <div style={{ maxWidth: 500, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee' }}>
                <h2 className="mb-4" style={{ textAlign: 'center' }}>
                    <FaUserEdit className="me-2" /> {t('account.settings')}
                </h2>

                {/* Username */}
                <form onSubmit={handleUsernameChange} style={{ marginBottom: 32 }}>
                    <label className="form-label fw-bold">{t('account.changeUsername')}</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={() => setUsernameTouched(true)}
                        required
                        disabled={loading}
                    />
                    <div style={{ fontSize: 13, color: usernameTouched && !usernameValid ? 'red' : '#888' }}>
                        {t('account.usernameRequirements', { min: usernameMinLength })}
                    </div>
                    {usernameMsg && (
                        <div className="mt-2" style={{ color: usernameMsg.includes('success') ? 'green' : 'red' }}>
                            {usernameMsg}
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary mt-2" disabled={loading || !usernameValid}>
                        {t('account.saveUsername')}
                    </button>
                </form>

                {/* Password */}
                <form onSubmit={handlePasswordChange}>
                    <label className="form-label fw-bold">{t('account.resetPassword')}</label>
                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder={t('account.currentPassword')}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        onBlur={() => setCurrentPasswordTouched(true)}
                        required
                        disabled={loading}
                    />
                    <div style={{ fontSize: 13, color: currentPasswordTouched && !currentPassword ? 'red' : '#888' }}>
                        {t('account.enterCurrentPassword')}
                    </div>

                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder={t('account.newPassword')}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onBlur={() => setNewPasswordTouched(true)}
                        required
                        disabled={loading}
                    />
                    <div style={{ fontSize: 13 }}>
                        <div style={{ color: newPasswordTouched && !newPasswordValid ? 'red' : '#888' }}>
                            {t('account.minChars', { min: passwordMinLength })}
                        </div>
                        <div style={{ color: newPasswordTouched && !newPasswordHasNumber ? 'red' : '#888' }}>
                            {t('account.hasNumber')}
                        </div>
                        <div style={{ color: newPasswordTouched && !newPasswordHasUpper ? 'red' : '#888' }}>
                            {t('account.hasUpper')}
                        </div>
                        <div style={{ color: newPasswordTouched && !newPasswordHasLower ? 'red' : '#888' }}>
                            {t('account.hasLower')}
                        </div>
                        <div style={{ color: newPasswordTouched && !newPasswordHasSpecial ? 'red' : '#888' }}>
                            {t('account.hasSpecial')}
                        </div>
                    </div>

                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder={t('account.confirmPassword')}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => setConfirmPasswordTouched(true)}
                        required
                        disabled={loading}
                    />
                    <div style={{ fontSize: 13, color: confirmPasswordTouched && !passwordsMatch ? 'red' : '#888' }}>
                        {confirmPasswordTouched && !passwordsMatch
                            ? t('account.passwordsMismatch')
                            : t('account.repeatPassword')}
                    </div>
                    {passwordMsg && (
                        <div className="mt-2" style={{ color: passwordMsg.includes('success') ? 'green' : 'red' }}>
                            {passwordMsg}
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary mt-2" disabled={
                        loading || !currentPassword || !newPasswordValid ||
                        !newPasswordHasNumber || !newPasswordHasUpper ||
                        !newPasswordHasLower || !newPasswordHasSpecial || !passwordsMatch
                    }>
                        <FaKey className="me-2" /> {t('account.resetPassword')}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AccountSettingsPage;
