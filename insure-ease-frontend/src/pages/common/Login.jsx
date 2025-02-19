import {  useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { handleLogin } from "../../slices/authSlice";
import handleOAuthCallback from './../../utils/oauthHandler';
import { useDispatch } from "react-redux";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch=useDispatch();
 
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const user = JSON.parse(urlParams.get('user') || '{}');
  
    if (token && user) {
      handleOAuthCallback(token, user);
      navigate('/');
    }
  }, [navigate]);
  

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/github";
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    console.log(email+trimmedEmail);
    console.log(password+trimmedPassword);
    if (!trimmedEmail || !trimmedPassword) {
      toast.error("All fields are required!");
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      toast.error("Invalid email format!");
      return;
    }
    if (trimmedPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    const formData = {
      email:trimmedEmail,
      password:trimmedPassword
    }
    console.log(formData);
    // Proceed with login logic (API call, etc.)
    dispatch(handleLogin(formData));
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold" disabled={!email || !password}>
            Login
          </button>
          <div className="text-center mt-3">
            <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
          </div>
          <hr />
          <div className="d-flex flex-column gap-2">
            <button onClick={handleGoogleLogin} type="button" className="btn btn-danger w-100 d-flex align-items-center justify-content-center rounded-pill fw-bold">
              <FaGoogle className="me-2" /> Login with Google
            </button>
            <button onClick={handleGithubLogin} type="button" className="btn btn-dark w-100 d-flex align-items-center justify-content-center rounded-pill fw-bold">
              <FaGithub className="me-2" /> Login with GitHub
            </button>
          </div>
          <div className="text-center mt-3">
            <span>Don&apos;t have an account? </span>
            <Link to="/register" className="text-decoration-none fw-bold">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
