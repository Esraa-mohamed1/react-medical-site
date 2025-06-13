const BASE_URL = "http://127.0.0.1:8000/api/users/";

export async function registerUser({ name, email, password }) {
  const response = await fetch(BASE_URL + "register/user/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: name, email, password }) // send username, not name
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || errorData.error || "Registration failed");
  }
  return response.json();
}

export async function loginUser({ email, password }) {
  const response = await fetch(BASE_URL + "login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.detail || "Login failed");
  }
  return response.json();
}

export async function registerDoctor(formData) {
  const response = await fetch("http://127.0.0.1:8000/api/users/register/doctor/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || errorData.error || "Doctor registration failed");
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
