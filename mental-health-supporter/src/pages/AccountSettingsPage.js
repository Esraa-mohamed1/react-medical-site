import React, { useState } from 'react';
import { FaUserEdit, FaKey } from 'react-icons/fa';
import { postData } from '../services/api';
import CustomNavbar from '../components/Navbar';

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

    // Validation states
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [currentPasswordTouched, setCurrentPasswordTouched] = useState(false);
    const [newPasswordTouched, setNewPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

    // Username validation
    const usernameValid = username.length >= usernameMinLength && /^[a-zA-Z0-9_]+$/.test(username);

    // Password validations
    const newPasswordValid = newPassword.length >= passwordMinLength;
    const newPasswordHasNumber = /\d/.test(newPassword);
    const newPasswordHasUpper = /[A-Z]/.test(newPassword);
    const newPasswordHasLower = /[a-z]/.test(newPassword);
    const newPasswordHasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const passwordsMatch = newPassword === confirmPassword;

    // Update username handler
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
            localStorage.setItem(
                'loggedUser',
                JSON.stringify({ ...loggedUser, name: username })
            );
            setUsernameMsg('Username updated successfully.');
        } catch (err) {
            setUsernameMsg('Failed to update username.');
        }
        setLoading(false);
    };

    // Reset password handler
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
            <div style={{ maxWidth: 500, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee' }}>
                <h2 className="mb-4" style={{ textAlign: 'center' }}>
                    <FaUserEdit className="me-2" /> Account Settings
                </h2>

                {/* Username Change */}
                <form onSubmit={handleUsernameChange} style={{ marginBottom: 32 }}>
                    <label className="form-label fw-bold">Change Username</label>
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
                        Username must be at least {usernameMinLength} characters, only letters, numbers, and underscores.
                    </div>
                    {usernameMsg && (
                        <div className="mt-2" style={{ color: usernameMsg.includes('success') ? 'green' : 'red' }}>
                            {usernameMsg}
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary mt-2" disabled={loading || !usernameValid}>
                        Save Username
                    </button>
                </form>

                {/* Password Change */}
                <form onSubmit={handlePasswordChange}>
                    <label className="form-label fw-bold">Reset Password</label>
                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        onBlur={() => setCurrentPasswordTouched(true)}
                        required
                        disabled={loading}
                    />
                    <div style={{ fontSize: 13, color: currentPasswordTouched && !currentPassword ? 'red' : '#888' }}>
                        Enter your current password.
                    </div>
                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onBlur={() => setNewPasswordTouched(true)}
                        required
                        disabled={loading}
                    />
                    <div style={{ fontSize: 13 }}>
                        <div style={{ color: newPasswordTouched && !newPasswordValid ? 'red' : '#888' }}>
                            Minimum {passwordMinLength} characters.
                        </div>
                        <div style={{ color: newPasswordTouched && !newPasswordHasNumber ? 'red' : '#888' }}>
                            At least one number.
                        </div>
                        <div style={{ color: newPasswordTouched && !newPasswordHasUpper ? 'red' : '#888' }}>
                            At least one uppercase letter.
                        </div>
                        <div style={{ color: newPasswordTouched && !newPasswordHasLower ? 'red' : '#888' }}>
                            At least one lowercase letter.
                        </div>
                        <div style={{ color: newPasswordTouched && !newPasswordHasSpecial ? 'red' : '#888' }}>
                            At least one special character.
                        </div>
                    </div>
                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => setConfirmPasswordTouched(true)}
                        required
                        disabled={loading}
                    />
                    <div style={{ fontSize: 13, color: confirmPasswordTouched && !passwordsMatch ? 'red' : '#888' }}>
                        {confirmPasswordTouched && !passwordsMatch
                            ? 'Passwords do not match.'
                            : 'Repeat the new password.'}
                    </div>
                    {passwordMsg && (
                        <div className="mt-2" style={{ color: passwordMsg.includes('success') ? 'green' : 'red' }}>
                            {passwordMsg}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="btn btn-primary mt-2"
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
                        <FaKey className="me-2" /> Reset Password
                    </button>
                </form>
            </div>
        </>
    );
};

export default AccountSettingsPage;