import axios from 'axios';

const BASE_URL = "https://pearla.pythonanywhere.com/api/users/";

export async function registerUser({ name, email, password, full_name, phone, address }) {
  const response = await fetch(BASE_URL + "register/user/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: name,
      email,
      password,
      full_name,
      phone,
      address
    })
  });
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { detail: "Registration failed" };
    }
    // Throw an error object with response and data for frontend error handling
    const error = new Error(errorData.detail || errorData.error || "Registration failed");
    error.response = { data: errorData };
    throw error;
  }
  return response.json();
}

export async function loginUser(formData) {
  // دعم تسجيل الدخول باليوزرنيم أو الإيميل
  let loginData = { ...formData };
  if (loginData.username && loginData.username.includes('@')) {
    // إذا أدخل المستخدم إيميل، أرسله في حقل username
    loginData = { username: loginData.username, password: loginData.password };
  }
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData)
  };
  const response = await fetch("https://pearla.pythonanywhere.com/api/users/login/", options);
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { detail: "Login failed" };
    }
    // Throw an error object with response and data for frontend error handling
    const error = new Error(errorData.detail || errorData.error || "Login failed");
    error.response = { data: errorData };
    throw error;
  }
  return response.json();
}

export async function registerDoctor(formData, isFormData = false) {
  let options;
  if (isFormData) {
    options = {
      method: "POST",
      body: formData // FormData instance
    };
  } else {
    options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    };
  }
  const response = await fetch("https://pearla.pythonanywhere.com/api/users/register/doctor/", options);
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { detail: "Doctor registration failed" };
    }
    // Throw an error object with response and data for frontend error handling
    const error = new Error(errorData.detail || errorData.error || "Doctor registration failed");
    error.response = { data: errorData };
    throw error;
  }
  return response.json();
}

export async function fetchDoctorById(doctorId) {
  const token = localStorage.getItem('access');
  const response = await fetch(`https://pearla.pythonanywhere.com/api/users/doctors/${doctorId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || errorData.error || 'Failed to fetch doctor');
  }
  return response.json();
}

const GENERAL_BASE_URL = 'https://pearla.pythonanywhere.com/api';

// Create axios instance
const api = axios.create({
  baseURL: GENERAL_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  async (config) => {
    // Always get the latest token from localStorage
    const token = localStorage.getItem('access');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Optionally, you can log or handle missing token here
      console.warn('No access token found in localStorage');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access'); // Clear token
      localStorage.removeItem('loggedUser');
      // Do NOT redirect to login, just clear tokens
      // Optionally, you can set a global state or show a message here
    }
    return Promise.reject(error);
  }
);

// GET request
export const getData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// PUT request
export const updateData = async (endpoint, data, config = {}) => {
  try {
    const response = await api.put(endpoint, data, config);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// POST request
export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error patching data:', error);
    throw error;
  }
};

// PATCH request
export const patchData = async (endpoint, data, config = {}) => {
  try {
    const response = await api.patch(endpoint, data, config);
    return response.data;
  } catch (error) {
    console.error('Error patching data:', error);
    throw error;
  }

};

// Utility: Ensure tokens and user info are set in localStorage for API auth
export function setAuthTokens({ access, refresh, user_id, username }) {
  if (access) localStorage.setItem('access', access);
  if (refresh) localStorage.setItem('refresh', refresh);
  if (user_id && username) {
    localStorage.setItem('loggedUser', JSON.stringify({ user_id, username }));
  }
}
