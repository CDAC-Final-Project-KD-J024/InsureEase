// 📂 src/api/authService.js
import axios from 'axios';
import { BASE_URL, getAuthHeaders } from '../utils/getAuthorization';



// 🟢 API call for Updating User Profile
export const updateUserProfileApi = async (formData) => {
  const response = await axios.put(`${BASE_URL}/auth/update-profile`, formData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// 🟢 API call for registering a user
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, formData, {
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
    const response = await axios.post(`${BASE_URL}/auth/login`, formData,{
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

// 🟢 API call for Forgot Password (Send OTP)
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to send OTP!';
  }
};

// 🟢 API call for Reset Password (Verify OTP & Change Password)
export const resetPassword = async (email, otp, newPassword) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/reset-password`, { email, otp, newPassword });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to reset password!';
  }
};
