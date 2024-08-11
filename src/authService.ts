import axios from 'axios';

const apiUrl = 'http://localhost:1337'; // Replace with your Strapi URL

// Register user
export const registerUser = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/local/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (identifier: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/local`, {
      identifier,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Fetch current user (if needed)
export const fetchCurrentUser = async (token: string) => {
  try {
    const response = await axios.get(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
