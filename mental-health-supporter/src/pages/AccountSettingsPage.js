import React, { useState } from 'react';
import { FaUserEdit, FaKey } from 'react-icons/fa';
import { postData } from '../services/api';
import CustomNavbar from '../components/Navbar';
import './AccountSettingsPage.css'; // ✅ Import the new CSS

const usernameMinLength = 3;
const passwordMinLength = 8;

const AccountSettingsPage = () => {
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
            setUsernameMsg('Please enter a valid username.');
            return;
        }
        setLoading(true);
        try {
            await postData(`/users/change-username/`, { username });
            localStorage.setItem('loggedUser', JSON.stringify({ ...loggedUser, name: username }));
            setUsernameMsg('Username updated successfully.');
        } catch (err) {
            setUsernameMsg(`Failed to update username. ${err.response.data.username[0]}`);
        }
        setLoading(false);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordMsg('');
        if (!currentPassword) {
            setPasswordMsg('Please enter your current password.');
            return;
        }
        if (!newPasswordValid || !newPasswordHasNumber || !newPasswordHasUpper || !newPasswordHasLower || !newPasswordHasSpecial) {
            setPasswordMsg('New password does not meet requirements.');
            return;
        }
        if (!passwordsMatch) {
            setPasswordMsg('New passwords do not match.');
            return;
        }
        setLoading(true);
        try {
            await postData(`/users/change-password/`, {
                old_password: currentPassword,
                new_password: newPassword,
            });
            setPasswordMsg('Password updated successfully.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setNewPasswordTouched(false);
            setCurrentPasswordTouched(false);
            setConfirmPasswordTouched(false);
        } catch (err) {
            setPasswordMsg('Failed to update password. Please check your current password.');
        }
        setLoading(false);
    };

    return (
        <>
            <CustomNavbar />
            <div className="accountSettingsPage">
                <div className="accountCard">
                    <h2 className="accountTitle">
                        <FaUserEdit /> Account Settings
                    </h2>

                    <form onSubmit={handleUsernameChange}>
                        <label className="form-label fw-bold classchangeusername">Change Username</label>
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
                            Username must be at least {usernameMinLength} characters, only letters, numbers, and underscores.
                        </div>
                        {usernameMsg && (
                            <div className={`feedbackMsg ${usernameMsg.includes('success') ? 'feedbackSuccess' : ''}`}>
                                {usernameMsg}
                            </div>
                        )}
                        <button type="submit" className="accountButton" disabled={loading || !usernameValid}>
                            Save Username
                        </button>
                    </form>

                    <form onSubmit={handlePasswordChange} style={{ marginTop: '2rem' }}>
                        <label className="form-label fw-bold classchangeusername">Reset Password</label>
                        <input
                            type="password"
                            className="accountInput"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            onBlur={() => setCurrentPasswordTouched(true)}
                            required
                            disabled={loading}
                        />
                        <div className={`validationMsg ${currentPasswordTouched && !currentPassword ? 'validationError' : ''}`}>
                            Enter your current password.
                        </div>
                        <input
                            type="password"
                            className="accountInput"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onBlur={() => setNewPasswordTouched(true)}
                            required
                            disabled={loading}
                        />
                        <div className="validationMsg">
                            <div className={newPasswordTouched && !newPasswordValid ? 'validationError' : ''}>
                                Minimum {passwordMinLength} characters.
                            </div>
                            <div className={newPasswordTouched && !newPasswordHasNumber ? 'validationError' : ''}>
                                At least one number.
                            </div>
                            <div className={newPasswordTouched && !newPasswordHasUpper ? 'validationError' : ''}>
                                At least one uppercase letter.
                            </div>
                            <div className={newPasswordTouched && !newPasswordHasLower ? 'validationError' : ''}>
                                At least one lowercase letter.
                            </div>
                            <div className={newPasswordTouched && !newPasswordHasSpecial ? 'validationError' : ''}>
                                At least one special character.
                            </div>
                        </div>
                        <input
                            type="password"
                            className="accountInput"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() => setConfirmPasswordTouched(true)}
                            required
                            disabled={loading}
                        />
                        <div className={`validationMsg ${confirmPasswordTouched && !passwordsMatch ? 'validationError' : ''}`}>
                            {confirmPasswordTouched && !passwordsMatch
                                ? 'Passwords do not match.'
                                : 'Repeat the new password.'}
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
                            <FaKey /> Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AccountSettingsPage;
