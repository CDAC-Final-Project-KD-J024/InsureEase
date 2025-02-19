import axios from "axios";
import { BASE_URL, getAuthHeaders } from "../utils/getAuthorization";

// 🟢 API call for Promoting User
export const promoteUserApi = async (userId) => {
    await axios.put(`${BASE_URL}/auth/promote-user/${userId}`, {}, {
      headers: getAuthHeaders(),
    });
  };
  
  // 🟢 API call for Demoting User
  export const demoteUserApi = async (userId) => {
    await axios.put(`${BASE_URL}/auth/demote-user/${userId}`, {}, {
      headers: getAuthHeaders(),
    });
  };
  

// 🟢 Delete User
export const deleteUserApi = async (userId) => {
  await axios.delete(`${BASE_URL}/auth/delete-user/${userId}`, {
    headers: getAuthHeaders(),
  });
};

// 🟢 Get User by ID
export const getUserByIdApi = async (userId) => {
  const response = await axios.get(`${BASE_URL}/auth/user/${userId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// 🟢 Update User Role
export const updateUserRoleApi = async (userId, role) => {
  await axios.put(
    `${BASE_URL}/auth/update-role/${userId}`,
    { role },
    {
      headers: getAuthHeaders(),
    }
  );
};