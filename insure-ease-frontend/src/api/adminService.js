import apiClient from "../utils/apiClient";
import {  getAuthHeaders } from "../utils/getAuthorization";

// 🟢 API call for Promoting User
export const promoteUserApi = async (userId) => {
    await apiClient.put(`/auth/promote-user/${userId}`, {}, {
      headers: getAuthHeaders(),
    });
  };
  
  // 🟢 API call for Demoting User
  export const demoteUserApi = async (userId) => {
    await apiClient.put(`/auth/demote-user/${userId}`, {}, {
      headers: getAuthHeaders(),
    });
  };
  

// 🟢 Delete User
export const deleteUserApi = async (userId) => {
  await apiClient.delete(`/auth/delete-user/${userId}`, {
    headers: getAuthHeaders(),
  });
};

// 🟢 Get User by ID
export const getUserByIdApi = async (userId) => {
  const response = await apiClient.get(`/auth/user/${userId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// 🟢 Update User Role
export const updateUserRoleApi = async (userId, role) => {
  await apiClient.put(
    `/auth/update-role/${userId}`,
    { role },
    {
      headers: getAuthHeaders(),
    }
  );
};