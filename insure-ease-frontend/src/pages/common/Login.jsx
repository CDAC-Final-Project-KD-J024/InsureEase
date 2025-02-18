import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle, FaGithub } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

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

    // Proceed with login logic (API call, etc.)
    toast.success("Login successful!");
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
            <button type="button" className="btn btn-danger w-100 d-flex align-items-center justify-content-center rounded-pill fw-bold">
              <FaGoogle className="me-2" /> Login with Google
            </button>
            <button type="button" className="btn btn-dark w-100 d-flex align-items-center justify-content-center rounded-pill fw-bold">
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
