
// 📂 src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { registerUser, loginUser, updateUserProfileApi, resetPassword, forgotPassword } from '../api/authService';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      console.log("login request");
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      console.log("login success");
      
      state.user = user;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('token', token);
    },
    loginFailure: (state, action) => {
      console.log("login failure");
      
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('token', token);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserProfileSuccess: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.user.updatedAt = new Date().toISOString();
    },
    thirdPartyLoginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    thirdPartyLoginSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('token', token);
    },
    thirdPartyLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // 🟢 Forgot Password
        forgotPasswordRequest: (state) => {
          state.loading = true;
          state.error = null;
          state.otpSent = false;
        },
        forgotPasswordSuccess: (state) => {
          state.loading = false;
          state.otpSent = true;
          toast.success("OTP sent successfully!");
        },
        forgotPasswordFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        },
    
        // 🟢 Reset Password
        resetPasswordRequest: (state) => {
          state.loading = true;
          state.error = null;
        },
        resetPasswordSuccess: (state) => {
          state.loading = false;
          state.otpSent = false; // Reset OTP state after successful reset
          toast.success("Password reset successful!");
        },
        resetPasswordFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  registerRequest,
  registerSuccess,
  registerFailure,
  updateUserProfileSuccess, 
  thirdPartyLoginRequest,
thirdPartyLoginSuccess,
thirdPartyLoginFailure,forgotPasswordRequest,
forgotPasswordSuccess,
forgotPasswordFailure,
resetPasswordRequest,
resetPasswordSuccess,
resetPasswordFailure,
  
} = authSlice.actions;

// 🟢 Registration Thunk
export const handleRegister = (formData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const data = await registerUser(formData);
    dispatch(registerSuccess(data));
    toast.success('Registration successful!');
  } catch (error) {
    dispatch(registerFailure(error));
    toast.error(error);
  }
};

// 🟢 Login Thunk
export const handleLogin = (formData) => async (dispatch) => {
  console.log("handle login");
  dispatch(loginRequest());
  try {
    const data = await loginUser(formData);
    dispatch(loginSuccess(data));
    toast.success('Login successful!');
  } catch (error) {
    dispatch(loginFailure(error.message));
    toast.error(error.message);
  }
};
// 🟢 Thunk for Updating User Profile
export const handleUpdateUserProfile = (formData) => async (dispatch) => {
  try {
    const data = await updateUserProfileApi(formData);
    dispatch(updateUserProfileSuccess(data));
    toast.success('Profile updated successfully!');
  } catch (error) {
    toast.error(error.message);
  }
};
// 🟢 Third-Party Login Thunk
export const handleThirdPartyLogin = (token, user) => async (dispatch) => {
  dispatch(thirdPartyLoginRequest());
  try {
    // Assuming token and user data come directly from the backend
    dispatch(thirdPartyLoginSuccess({ token, user }));
    toast.success('Third-Party Login successful!');
  } catch (error) {
    dispatch(thirdPartyLoginFailure(error.message));
    toast.error(error.message);
  }
};
// 🟢 Forgot Password Thunk
export const handleForgotPassword = (email) => async (dispatch) => {
  dispatch(forgotPasswordRequest());
  try {
    await forgotPassword(email);
    dispatch(forgotPasswordSuccess());
  } catch (error) {
    dispatch(forgotPasswordFailure(error));
  }
};

// 🟢 Reset Password Thunk
export const handleResetPassword = (email, otp, newPassword) => async (dispatch) => {
  dispatch(resetPasswordRequest());
  try {
    await resetPassword(email, otp, newPassword);
    dispatch(resetPasswordSuccess());
  } catch (error) {
    dispatch(resetPasswordFailure(error));
  }
};

export default authSlice.reducer;
