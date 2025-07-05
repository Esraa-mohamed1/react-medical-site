export async function registerUser(userData) {
  const response = await fetch('https://pearla.pythonanywhere.com/api/users/register/user/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      full_name: userData.full_name,
      phone: userData.phone,
      address: userData.address,
      city: userData.city,
      profile_url: userData.profile_url,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || JSON.stringify(errorData));
  }

  return response.json();
}

export async function loginUser({ username, password }) {
  const response = await fetch('https://pearla.pythonanywhere.com/api/users/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }
  return data;
}