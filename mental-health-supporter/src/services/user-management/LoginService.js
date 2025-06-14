import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (credentials) => {
    try {
        const response = await api.post('/users/login/', credentials);

        if (response.data.access) {
            // Store the token in localStorage
            localStorage.setItem('token', response.data.access);

            // You might want to store user data as well
            localStorage.setItem('user', JSON.stringify(response.data.user));

            return {
                success: true,
                data: response.data
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Login failed'
        };
    }
};

// Usage example in a component:
/*
const handleLogin = async (username, password) => {
    const result = await login({
        username: username,
        password: password
    });

    if (result.success) {
        // Handle successful login
        console.log('Login successful:', result.data);
    } else {
        // Handle login error
        console.error('Login failed:', result.error);
    }
};
*/