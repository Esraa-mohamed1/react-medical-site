import axios from 'axios';

const BASE_URL = "http://127.0.0.1:8000/api/users/";

export async function registerUser({ full_name, name, email, password, phone, address }) {
  const response = await fetch(BASE_URL + "register/user/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: name, full_name, phone, address, email, password }) // send username, not name
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
  const response = await fetch("http://127.0.0.1:8000/api/users/login/", options);
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
  const response = await fetch("http://127.0.0.1:8000/api/users/register/doctor/", options);
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
  const response = await fetch(`http://127.0.0.1:8000/api/users/doctors/${doctorId}/`, {
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

const GENERAL_BASE_URL = 'http://127.0.0.1:8000/api';

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
    const token = localStorage.getItem('access'); // Or get from your auth state management
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      localStorage.removeItem('loggedUser')
      window.location.href = '/login';
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

// PATCH request
export const patchData = async (endpoint, data) => {
  try {
    const response = await api.patch(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error patching data:', error);
    throw error;
  }
};
