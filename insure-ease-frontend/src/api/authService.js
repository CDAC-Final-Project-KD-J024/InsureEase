// 📂 src/api/authService.js

import apiClient from '../utils/apiClient';
import { getAuthHeaders } from '../utils/getAuthorization';



// 🟢 API call for Updating User Profile
export const updateUserProfileApi = async (formData) => {
  const response = await apiClient.put('/auth/update-profile', formData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// 🟢 API call for registering a user
export const registerUser = async (formData) => {
  try {
    const response = await apiClient.post('/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed!';
  }
};

// 🟢 API call for user login
export const loginUser = async (formData) => {
  try {
    const response = await apiClient.post('/auth/login', formData,{
      headers: {
        "Content-Type": "application/json"
    },
    });
    console.log("login user");
    console.log(response.data);
      
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed!';
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to send reset link!";
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await apiClient.post('/auth/reset-password', { token, newPassword });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to reset password!";
  }
};
export const getUserByToken = async ()=>{
  try {
    const response=await apiClient.get('/auth/user-profile',{
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Falied to fetch user!";
  }
}
