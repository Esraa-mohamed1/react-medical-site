import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Exchange Google access token for JWT tokens
 * @param {string} accessToken - Google access token
 * @returns {Promise<Object>} - Response with JWT tokens and user data
 */
export const exchangeGoogleToken = async (accessToken) => {
    try {
        const response = await api.post('/accounts/login/social/token/', {
            provider: 'google-oauth2',
            access_token: accessToken
        });

        if (response.data.access) {
            // Store the tokens in localStorage
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            
            // Store user data
            if (response.data.user) {
                localStorage.setItem('loggedUser', JSON.stringify(response.data.user));
            }

            return {
                success: true,
                data: response.data
            };
        }
    } catch (error) {
        console.error('Google token exchange error:', error);
        return {
            success: false,
            error: error.response?.data?.detail || error.response?.data?.error || 'Google login failed'
        };
    }
};

/**
 * Handle Google login success
 * @param {Object} response - Google OAuth response
 * @returns {Promise<Object>} - Result of token exchange
 */
export const handleGoogleLoginSuccess = async (response) => {
    if (response.access_token) {
        return await exchangeGoogleToken(response.access_token);
    } else {
        return {
            success: false,
            error: 'No access token received from Google'
        };
    }
};

/**
 * Handle Google login error
 * @param {Object} error - Google OAuth error
 * @returns {Object} - Error object
 */
export const handleGoogleLoginError = (error) => {
    console.error('Google login error:', error);
    return {
        success: false,
        error: 'Google login failed. Please try again.'
    };
}; 